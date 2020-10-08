import React from 'react';
import { Marker } from "react-google-maps";

import Tooltip from '@material-ui/core/Tooltip';

export default function definirPino( v ){

    let url = '';
  
    if( v.turno == 'manhã' ){
  
      if( v.prioridade == 1){
  
        if(v.supervisor){
          url = './redM-super.png'
        }else if( v.tipo == 'instalacao' ){
          url = './redM-inst.png'
        }else if( v.tipo == 'manutencao'){
          url = './redM-mnt.png'
        }
  
      }else if( v.prioridade == 2){
  
        if(v.supervisor){
          url = './blueM-super.png'
        }else if( v.tipo == 'instalacao' ){
          url = './blueM-inst.png'
        }else if( v.tipo == 'manutencao'){
          url = './blueM-mnt.png'
        }
  
      }else if( v.prioridade == 3){
  
        if(v.supervisor){
          url = './greenM-super.PNG'
        }else if( v.tipo == 'instalacao' ){
          url = './greenM-inst.PNG'
        }else if( v.tipo == 'manutencao'){
          url = './greenM-mnt.PNG'
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
          url = './redT-super.png'
        }else if( v.tipo == 'instalacao' ){
          url = './redT-inst.png'
        }else if( v.tipo == 'manutencao'){
          url = './redT-mnt.png'
        }
  
      }else if( v.prioridade == 2){
  
        if(v.supervisor){
          url = './blueT-super.png'
        }else if( v.tipo == 'instalacao' ){
          url = './blueT-inst.png'
        }else if( v.tipo == 'manutencao'){
          url = './blueT-mnt.png'
        }
  
      }else if( v.prioridade == 3){
  
        if(v.supervisor){
          url = './greenT-super.PNG'
        }else if( v.tipo == 'instalacao' ){
          url = './greenT-inst.PNG'
        }else if( v.tipo == 'manutencao'){
          url = './greenT-mnt.PNG'
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
  
    const msg = `Prioridade: ${v.prioridade}\nNome: ${v.nome} \nTipo: ${v.tipo}\nSupervisorFlag: ${v.supervisor}\nLat: ${v.lat}, Lng: ${v.lng}`
  
    return (
      <Tooltip title={msg}>
        <Marker 
          icon={{
            url : url,
            scaledSize: new window.google.maps.Size(25,25)
          }}
          position={{ lat: parseFloat(v.lat), lng:  parseFloat(v.lng)}}
        /> 
      </Tooltip>
    )
  }