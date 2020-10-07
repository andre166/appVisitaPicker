import React, { useEffect, useState } from 'react';
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer, Polygon } from "react-google-maps"
import { itb1, itb2, itb3, itb4, itb5, itb6, itb7 } from './poligonos';
import Tooltip from '@material-ui/core/Tooltip';

let google = window.google;

const definirPino = ( v ) => {

  let url = '';

  if( v.turno == 'manhã' ){

    if( v.prioridade == 1){

      if(v.supervisor){
        url = './redM-super.PNG'
      }else if( v.tipo == 'instalacao' ){
        url = './redM-inst.png'
      }else if( v.tipo == 'manutencao'){
        url = './redM-mnt.png'
      }

    }else if( v.prioridade == 2){

      if(v.supervisor){
        url = './blueM-super.PNG'
      }else if( v.tipo == 'instalacao' ){
        url = './blueM-inst.png'
      }else if( v.tipo == 'manutencao'){
        url = './blueM-mnt.png'
      }

    }else if( v.prioridade == 3){

      if(v.supervisor){
        url = './greenM-super.PNG'
      }else if( v.tipo == 'instalacao' ){
        url = './greenM-inst.png'
      }else if( v.tipo == 'manutencao'){
        url = './greenM-mnt.png'
      }

    }else if( v.prioridade == 4){
    
      if(v.supervisor){
        url = './blackM-super.png'
      }else if( v.tipo == 'instalacao' ){
        url = './blackM-inst.png'
      }else if( v.tipo == 'manutencao'){
        url = './blackM-mnt.png'
      }

    }

  }else if( v.turno == 'tarde' ){

    if( v.prioridade == 1){

      if(v.supervisor){
        url = './redT-super.PNG'
      }else if( v.tipo == 'instalacao' ){
        url = './redT-inst.png'
      }else if( v.tipo == 'manutencao'){
        url = './redT-mnt.png'
      }

    }else if( v.prioridade == 2){

      if(v.supervisor){
        url = './blueT-super.PNG'
      }else if( v.tipo == 'instalacao' ){
        url = './blueT-inst.png'
      }else if( v.tipo == 'manutencao'){
        url = './blueT-mnt.png'
      }

    }else if( v.prioridade == 3){

      if(v.supervisor){
        url = './greenT-super.PNG'
      }else if( v.tipo == 'instalacao' ){
        url = './greenT-inst.png'
      }else if( v.tipo == 'manutencao'){
        url = './greenT-mnt.png'
      }

    }else if( v.prioridade == 4){

      if(v.supervisor){
        url = './blackT-super.png'
      }else if( v.tipo == 'instalacao' ){
        url = './blackT-inst.png'
      }else if( v.tipo == 'manutencao'){
        url = './blackT-mnt.png'
      }

    }

  }else{

    if( v.prioridade == 1 ){

      if(v.supervisor){
        url = './redQ-super.PNG'
      }else if( v.tipo == 'instalacao' ){
        url = './redQ-inst.png'
      }else if( v.tipo == 'manutencao'){
        url = './redQ-mnt.png'
      }

    }else if( v.prioridade == 2){

      if(v.supervisor){
        url = './blueQ-super.PNG'
      }else if( v.tipo == 'instalacao' ){
        url = './blueQ-inst.png'
      }else if( v.tipo == 'manutencao'){
        url = './blueQ-mnt.png'
      }

    }else if( v.prioridade == 3){

      if(v.supervisor){
        url = './greenQ-super.PNG'
      }else if( v.tipo == 'instalacao' ){
        url = './greenQ-inst.png'
      }else if( v.tipo == 'manutencao'){
        url = './greenQ-mnt.png'
      }

    }else if( v.prioridade == 4){

      if(v.supervisor){
        url = './blackQ-super.png'
      }else if( v.tipo == 'instalacao' ){
        url = './blackQ-inst.png'
      }else if( v.tipo == 'manutencao'){
        url = './blackQ-mnt.png'
      }

    }

  }

  const msg = `Prioridade: ${v.prioridade} \nTipo: ${v.tipo}\nSupervisorFlag: ${v.supervisor}\nLat: ${v.lat}, Lng: ${v.lng}`

  return (
    <Tooltip title={msg}>
      <Marker 
        icon={{
          url : url,
          scaledSize: new window.google.maps.Size(35,35)
        }}
        position={{ lat: parseFloat(v.lat), lng:  parseFloat(v.lng)}}
      /> 
    </Tooltip>
  )
}

const definirPinoDoCarro = ( c ) => {

  const msg = `Cerca de atuação: ${c.cercaDeAtuacao} \nNome: ${c.nome}\nTipo: ${c.tipo}\nLat: ${c.lat}, Lng: ${c.lng}`

  if( c.tipo == 'supervisor' ){

    return (

      <Tooltip title={msg}>
        <Marker 
          icon={{
            url : './carroSupervisor.png',
            scaledSize: new window.google.maps.Size(32,32)
          }} 
          position={{ lat: parseFloat(c.lat), lng:  parseFloat(c.lng) }} 
        />
      </Tooltip>


    )

  }else{
    return(
      <Tooltip title={msg}>
        <Marker 
          icon={{
            url : './carroSvg.png',
            scaledSize: new window.google.maps.Size(25,25)
          }} 
          position={{ lat: parseFloat(c.lat), lng:  parseFloat(c.lng)}} 
        />
      </Tooltip>

  
    )
  }

}

       

const MyMapComponent = compose(
  
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC0HwPwbL6VG9d7vCF4py3T6RsY9DYEX0o&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: '100%', width: '100%' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),

  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount( ) {

      const DirectionsService = new window.google.maps.DirectionsService();
      DirectionsService.route({
        
      origin: new window.google.maps.LatLng( this.props.carro.lat, this.props.carro.lng ),
      destination: new window.google.maps.LatLng( this.props.resultVisitaPicker.lat, this.props.resultVisitaPicker.lng ),
      
      travelMode: window.google.maps.TravelMode.DRIVING,

    }, (result, status) => {

      if (status === window.google.maps.DirectionsStatus.OK) {

        var rota = result.routes;
        new window.google.maps.DirectionsRenderer({ suppressMarkers: true, polylineOptions: { strokeColor: 'red' } });
        this.setState({
          directions: result,
          distance: rota[0].legs[0].distance,
          duration: rota[0].legs[0].duration,
        });

      } else {
        console.error(`error fetching directions ${result}`);
      }
    });
}
})
)( props =>

  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: props.carro.lat || -22.79139388319243, lng: props.carro.lng || -42.94753874745315 }}
  >

    <Polygon
      path={itb1} key={1} options={{ fillColor: "#ffaaff", fillOpacity: 0.175, strokeColor: "#ffaaff", strokeOpacity: 1, strokeWeight: 1}}
    />

    <Polygon
      path={itb2} key={1} options={{ fillColor: "#55ffff", fillOpacity: 0.175, strokeColor: "#55ffff",strokeOpacity: 1, strokeWeight: 1 }}
    />

    <Polygon
      path={itb3} key={1} options={{ fillColor: "#ffff00", fillOpacity: 0.175, strokeColor: "#ffff00",strokeOpacity: 1, strokeWeight: 1 }}
    />

    <Polygon
      path={itb4} key={1} options={{ fillColor: "#aa5500", fillOpacity: 0.175, strokeColor: "#aa5500", strokeOpacity: 0.5, strokeWeight: 1 }}
    />

    <Polygon
      path={itb5} key={1} options={{ fillColor: "#9d0e2d", fillOpacity: 0.175, strokeColor: "#9d0e2d", strokeOpacity: 0.5, strokeWeight: 1 }}
    />

    <Polygon
      path={itb6} key={1} options={{ fillColor: "#4f1355", fillOpacity: 0.175, strokeColor: "#4f1355", strokeOpacity: 0.5, strokeWeight: 1 }}
    />

    <Polygon
      path={itb7} key={1} options={{ fillColor: "#0b37ff", fillOpacity: 0.175, strokeColor: "#0b37ff", strokeOpacity: 0.3, strokeWeight: 1 }}
    />



    {props.directions && 
      <DirectionsRenderer 
      options={{
        preserveViewport:true,
        suppressMarkers: true,
        }}  
        directions={props.directions} 
      />
    }

    {props.visitas && 
    
      props.visitas.map( v => (
        definirPino( v )
      ))

    }

    {props.listaDeCarro && 

      props.listaDeCarro.map( c => (

        definirPinoDoCarro( c )


      ))

    }

  </GoogleMap>

)

export default function Map( { visitas, carro, resultVisitaPicker, listaDeCarro } ){

  let [ renderMap, setRenderMap ] = useState( true );

  useEffect(() => {

    setRenderMap( false )

    new Promise((resolve, reject) => {
      setTimeout(() => {

        setRenderMap(true);
        
        resolve();
      }, 500);

    })

  }, [resultVisitaPicker]);

  return (

    <div style={{height: 650}}>
      {renderMap && <MyMapComponent visitas={visitas} carro={carro} listaDeCarro={listaDeCarro} resultVisitaPicker={resultVisitaPicker}/>}
    </div>

  )
}
