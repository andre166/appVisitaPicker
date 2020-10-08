import React, { useEffect, useState } from 'react';
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer, Polygon } from "react-google-maps"
import { itb1, itb2, itb3, itb4, itb5, itb6, itb7 } from './poligonos';
import Tooltip from '@material-ui/core/Tooltip';
import definirPino from './definirPino';

let google = window.google;

const definirPinoDoCarro = ( c ) => {

  const msg = `Cerca de atuação: ${c.cercaDeAtuacao} \nNome: ${c.nome}\nTipo: ${c.tipo}\nLat: ${c.lat}, Lng: ${c.lng}`;

  let url = '';

  if( c.tipo == 'manutencao' ){
    url = './carro-mnt.png';
  }else if( c.tipo == 'instalacao' ){
    url = './carro-inst.png';
  }

  if( c.tipo == 'supervisor' ){

    return (
      <Tooltip title={msg}>
        <Marker icon={{ url: './carroSupervisor.png', scaledSize: new window.google.maps.Size(25,25)}} position={{ lat: parseFloat(c.lat), lng:  parseFloat(c.lng) }} />
      </Tooltip>
    )

  }else{
    return(
      <Tooltip title={msg}>
        <Marker icon={{ url: url, scaledSize: new window.google.maps.Size(25,25) }}  position={{ lat: parseFloat(c.lat), lng:  parseFloat(c.lng)}} />
      </Tooltip>
    )
  }

}

const pols = [
  {cerca: itb1, fColor: "#ffaaff", fOpacity: 0.175, sColor: "#ffaaff", sOpacity: 1, sWeight: 1}, 
  {cerca: itb2, fColor: "#55ffff", fOpacity: 0.175, sColor: "#55ffff", sOpacity: 1, sWeight: 1}, 
  {cerca: itb3, fColor: "#ffff00", fOpacity: 0.175, sColor: "#ffff00", sOpacity: 1, sWeight: 1}, 
  {cerca: itb4, fColor: "#aa5500", fOpacity: 0.175, sColor: "#aa5500", sOpacity: 0.5, sWeight: 1}, 
  {cerca: itb5, fColor: "#9d0e2d", fOpacity: 0.175, sColor: "#9d0e2d", sOpacity: 0.5, sWeight: 1}, 
  {cerca: itb6, fColor: "#4f1355", fOpacity: 0.175, sColor: "#4f1355", sOpacity: 0.5, sWeight: 1}, 
  {cerca: itb7, fColor: "#0b37ff", fOpacity: 0.175, sColor: "#0b37ff", sOpacity: 0.3, sWeight: 1}, 
]

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

    {pols.map( p => (

      <Polygon
        path={p.cerca} key={1} options={{ fillColor: p.fColor, fillOpacity: p.fOpacity, strokeColor: p.sColor, strokeOpacity: p.sOpacity, strokeWeight: p.sWeight}}
      />

    ))}

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

    <div style={{height: 700}}>
      {renderMap && <MyMapComponent visitas={visitas} carro={carro} listaDeCarro={listaDeCarro} resultVisitaPicker={resultVisitaPicker}/>}
    </div>

  )
}
