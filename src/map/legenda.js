import React from 'react';
import { Paper } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import carSuper from '../assets/carroSupervisor.png';
import carMnt from '../assets/carro-mnt.png';
import carInst from '../assets/carro-inst.png';

import pinoSuper from '../assets/pinoSuper.png';
import pinoInst from '../assets/pinoInst.png';
import pinoMnt from '../assets/pinoMnt.png';

import pinoM from '../assets/redM.png';
import pinoQ from '../assets/redQ.png';
import pinoT from '../assets/redT.png';


import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

export default function Legenda() {

    const priopridades = [
        {pri: 1, nCor: '#fff', cor: '#cd0a0a'},
        {pri: 2, nCor: '#fff', cor: '#0278ae'},
        {pri: 3, nCor: '#fff', cor: '#7ea04d'},
        {pri: 4, nCor: '#fff', cor: '#000000'},
    ]

    const Legends = [
        {img: carSuper, txt: 'Carro do Supervisor' },
        {img: carMnt, txt: 'Carro da manutenção' },
        {img: carInst, txt: 'Carro da instalação' },

        {img: pinoM, txt: 'Pino de qualquer cor com letra M', subTxt: 'Visita na parte da manhã' },
        {img: pinoQ, txt: 'Pino de qualquer cor com letra Q', subTxt: 'Visita em qualquer horário' },
        {img: pinoT, txt: 'Pino de qualquer cor com letra T', subTxt: 'Visita na parte da tarde'},

        {img: pinoSuper, txt: 'Pino de qualquer cor com ponto roxo:', subTxt: 'Visita para carro de Supervisor' },
        {img: pinoInst, txt: 'Pino de qualquer cor com ponto vermelho:', subTxt: 'Visita para carro de instalação'},
        {img: pinoMnt, txt: 'Pino de qualquer cor com ponto amarelo:', subTxt: 'Visita para carro de manutenção'},
    ]

    return (
        <>

        <Grid style={{marginTop: 0, textAlign: 'center'}}>
            <h3 style={{marginTop: 0}}>Legenda</h3>
          </Grid>

          <Paper style={{width: '98%', padding: 5, marginTop: 10}}>

          <Grid style={{marginTop: 5, textAlign: 'center'}}>
            Prioridade das visitas
          </Grid>

          <Divider/>

          <Grid container direction="row"  alignItems="center" justify="center">
            {priopridades.map( (p, i) => (
              <>
              <div style={{ background: p.cor, width: 20, height: 20, margin: 5, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
                <h6 style={{color: p.nCor}}>{p.pri}</h6>
              </div>

              { i !== priopridades.length - 1 && 
                <strong>></strong>
              }

              </>
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


          <div style={{width: '98%', padding: 5, marginTop: 10}}>
            <Grid container direction="column"  justify="flex-start" alignItems="flex-start" spacing={5}>
                <List dense={true} style={{width: '100%', padding: 5, marginTop: 10}}>

                {Legends.map( (l, i) => (
                    <>
                    <ListItem>

                        <Avatar style={{width: 60, height: 60, marginRight: 5}}>
                            <img src={l.img} style={{width: 40, height: 40}} />
                        </Avatar>
                
                        <ListItemText primary={l.txt} secondary={l.subTxt || ''}/>
                    
                    </ListItem>
                    { i !== Legends.length - 1 &&  <Divider/>}
                    </>
                ))}

                </List>
             
            </Grid>

          </div>

        </>
    )
}
