import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { Formik, Form, ErrorMessage } from 'formik';
import { Paper } from '@material-ui/core';
// import GenerateAlert from '../../../components/errorAlert';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { Link, useParams } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import withWidth from '@material-ui/core/withWidth';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import LockIcon from '@material-ui/icons/Lock';
import { useHistory} from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { makeStyles, fade } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '10px 20px',
        // marginTop: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 550,
        height: '100%'
        },
        form: {
          width: '100%', // Fix IE 11 issue.
        },
        buttonSuccess: {
          backgroundColor: '#1d3724',
          '&:hover': {
            background: "#4a5442",
         },
        },
          buttonInfo: {
              backgroundColor: '#0064a6',
              '&:hover': {
                  background: "#195493",
              },
          },
          lightTooltip: {
            backgroundColor: theme.palette.common.white,
            color: 'rgba(0, 0, 0, 0.87)',
            boxShadow: theme.shadows[1],
            fontSize: 14,
            border: '1px solid gray'
          },
  }))

export default function VisitaForm( { visitas, setVisitas, carro }){
     
    const classes = useStyles();

    const theme = useTheme();
    let [loading, setLoading] = useState(true);
    let [ supervisorFlag , setSupervisorFlag ] = useState(false);

    async function onSubmit( values ){

      if( values.tipo == 'Manutenção'){
        values.tipo = 'manutencao'
      }else if( values.tipo == 'Instalação'){
        values.tipo = 'instalacao'
      }

      if(  values.turno == 'Manhã' ){
        values.turno = 'manhã';
      }else if( values.turno == 'Tarde' ){
        values.turno = 'tarde';
      }else if( values.turno == 'Qualquer' ){
        values.turno = '';
      }

      let response = JSON.parse(localStorage.getItem('visitasLocal'));

      if( !response ){

        Object.assign(values, {id: 1});
        localStorage.setItem("visitasLocal", JSON.stringify([values]));

      }else{

        let lastId = response[response.length - 1].id;
        Object.assign(values, {id: ++lastId});

        response.push(values)
        localStorage.setItem("visitasLocal", JSON.stringify(response));

      }

      window.location.reload();
      
  
    }

    return(
        <Container component="main" maxWidth="xs" style={{height: '100%'}}>
        <CssBaseline />
        <Paper className={classes.paper}>

          <Grid container direction="row" justify="space-between" alignItems="center">

            <Grid item xs>
                <Grid container alignItems="center" justify="center">
                  <h3>Cadastrar visita</h3>
                </Grid>
            </Grid>

          </Grid>

          <Formik
        //   validationSchema={cadastroUsuarioSchema}
          onSubmit={onSubmit}
          initialValues={{
            lat: '',
            lng: '',
            prioridade: '',
            tipo: '',
            turno: '',
            supervisor: false
          }}
          render={( { values, handleChange, handleSubmit, setFieldValue }) => (

          <Form onSubmit={handleSubmit} autoComplete="off">

            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Latitude"
                  name="lat"
                  value={values.lat}
                  onChange={handleChange}
                />

              </Grid>
           
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Longitude"
                  name="lng"
                  value={values.lng}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>

              <TextField
                    variant="outlined"
                    autoComplete="off"
                    fullWidth
                    label="Prioridade"
                    name="prioridade"
                    value={values.prioridade}
                    onChange={handleChange}
                    select
                >

                {[1,2,3,4].map( (p, i) => (

                    <MenuItem key={i} value={ p } className="option">
                        {p}
                    </MenuItem>

                    ))}

                </TextField>

              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    autoComplete="off"
                    fullWidth
                    label="Tipo"
                    name="tipo"
                    value={values.tipo}
                    onChange={handleChange}
                    select
                >

                {["Manutenção", "Instalação"].map( (p, i) => (

                    <MenuItem key={i} value={ p } className="option">
                        {p}
                    </MenuItem>

                    ))}

                </TextField>
        
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                    variant="outlined"
                    autoComplete="off"
                    fullWidth
                    label="Turno"
                    name="turno"
                    value={values.turno}
                    onChange={handleChange}
                    select
                >

                {["Manhã", "Tarde", "Qualquer"].map( (p, i) => (

                    <MenuItem key={i} value={ p } className="option">
                        {p}
                    </MenuItem>

                    ))}

                </TextField>
        
            </Grid>

            <Grid item xs={12} sm={6}>
            <Tooltip title="Adiciona a flag supervisor='true' para a visita receber apenas carro do tipo supervisor" classes={{ tooltip: classes.lightTooltip }}>
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={ values.supervisor }
                        onChange={() => setFieldValue('supervisor', !values.supervisor)}
                        name="tipo"
                        color="primary"
                    />
                    }
                    label="Supervisor"
                />
            </Tooltip>
            </Grid>


            </Grid>

            <Grid item xs={12} sm={12}>
              <Grid container direction="column" justify="center" alignItems="center">
                <Button
                    size="small"
                    style={{margin: '20px 0px 15px 0px'}}
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.buttonSuccess}
                >
                  cadastrar
                </Button>
              </Grid>
            </Grid>

            </Form>
          )}
          />
        </Paper>  
      </Container>
    );
    
}