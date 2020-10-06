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
import { Paper } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

export const useStyles = makeStyles((theme) => ({

    containerGeral:{
      padding: 5,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    },
    mapContainer: {
      width: '100%',
      maxWidth: 1400,
      height: 550,
      minHeight: 550
    },
    formContainer: {
      height: '100%',
      maxHeight: 350,
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
    padding: 10,
    height: '100%',
    background: '#eeeeee',
    maxWidth: 200
  }

}));


function App() {

  const classes = useStyles();
  
  let [ visitas, setVisitas ] = useState([
    { id: 1, lng: -42.9174767380266, lat: -22.76177906793717, prioridade: 1, tipo: 'instalacao', turno: 'manhã'},
    { id: 2, lng: -42.94621969783995, lat: -22.74293464608822, prioridade: 2, tipo: 'manutencao', turno: 'tarde', supervisor: false},
    { id: 3, lng: -42.91808352712016, lat: -22.76854610370127, prioridade: 3, tipo: 'manutencao', turno: 'manhã'},
    // sem area
    { id: 4, lng: -42.95588883173091, lat: -22.76601944444444, prioridade: 4, tipo: 'instalacao', turno: 'manhã', supervisor: false},
    { id: 5, lng: -42.90766208502973, lat: -22.74843767642125, prioridade: 3, tipo: 'instalacao', turno: 'tarde'},
    //area 2
    { id: 6, lng: -42.89662241677625, lat: -22.76232999064083, prioridade: 4, tipo: 'instalacao', turno: 'tarde'},
    { id: 7, lng: -42.89503997141043, lat: -22.74008743623005, prioridade: 2, tipo: 'instalacao', turno: 'manhã'},
    //area 3
    { id: 8, lng: -42.87450228899651, lat: -22.75279560982237, prioridade: 2, tipo: 'instalacao', nome: 'marcio', turno: 'tarde'},
    { id: 9, lng: -42.88113353376708, lat: -22.75472553469459, prioridade: 3, tipo: 'manutencao', nome: 'Bia', turno: 'manhã'},
    { id: 10, lng: -42.86895971683943, lat: -22.75200858240266, prioridade: 4, tipo: 'manutencao', nome: 'carla', turno: 'tarde'},
    //area 4
    { id: 11, lng: -42.85909010602762, lat: -22.78142111007753, prioridade: 2, tipo: 'instalacao', turno: 'manhã'},
    //area 5
    { id: 12, lng: -42.8419680348063, lat: -22.7611160495678, prioridade: 1, tipo: 'instalacao', turno: 'tarde'},
    // area 6
    { id: 13, lng: -42.83855617095151, lat: -22.7443219824802, prioridade: 2, tipo: 'instalacao', turno: 'manhã'},
    { id: 14, lng: -42.82664386691731, lat: -22.7362615794477, prioridade: 1, tipo: 'instalacao', turno: 'tarde'},
    //area 7
    { id: 15, lng: -42.86260140596489, lat: -22.7217031755217, prioridade: 2, tipo: 'instalacao', turno: 'manhã'},
  ]);

  let [ listaDeCarro, setListaDeCarro ] = useState([
    { id: 1, lng: -42.94753874745315, lat: -22.79139388319243 , cercaDeAtuacao: 'Área 01 - Manillha - ITB 01', tipo: 'manutencao', nome:'teste1' },
    { id: 2, lng: -42.92069930546788, lat: -22.78543895098248 , cercaDeAtuacao: 'ÁREA 03 - ITB 03' , tipo: 'manutencao', nome:'teste2' }
  ]);


  let [ carro, setCarro ] = useState([]);
  let [ cortarVisita, setCortarVisita ] = useState(true);


//   const cercas = [
//     'Área 01 - Manillha - ITB 01',
//     'área 02 - São joaquim e Joaquim de Oliveira - ITB 02',
//     'ÁREA 03 - ITB 03',
//     'ÁREA 04 - ITB 04',
//     'ÁREA 05 - ITB 05',
//     'ÁREA 06 - ITB 06',
//     'ÁREA 07 - ITB 07'
// ]

  let [ resultVisitaPicker, setResultVisitaPicker ] = useState('');

  let [ visitaParaCortar, setVisitaParaCortar ] = useState([]);

  const getVisita = async ( _carro ) => {

    if( !_carro ){
      return;
    }

    let car = _carro ;

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
            c.lat = resultVisitaPicker.lat;
            c.lng = resultVisitaPicker.lng;

          }

        })

      }

    }

    let carro_visita = {
      carro: car,
      visitas: visitas
    }

    let resp = await axios.post(`http://localhost:3001/getVisita`, carro_visita)
    .catch((error) => { return error });

    if(resp.data){

      if(resp.data[0]){

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

  const priopridades = [
    {pri: 1, nCor: '#fff', cor: '#cd0a0a'},
    {pri: 2, nCor: '#fff', cor: '#0278ae'},
    {pri: 3, nCor: '#fff', cor: '#7ea04d'},
    {pri: 4, nCor: '#fff', cor: '#000000'},
  ]

  return (
    <div className={classes.containerGeral}>
      <div className={classes.mapContainer}>

        <Map visitas={visitas} carro={carro} listaDeCarro={listaDeCarro} resultVisitaPicker={resultVisitaPicker}/>

        <div className={classes.formContainer}>

        <Grid container direction="column"  alignItems="center" className={classes.legendasContainer}>

          <Grid style={{marginTop: 5}}>
            <h3 style={{marginTop: 2}}>Legenda</h3>
          </Grid>

        <Paper style={{width: '98%', padding: 5}}>
          <Grid style={{marginTop: 5, textAlign: 'center'}}>
            Prioridade
          </Grid>
    <Divider/>
          <Grid container direction="row"  alignItems="center" justify="center">
            {priopridades.map( p => (
              <div style={{ background: p.cor, width: 20, height: 20, margin: 5, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
                <h6 style={{color: p.nCor}}>{p.pri}</h6> 
              </div>
            ))}
          </Grid>
        </Paper>

        <Paper style={{width: '98%', padding: 5, marginTop: 10}}>
        <Grid style={{marginTop: 5, textAlign: 'center'}}>
            Turno
          </Grid>
    <Divider/>

          <Grid container direction="column"  alignItems="flex-start" justify="flex-start" style={{padding: 20}}>

            <h4 style={{margin: 0}}>{'M: Manhã <= 12:00'}</h4>
            <h4 style={{margin: 0}}>{'T: Tarde > 12:00'}</h4>
            <h4 style={{margin: 0}}>{'Q: Qualquer turno'}</h4>
            
          </Grid>
        </Paper>

        </Grid>

          <VisitaForm visitas={visitas} setVisitas={setVisitas}/>

          <CarroForm setCarro={setCarro}/>

          <PegarVisitaForm listaDeCarro={listaDeCarro} carro={carro} setCarro={setCarro} getVisita={getVisita}/>

          {/* <Button
            size="small"
            style={{margin: '20px 0px 15px 0px'}}
            type="submit"
            variant="contained"
            color="primary"
            className={classes.buttonInfo}
            onClick={() => teste()}
          >
            pegar Visita
          </Button> */}

        </div>

      </div>
    </div>
  );
}

export default App;
