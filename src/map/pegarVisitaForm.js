import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { Formik, Form } from 'formik';
import { Paper } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles, fade } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 400,
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
          }
  }))

export default function PegarVisitaForm( { listaDeCarro, getVisita } ){
     
    const classes = useStyles();

    async function onSubmit( values ){
  
    }

    return(
        <Container component="main" maxWidth="lg" style={{height: '100%'}}>
        <CssBaseline />
        <Paper className={classes.paper}>

          <Grid container direction="row" justify="space-between" alignItems="center">

            <Grid item xs>
                <Grid container alignItems="center" justify="center">
                  <h3>Selecionar carro</h3>
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
            carro: '',
            hora: '07:30',
          }}
          render={( { values, handleChange, handleSubmit, errors, touched }) => (

          <Form onSubmit={handleSubmit} autoComplete="off" style={{width: '100%', height: '100%'}}>

            <Grid container spacing={1}  direction="row" justify="space-between" alignItems="space-between">

                <Grid item xs={12} sm={6}>
                  <TextField
                        variant="outlined"
                        autoComplete="off"
                        fullWidth
                        label="Selecione o carro"
                        name="carro"
                        value={values.carro}
                        onChange={handleChange}
                        select
                    >

                    {listaDeCarro && listaDeCarro.map( (p, i) => (

                      <ListItem key={i} value={ p } button>
                        <Avatar style={{width: 18, height: 18, marginRight: 5, background: p.polColor || '#eeeeee'}}>
                          <span></span>
                        </Avatar>
                        {p.nome}
                      </ListItem>
                    ))}

                  </TextField>
                </Grid>



                <Grid item xs={12} sm={6}>
                  <Grid container spacing={1}  direction="row" justify="flex-end" alignItems="space-between">
                    <TextField
                      value={values.hora}
                      style={{marginTop: 10}}
                      id="time"
                      label="Hora"
                      type="time"
                      name="hora"
                      className={classes.textField}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      
                    />
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
                      className={classes.buttonInfo}
                      onClick={() => getVisita( values.carro, values.hora )}
                      
                      >
                    pegar Visita
                  </Button>
                </Grid>
              </Grid>

            </Grid>
            </Form>
          )}
          />
        </Paper>  
      </Container>
    );
    
}