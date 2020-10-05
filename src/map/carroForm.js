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

const cercas = [
    'Área 01 - Manillha - ITB 01',
    'área 02 - São joaquim e Joaquim de Oliveira - ITB 02',
    'ÁREA 03 - ITB 03',
    'ÁREA 04 - ITB 04',
    'ÁREA 05 - ITB 05',
    'ÁREA 06 - ITB 06',
    'ÁREA 07 - ITB 07'
]

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '10px 20px',
        marginTop: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 550
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
          }
  }))

export default function Om(){
     
    const classes = useStyles();

    const theme = useTheme();
    let [loading, setLoading] = useState(true);

    useEffect(() => {
        
    }, []);

    async function onSubmit( values ){

        console.log("aqui: ", values)
  
    }

    // if(loading){ return <LoadingPage/>}
    // let carro1 = { 
    //     latitude: -42.94753874745315, 
    //     longitude: -22.79139388319243 , 
    //     cercaDeAtuacao: 'Área 01 - Manillha - ITB 01' , 
    //     tipo: 'supervisor' 
    // };

    return(
        <Container component="main" maxWidth="xs" style={{padding: 5}}>
        <CssBaseline />
        <Paper className={classes.paper}>

          <Grid container direction="row" justify="space-between" alignItems="center">

            <Grid item xs>
                <Grid container alignItems="center" justify="center">
                  <h3>Gerar carro</h3>
                </Grid>
            </Grid>

          </Grid>

          <Formik
        //   validationSchema={cadastroUsuarioSchema}
          onSubmit={onSubmit}
          initialValues={{
            lat: '',
            lng: '',
            cercaDeAtuacao: '',
            tipo: '',
          }}
          render={( { values, handleChange, handleSubmit, errors, touched }) => (

          <Form onSubmit={handleSubmit}>

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
                    label="Cerca de Atuação"
                    name="cerca"
                    value={values.cerca}
                    onChange={handleChange}
                    select
                >

                {cercas.map( (p, i) => (

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

                {['Manutenção', 'Instalação', 'Supervisor'].map( (p, i) => (

                    <MenuItem key={i} value={ p } className="option">
                        {p}
                    </MenuItem>

                    ))}

                </TextField>
        
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
                  gerar
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