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
import redPino from './assets/redT-super.png';
import carSuper from './assets/carroSupervisor.png';

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
    boxShadow: '1px 1px 1px #000000',
    borderRadius: 4,
    padding: 5,
    marginTop: 90,
    marginLeft: 10,
    zIndex: 10,
    position: 'absolute',
    background: '#fff'
  },
  legendaPoligonoBtn: {
    marginTop: 55,
    marginLeft: 10,
    zIndex: 10,
    position: 'absolute',
  }

}));


function App() {

  const classes = useStyles();

  // let [ visitas, setVisitas ] = useState([
  // { id: 1, lng: -42.9174767380266, lat: -22.76177906793717, prioridade: 1, tipo: 'manutencao', supervisor: true},
  // { id: 2, lng: -42.94621969783995, lat: -22.74293464608822, prioridade: 2, tipo: 'manutencao', turno: 'tarde', supervisor: true},
  // { id: 3, lng: -42.91808352712016, lat: -22.76854610370127, prioridade: 3, tipo: 'manutencao', turno: 'manhã', supervisor: true},
  // // sem area
  // { id: 4, lng: -42.95588883173091, lat: -22.76601944444444, prioridade: 4, tipo: 'instalacao', turno: 'manhã', supervisor: false},
  // { id: 5, lng: -42.90766208502973, lat: -22.74843767642125, prioridade: 3, tipo: 'instalacao', turno: 'tarde'},
  // //area 2
  // { id: 6, lng: -42.89662241677625, lat: -22.76232999064083, prioridade: 4, tipo: 'instalacao', turno: 'tarde'},
  // { id: 7, lng: -42.89503997141043, lat: -22.74008743623005, prioridade: 2, tipo: 'instalacao', turno: 'manhã'},
  // //area 3
  // { id: 8, lng: -42.87450228899651, lat: -22.75279560982237, prioridade: 2, tipo: 'instalacao', nome: 'marcio', turno: 'tarde'},
  // { id: 9, lng: -42.88113353376708, lat: -22.75472553469459, prioridade: 3, tipo: 'manutencao', nome: 'Bia', turno: 'manhã'},
  // { id: 10, lng: -42.86895971683943, lat: -22.75200858240266, prioridade: 4, tipo: 'manutencao', nome: 'carla', turno: 'tarde'},
  // //area 4
  // { id: 11, lng: -42.85909010602762, lat: -22.78142111007753, prioridade: 2, tipo: 'instalacao', turno: 'manhã'},
  // //area 5
  // { id: 12, lng: -42.8419680348063, lat: -22.7611160495678, prioridade: 1, tipo: 'instalacao', turno: 'tarde'},
  // // area 6
  // { id: 13, lng: -42.83855617095151, lat: -22.7443219824802, prioridade: 2, tipo: 'instalacao', turno: 'manhã'},
  // { id: 14, lng: -42.82664386691731, lat: -22.7362615794477, prioridade: 1, tipo: 'instalacao', turno: 'tarde'},
  // //area 7
  // { id: 15, lng: -42.86260140596489, lat: -22.7217031755217, prioridade: 2, tipo: 'instalacao', turno: 'manhã'},
// ]);

// let [ listaDeCarro, setListaDeCarro ] = useState([
//   { id: 1, lng: -42.94753874745315, lat: -22.79139388319243 , cercaDeAtuacao: 'Área 01 - Manillha - ITB 01', tipo: 'supervisor', nome:'teste1' },
//   { id: 2, lng: -42.92069930546788, lat: -22.78543895098248 , cercaDeAtuacao: 'ÁREA 03 - ITB 03' , tipo: 'manutencao', nome:'teste2' }
// ]);
  
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

    console.log("carro_visita", carro_visita)

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

  const priopridades = [
    {pri: 1, nCor: '#fff', cor: '#cd0a0a'},
    {pri: 2, nCor: '#fff', cor: '#0278ae'},
    {pri: 3, nCor: '#fff', cor: '#7ea04d'},
    {pri: 4, nCor: '#fff', cor: '#000000'},
  ]

  const gerarVisitas = () => {

    let response = [
      // Sem area de poligono
      { id: 1, lng: -42.90766208502973, lat: -22.74843767642125, prioridade: 3, tipo: 'instalacao', turno: 'tarde', nome: 'Bruno  Fora do poligono'},
      { id: 2, lng: -42.95588883173091, lat: -22.76601944444444, prioridade: 1, tipo: 'instalacao', turno: 'manhã', nome: 'Bruna  Fora do poligono'},

      //itb1
      { id: 3, lng: -42.9174767380266, lat: -22.76177906793717, prioridade: 1, tipo: 'instalacao', turno: 'tarde', nome: 'josé itb1'},
      { id: 4, lng: -42.94621969783995, lat: -22.74293464608822, prioridade: 2, tipo: 'manutencao', turno: 'tarde', nome: 'jorge  itb1', supervisor: true},
      { id: 5, lng: -42.91808352712016, lat: -22.76854610370127, prioridade: 3, tipo: 'manutencao', turno: 'manhã', nome: 'joana  itb1'},
      { id: 6, lng: -42.93947190131398, lat: -22.75734814591831, prioridade: 1, tipo: 'instalacao', turno: 'manhã', nome: 'maria  itb1'},
      { id: 7, lng: -42.94124115518135, lat: -22.77179950150927, prioridade: 2, tipo: 'manutencao', turno: 'tarde',nome: 'joaquina  itb1' },
      { id: 8, lng: -42.92620126436422, lat: -22.72078104188679, prioridade: 2, tipo: 'instalacao', turno: 'manhã',nome: 'josias  itb1'},
      { id: 9, lng: -42.93073318986911, lat: -22.79720877447686, prioridade: 4, tipo: 'manutencao', turno: 'manhã', nome: 'carla  itb1'},
      { id: 10, lng: -42.91703727220641, lat: -22.7978452548842, prioridade: 4, tipo: 'manutencao', turno: 'tarde', nome: 'carlos  itb1', supervisor: true},
      { id: 11, lng: -42.92095199563156, lat: -22.73778261871328, prioridade: 4, tipo: 'manutencao', turno: 'manhã', nome: 'ricardo  itb1'},
      { id: 12, lng: -42.942435740236, lat: -22.78503718494249, prioridade: 4, tipo: 'manutencao', turno: 'manhã', nome: 'Bia  itb1'},
      //itb2
      { id: 13, lng: -42.88441774543092, lat: -22.76732568100849, prioridade: 3, tipo: 'manutencao', turno: 'tarde', nome: 'rafael  itb2'},
      { id: 14, lng: -42.8822877436593, lat: -22.74384077863508, prioridade: 2, tipo: 'instalacao', turno: 'tarde', nome: 'ryan  itb2'},
      { id: 15, lng: -42.90396566956764, lat: -22.76752094337139, prioridade: 1, tipo: 'manutencao', turno: 'tarde', nome: 'ruan  itb2', supervisor: true},
      { id: 16, lng: -42.90129408033986, lat: -22.7492499143316, prioridade: 1, tipo: 'instalacao', turno: 'tarde', nome: 'aruan  itb2'},
      { id: 17, lng: -42.89662241677625, lat: -22.76232999064083, prioridade: 4, tipo: 'instalacao', turno: 'tarde', nome: 'Buiu  itb2'},
      { id: 18, lng: -42.89503997141043, lat: -22.74008743623005, prioridade: 2, tipo: 'manutencao', turno: 'manhã', nome: 'xarles  itb2'},
      // itb3
      { id: 19, lng: -42.87450228899651, lat: -22.75279560982237, prioridade: 2, tipo: 'manutencao', nome: 'marcio itb3', turno: 'tarde'},
      { id: 20, lng: -42.8612871704961, lat: -22.76310926049594, prioridade: 1, tipo: 'instalacao', nome: 'maros itb3', turno: 'tarde'},
      { id: 21, lng: -42.86931595028935, lat: -22.75852336044359, prioridade: 2, tipo: 'instalacao', nome: 'mauricio itb3', turno: 'tarde', supervisor: true},
      { id: 22, lng: -42.87887978407074, lat: -22.75894518282687, prioridade: 4, tipo: 'instalacao', nome: 'venancio itb3', turno: 'tarde'},
      { id: 23, lng: -42.88113353376708, lat: -22.75472553469459, prioridade: 3, tipo: 'manutencao', nome: 'Brum itb3', turno: 'manhã', supervisor: true},
      { id: 24, lng: -42.86895971683943, lat: -22.75200858240266, prioridade: 4, tipo: 'manutencao', nome: 'Billi itb3', turno: 'tarde'},
      //itb4
      { id: 25, lng: -42.85909010602762, lat: -22.78142111007753, prioridade: 1, tipo: 'manutencao', turno: 'manhã', nome: 'cris itb4' },
      { id: 26, lng: -42.85931460879915, lat: -22.75271047305966, prioridade: 2, tipo: 'manutencao', turno: 'manhã', nome: 'cristian itb4' },
      { id: 27, lng: -42.85642888061965, lat: -22.75799010232862, prioridade: 3, tipo: 'manutencao', turno: 'manhã', nome: 'cristiana itb4' },
      { id: 28, lng: -42.85277966807247, lat: -22.76846025125468, prioridade: 2, tipo: 'instalacao', turno: 'manhã', nome: 'kid itb4' },
      { id: 29, lng: -42.84855942936314, lat: -22.77637583086731, prioridade: 3, tipo: 'instalacao', turno: 'manhã', nome: 'geraldo itb4'},
      { id: 30, lng: -42.85663484732868, lat: -22.772582482823, prioridade: 4, tipo: 'instalacao', turno: 'manhã', nome: 'geralda itb4', supervisor: true },
      { id: 31, lng: -42.8516320912213, lat: -22.78413014411737, prioridade: 4, tipo: 'instalacao', turno: 'tarde', nome: 'mussum itb4', supervisor: true},
      { id: 32, lng: -42.85973479938785, lat: -22.7889798536379, prioridade: 1, tipo: 'instalacao', turno: 'tarde', nome: 'muniz itb4' },
      { id: 33, lng: -42.86598363520832, lat: -22.7846194029306, prioridade: 1, tipo: 'manutencao', turno: 'tarde', nome: 'munhoz itb4' },
      //itb5
      { id: 34, lng: -42.8419680348063, lat: -22.7611160495678, prioridade: 1, tipo: 'instalacao', turno: 'tarde', nome: 'tortez itb5'},
      { id: 35, lng: -42.83619010381072, lat: -22.77130601671469, prioridade: 1, tipo: 'manutencao', turno: 'tarde', nome: 'thiago itb5'},
      { id: 36, lng: -42.84693826281879, lat: -22.74525025725222, prioridade: 1, tipo: 'instalacao', turno: 'manhã', nome: 'Ribervania itb5', supervisor: true},
      { id: 37, lng: -42.84757301916454, lat: -22.75425139814746, prioridade: 1, tipo: 'manutencao', turno: 'tarde', nome: 'Karla itb5'},
      { id: 38, lng: -42.85665403597704, lat: -22.74835027370644, prioridade: 1, tipo: 'instalacao', turno: 'manhã', nome: 'Cristiane itb5', supervisor: true},
      { id: 39, lng: -42.84980110962405, lat: -22.76124531311606, prioridade: 1, tipo: 'manutencao', turno: 'tarde', nome: 'juliano itb5'},
      //itb6
      { id: 40, lng: -42.83855617095151, lat: -22.7443219824802, prioridade: 2, tipo: 'instalacao', turno: 'manhã', nome: 'mariano itb6'},
      { id: 41, lng: -42.82664386691731, lat: -22.7362615794477, prioridade: 1, tipo: 'instalacao', turno: 'tarde', nome: 'mirian itb6'},
      { id: 42, lng: -42.82725367363266, lat: -22.72879557737639, prioridade: 1, tipo: 'manutencao', turno: 'manhã', nome: 'pedro itb6'},
      { id: 43, lng: -42.82168224760697, lat: -22.71971867980457, prioridade: 1, tipo: 'instalacao', turno: 'tarde', nome: 'paulo itb6', supervisor: true},
      { id: 44, lng: -42.82771695644214, lat: -22.74695676373925, prioridade: 1, tipo: 'manutencao', turno: 'manhã', nome: 'gabriel itb6', supervisor: true},
      { id: 45, lng: -42.80567500473664, lat: -22.73217579936409, prioridade: 1, tipo: 'instalacao', turno: 'tarde', nome: 'pelé itb6'},
      { id: 46, lng: -42.80837083385252, lat: -22.74344410988211, prioridade: 1, tipo: 'manutencao', turno: 'manhã', nome: 'siqueira itb6'},
      { id: 47, lng: -42.83427631616449, lat: -22.75763474790156, prioridade: 1, tipo: 'instalacao', turno: 'tarde', nome: 'nunes itb6'},

      //itb7
      { id: 48, lng: -42.86260140596489, lat: -22.7217031755217, prioridade: 2, tipo: 'instalacao', turno: 'manhã', nome: 'miriam itb7'},
      { id: 49, lng: -42.87103088080172, lat: -22.69453024864418, prioridade: 2, tipo: 'manutencao', turno: 'tarde', nome: 'sheila itb7'},
      { id: 50, lng: -42.87971152753558, lat: -22.69440753020482, prioridade: 2, tipo: 'instalacao', turno: 'tarde', nome: 'mello itb7', supervisor: true},
      { id: 51, lng: -42.8901725043232, lat: -22.699950861839, prioridade: 2, tipo: 'manutencao', turno: 'manhã', nome: 'carvalho itb7', supervisor: true},
      { id: 52, lng: -42.85836978555958, lat: -22.70724497882623, prioridade: 2, tipo: 'instalacao', turno: 'tarde', nome: 'triana itb7'},
      { id: 53, lng: -42.83818516685712, lat: -22.69960061775717, prioridade: 2, tipo: 'manutencao', turno: 'manhã', nome: 'jean itb7'},
      { id: 54, lng: -42.8353415955085, lat: -22.70924356824561, prioridade: 2, tipo: 'instalacao', turno: 'tarde', nome: 'yann itb7'},
      { id: 55, lng: -42.84566446818828, lat: -22.71575713302141, prioridade: 2, tipo: 'instalacao', turno: 'manhã', nome: 'olavo itb7'},
      { id: 56, lng: -42.85306878462397, lat: -22.72808549340162, prioridade: 2, tipo: 'instalacao', turno: 'manhã', nome: 'gustavo itb7', supervisor: true},
      { id: 57, lng: -42.87182833207942, lat: -22.73742048858121, prioridade: 2, tipo: 'manutencao', turno: 'tarde', nome: 'flavio itb7'},
      { id: 58, lng: -42.85341595970644, lat: -22.73766884395021, prioridade: 2, tipo: 'instalacao', turno: 'manhã', nome: 'deidara itb7'},
  
    ]

    localStorage.setItem("visitasLocal", JSON.stringify(response));

  }

  const gerarCarros = () => {
    let response = [

      // itb1
      { id: 1, lng: -42.94753874745315, lat: -22.79139388319243 , cercaDeAtuacao: 'Área 01 - Manillha - ITB 01', tipo: 'supervisor', nome:'super - itb1' },
      { id: 2, lng: -42.92069930546788, lat: -22.78543895098248 , cercaDeAtuacao: 'Área 01 - Manillha - ITB 01' , tipo: 'manutencao', nome:'manut - itb1' },
      { id: 3, lng: -42.90126958830669, lat: -22.77985145685625 , cercaDeAtuacao: 'Área 01 - Manillha - ITB 01' , tipo: 'instalacao', nome:'inst - itb1' },
      // itb2
      { id: 4, lng: -42.8916183274623, lat: -22.77483568107419 , cercaDeAtuacao: 'área 02 - São joaquim e Joaquim de Oliveira - ITB 02' , tipo: 'supervisor', nome:'super - itb2' },
      { id: 5, lng: -42.90285230447015, lat: -22.78876168943736 , cercaDeAtuacao: 'área 02 - São joaquim e Joaquim de Oliveira - ITB 02' , tipo: 'manutencao', nome:'manut - itb2' },
      { id: 6, lng: -42.89887863355187, lat: -22.7287281654507 , cercaDeAtuacao: 'área 02 - São joaquim e Joaquim de Oliveira - ITB 02' , tipo: 'instalacao', nome:'inst - itb2' },
      // itb3
      { id: 7, lng: -42.90088601711899, lat: -22.71833948103525 , cercaDeAtuacao: 'ÁREA 03 - ITB 03' , tipo: 'supervisor', nome:'super - itb3' },
      { id: 8, lng: -42.82787236652075, lat: -22.76489807864087 , cercaDeAtuacao: 'ÁREA 03 - ITB 03' , tipo: 'manutencao', nome:'manut - itb3' },
      { id: 9, lng: -42.88437383993017, lat: -22.72968842403092 , cercaDeAtuacao: 'ÁREA 03 - ITB 03' , tipo: 'instalacao', nome:'inst - itb3' },
      // itb4
      { id: 10, lng: -42.82498142399804, lat: -22.70773623034828 , cercaDeAtuacao: 'ÁREA 04 - ITB 04' , tipo: 'supervisor', nome:'super - itb4' },
      { id: 11, lng: -42.82155921977381, lat: -22.70904054919757 , cercaDeAtuacao: 'ÁREA 04 - ITB 04' , tipo: 'manutencao', nome:'manut - itb4' },
      { id: 12, lng: -42.88002710970934, lat: -22.79116365388647 , cercaDeAtuacao: 'ÁREA 04 - ITB 04' , tipo: 'instalacao', nome:'inst - itb4' },
      // itb5
      { id: 13, lng: -42.88434871406977, lat: -22.78825137671154 , cercaDeAtuacao: 'ÁREA 05 - ITB 05' , tipo: 'supervisor', nome:'super - itb5' },
      { id: 14, lng: -42.87253894014584, lat: -22.79266008944926 , cercaDeAtuacao: 'ÁREA 05 - ITB 05' , tipo: 'manutencao', nome:'manut - itb5' },
      { id: 15, lng: -42.90664743710982, lat: -22.73193761991607 , cercaDeAtuacao: 'ÁREA 05 - ITB 05' , tipo: 'instalacao', nome:'inst - itb5' },
      // itb6
      { id: 16, lng: -42.91165644349839, lat: -22.72179490425665 , cercaDeAtuacao: 'ÁREA 06 - ITB 06' , tipo: 'supervisor', nome:'super - itb6' },
      { id: 17, lng: -42.83650697273852, lat: -22.78011789703801 , cercaDeAtuacao: 'ÁREA 06 - ITB 06' , tipo: 'manutencao', nome:'manut - itb6' },
      { id: 18, lng: -42.82342534831196, lat: -22.75655963101576 , cercaDeAtuacao: 'ÁREA 06 - ITB 06' , tipo: 'instalacao', nome:'inst - itb6' },
      // itb7
      { id: 19, lng: -42.8589937237037, lat: -22.69848169109618 , cercaDeAtuacao: 'ÁREA 07 - ITB 07' , tipo: 'supervisor', nome:'super - itb7' },
      { id: 20, lng: -42.84955991503653, lat: -22.69665231613408 , cercaDeAtuacao: 'ÁREA 07 - ITB 07' , tipo: 'manutencao', nome:'manut - itb7' },
      { id: 21, lng: -42.86226070046544, lat: -22.69213797637705 , cercaDeAtuacao: 'ÁREA 07 - ITB 07' , tipo: 'instalacao', nome:'inst - itb7' },


    ]
    localStorage.setItem("carrosLocal", JSON.stringify(response));

  }


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
          {polColor.map( (p, i) => (
              <Grid container direction="row"  alignItems="center" justify="flex-start">
              <div style={{ background: p.cor, width: 20, height: 20, margin: 5, borderRadius: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}> </div>
              <h6><strong>{p.txt}</strong></h6>
              </Grid>
            ))}
        </div>
        }


        <Map visitas={visitas} carro={carro} listaDeCarro={listaDeCarro} resultVisitaPicker={resultVisitaPicker}/>

        <div className={classes.formContainer}>

        <div className={classes.legendasContainer}>

          <Grid style={{marginTop: 0, textAlign: 'center'}}>
            <h3 style={{marginTop: 0}}>Legenda</h3>
          </Grid>

          <Paper style={{width: '98%', padding: 5, marginTop: 10}}>

          <Grid style={{marginTop: 5, textAlign: 'center'}}>
            Prioridade
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

          <Paper style={{width: '98%', padding: 5, marginTop: 10}}>

            <Grid container direction="row"  justify="flex-start" alignItems="flex-start" spacing={5}>

            <Grid item xs={12} sm={2}>
              <img src={redPino} style={{width: 45, height: 50}} />
            </Grid>

            <Grid item xs={12} sm={10} >
                <label>Pinos com ponto roxo: visita apenas para Supervisor</label>
            </Grid>
             
            </Grid>

          </Paper>

          <Paper style={{width: '98%', padding: 5, marginTop: 10}}>

            <Grid container direction="row"  justify="flex-start" alignItems="flex-start" spacing={5}>

            <Grid item xs={12} sm={2}>
              <img src={carSuper} style={{width: 45, height: 50}} />
            </Grid>

            <Grid item xs={12} sm={10} >
                <label>Carro do supervisor</label>
            </Grid>
             
            </Grid>

          </Paper>

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
