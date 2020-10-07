import React, { useEffect, useState } from 'react';
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"

let google = window.google;

const definirPino = ( v ) => {

  // console.log("aaa===>", v)

  let url = '';

  if( v.turno == 'manhã' ){

    if( v.prioridade == 1){

      if(v.supervisor){
        url = './redM-super.png'
      }else{
        url = './redM.png'
      }

    }else if( v.prioridade == 2){

      if(v.supervisor){
        url = './blueM-super.png'
      }else{
        url = './blueM.png'
      }

    }else if( v.prioridade == 3){

      if(v.supervisor){
        url = './greenM-super.png'
      }else{
        url = './greenM.png'
      }

    }else if( v.prioridade == 4){
    
      if(v.supervisor){
        url = './blackM-super.png'
      }else{
        url = './blackM.png'
      }

    }

  }else if( v.turno == 'tarde' ){

    if( v.prioridade == 1){

      if(v.supervisor){
        url = './redT-super.png'
      }else{
        url = './redT.png'
      }

    }else if( v.prioridade == 2){

      if(v.supervisor){
        url = './blueT-super.png'
      }else{
        url = './blueT.png'
      }

    }else if( v.prioridade == 3){

      if(v.supervisor){
        url = './greenT-super.png'
      }else{
        url = './greenT.png'
      }

    }else if( v.prioridade == 4){

      if(v.supervisor){
        url = './blackT-super.png'
      }else{
        url = './blackT.png'
      }

    }

  }else{

    if( v.prioridade == 1 ){

      if(v.supervisor){
        url = './redQ-super.png'
      }else{
        url = './redQ.png'
      }

    }else if( v.prioridade == 2){

      if(v.supervisor){
        url = './blueQ-super.png'
      }else{
        url = './blueQ.png'
      }

    }else if( v.prioridade == 3){

      if(v.supervisor){
        url = './greenQ-super.png'
      }else{
        url = './greenQ.png'
      }

    }else if( v.prioridade == 4){

      if(v.supervisor){
        url = './blackQ-super.png'
      }else{
        url = './blackQ.png'
      }

    }

  }

  return (
    <Marker 
      icon={{
        url : url,
        scaledSize: new window.google.maps.Size(35,35)
      }}
      position={{ lat: parseFloat(v.lat), lng:  parseFloat(v.lng)}}
    /> 
  )
}

const definirPinoDoCarro = ( c ) => {

  if( c.tipo == 'supervisor' ){

    return (

      <Marker 
      icon={{
        url : './carroSupervisor.png',
        scaledSize: new window.google.maps.Size(32,32)
      }} 
      position={{ lat: parseFloat(c.lat), lng:  parseFloat(c.lng) }} 
    />

    )

  }else{
    return(
      <Marker 
        icon={{
          url : './carroSvg.png',
          scaledSize: new window.google.maps.Size(25,25)
        }} 
        position={{ lat: parseFloat(c.lat), lng:  parseFloat(c.lng)}} 
      />
  
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

    {console.log("props", props)}

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

    <div style={{height: 550}}>
      {renderMap && <MyMapComponent visitas={visitas} carro={carro} listaDeCarro={listaDeCarro} resultVisitaPicker={resultVisitaPicker}/>}
    </div>

  )
}
