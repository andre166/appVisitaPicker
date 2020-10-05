import React, { useState, useEffect } from 'react';
import Map from './map';
import { makeStyles } from '@material-ui/core/styles';
import VisitaForm from './map/visitaForm';
import CarroForm from './map/carroForm';

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
      height: 550
    },
    formContainer: {
      padding: 10,
      background: '#eeeeee',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    }

}));


function App() {

  const classes = useStyles();
  
  let [ visitas, setVisitas ] = useState([
    {lat: -22.76177906793717, lng: -42.9174767380266},
    {lat: -22.76601944444444, lng: -42.95588883173091}
  ]);


  let [ carro, setCarro ] = useState({
    lat: '',
    lng: '',
    cercaDeAtuacao: '',
    tipo: '',
  });

  const teste = () => {
    console.log("Carro =>", carro)
    console.log("Visitas =>", visitas)
  }

  return (
    <div className={classes.containerGeral}>
      <div className={classes.mapContainer}>

        <Map visitas={visitas} carro={carro} />

        <div className={classes.formContainer}>

          <VisitaForm visitas={visitas} setVisitas={setVisitas}/>

          <button onClick={() => teste()} >Gerar Visita</button>

          <CarroForm setCarro={setCarro}/>

        </div>
      </div>
    </div>
  );
}

export default App;
