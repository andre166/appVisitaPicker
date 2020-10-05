import React from 'react';
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
  
  return (
    <div className={classes.containerGeral}>
      <div className={classes.mapContainer}>
        <Map/>
        <div className={classes.formContainer}>
          <VisitaForm/>
          <button>Gerar Visita</button>
          <CarroForm/>
        </div>
      </div>
    </div>
  );
}

export default App;
