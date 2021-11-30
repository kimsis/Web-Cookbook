import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonImg, IonGrid, IonRow, IonCol, IonChip, ViewItem, } from '@ionic/react';
import { useParams } from 'react-router';
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import ExploreContainer from '../../components/ExploreContainer';
import './Map.css';

const AnyReactComponent = ({ lat,lng,text }:{lat:any;lng:any;text:any}) => (
  <div style={{
    color: 'white', 
    background: 'grey',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);

class SimpleMap extends React.Component {
  static defaultProps = {
    center: {
      lat: 51.441643,
      lng: 5.469722
    },
    zoom: 11
  };

  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyC_n0tFC99A24CfBUdscGVjGenGf7PILNw" }}
          defaultCenter={SimpleMap.defaultProps.center}
          defaultZoom={SimpleMap.defaultProps.zoom}
        >
          <AnyReactComponent
                lat ={ 51.451827}
                lng ={5.471908}
            text="IT"
          />
                    <AnyReactComponent
                lat ={ 51.451429}
                lng ={5.472132}
            text="FUCKING"
          />
                    <AnyReactComponent
                lat ={ 51.449824}
                lng ={5.473420}
            text="WORKS"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;