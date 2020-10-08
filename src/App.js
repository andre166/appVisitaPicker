import React, { useState, useEffect } from 'react';
import Map from './map';
import { makeStyles } from '@material-ui/core/styles';
import VisitaForm from './map/visitaForm';
import CarroForm from './map/carroForm';
import PegarVisitaForm from './map/pegarVisitaForm';
import Button from '@material-ui/core/Button';
import filtrarVisita from 'visitapicker_teste/converter';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Legendas from './map/legenda';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { gerarCarros, gerarVisitas } from './map/gerarVisitaECarro';

export const useStyles = makeStyles((theme) => ({
    containerGeral:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',

    },
    mapContainer: {
      width: '100%',
      // maxWidth: 1800,
      height: 850,
      // minHeight: 550
    },
    formContainer: {
      height: '100%',
      maxHeight: 370,
      padding: 10,
      background: '#222831',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    },
    buttonInfo: {
      backgroundColor: '#0064a6',
      '&:hover': {
          background: "#195493",
      },
  },
  legendasContainer:{
    // position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 4,
    padding: 10,
    height: '100%',
    background: '#eeeeee',
    width: '100%',
    maxWidth: 400,
    overflow: 'auto'
  },
  legendaPoligono: {
    boxShadow: '1px 1px 1px #bdbfc1',
    borderRadius: 4,
    marginTop: 121,
    marginLeft: 10,
    zIndex: 10,
    position: 'absolute',
    background: '#fff'
  },
  legendaPoligonoBtn: {
    marginTop: 90,
    marginLeft: 10,
    zIndex: 10,
    position: 'absolute',
  }

}));


function App() {

  const classes = useStyles();
  
  let [ visitas, setVisitas ] = useState( JSON.parse(localStorage.getItem('visitasLocal')) );

  let [ listaDeCarro, setListaDeCarro ] = useState( JSON.parse(localStorage.getItem('carrosLocal')) );

  let [ carro, setCarro ] = useState([]);
  let [ cortarVisita, setCortarVisita ] = useState(true);

  let [ resultVisitaPicker, setResultVisitaPicker ] = useState('');

  let [ visitaParaCortar, setVisitaParaCortar ] = useState([]);

  let [ polLegend, setPolLegend ] = useState(true);


  const getVisita = async ( _carro, hora ) => {

    if( !_carro ){
      return;
    }

    let car = _carro ;
    car.lat = parseFloat(car.lat);
    car.lng = parseFloat(car.lng);

    if( resultVisitaPicker !== '' ){

      let index = '';

      visitas.find( (v, i) => {

        if(v.id == resultVisitaPicker.id){
          index = i;
        }

      })

      if( cortarVisita ){

        visitas.splice(index, 1);

        listaDeCarro.map( c => {

          if(c.id == carro.id ){
            c.lat = parseFloat(resultVisitaPicker.lat);
            c.lng = parseFloat(resultVisitaPicker.lng);

          }

        })

      }

    }

    let carro_visita = {
      carro: car,
      hora: hora,
      visitas: visitas,
    }

    let resp = await axios.post(`https://visitapicker-backend.herokuapp.com/getVisita`, carro_visita)
    .catch((error) => { return error });

    if(resp.data){

      if(resp.data[0] && resp.data[0] !== 'Sem visita para supervisor'){
        setCarro(car);
        setCortarVisita(true);
        setResultVisitaPicker(resp.data[0]);

      }else{

        if( resultVisitaPicker.lat == ''){
          return;
        }

        setCortarVisita(false);

        setResultVisitaPicker({
          lat: '',
          lng: ''
        })

      }

    }

    
  };

  const polColor = [

  {cor: '#ffaaff', txt:'Área 01 - Manillha - ITB 01'},
  {cor: '#55ffff', txt:'área 02 - São joaquim e Joaquim de Oliveira - ITB 02'},
  {cor: '#ffff00', txt:'ÁREA 03 - ITB 03'},
  {cor: '#aa5500', txt:'ÁREA 04 - ITB 04'},
  {cor: '#9d0e2d', txt:'ÁREA 05 - ITB 05'},
  {cor: '#4f1355', txt:'ÁREA 06 - ITB 06'},
  {cor: '#0b37ff', txt:'ÁREA 07 - ITB 07'}

  ]

  return (
    <div className={classes.containerGeral}>
      <div className={classes.mapContainer}>

        <div className={classes.legendaPoligonoBtn}>
          <Button color="primary" size="small" variant="outlined" onClick={() => setPolLegend(!polLegend)}>Show legend</Button>
        </div>

        {polLegend && 
        <div className={classes.legendaPoligono}>
        <List dense={true}>

          {polColor.map( (p, i) => (
            <>
              <ListItem>

                <Avatar style={{width: 20, height: 20, marginRight: 5, background: p.cor}}>
                    <span></span>
                </Avatar>

              <ListItemText primary={p.txt}/>
        
              </ListItem>
              { i !== polColor.length - 1 && <Divider/>}
            </>
            ))}
        </List>
        </div>
        }



        <Map visitas={visitas} carro={carro} listaDeCarro={listaDeCarro} resultVisitaPicker={resultVisitaPicker}/>

        <div className={classes.formContainer}>

        <div className={classes.legendasContainer}>

          <Legendas/>

        </div>

          <VisitaForm visitas={visitas} setVisitas={setVisitas}/>

          <CarroForm setCarro={setCarro}/>

          <PegarVisitaForm listaDeCarro={listaDeCarro} carro={carro} setCarro={setCarro} getVisita={getVisita}/>

          <Button size="small" color="primary" variant="outlined" onClick={gerarVisitas}>Gerar Visitas</Button>
          <Button style={{marginLeft: 10}} size="small" color="secondary" variant="outlined" onClick={gerarCarros}>Gerar Carros</Button>

        </div>

      </div>
    </div>
  );
}

export default App;
