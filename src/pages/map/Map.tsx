import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonImg, IonGrid, IonRow, IonCol, IonChip, ViewItem, } from '@ionic/react';
import { useParams } from 'react-router';
import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import ExploreContainer from '../../components/ExploreContainer';
import './Map.css';

const AnyReactComponent = ({ lat,lng,text }:{lat:any;lng:any;text:any}) => (
  <div style={{
    color: 'white', 
    background: 'blue',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)',
  }}>
        {text}

  </div>
);

class SimpleMap extends React.Component {
  static defaultProps = {
    center: {
      lat: 51.449747,
      lng: 5.473891
    },
    zoom: 17
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
                lat ={ 51.450790}
                lng ={5.471861}
            text="Lidl"
          />
                    <AnyReactComponent
                lat ={ 51.451563}
                lng ={5.472298}
            text="Albert Heijn"
          />
                    <AnyReactComponent
                lat ={ 51.449972}
                lng ={5.472884}
            text="The Food Corner"
          />
                    <AnyReactComponent
                lat ={ 51.448399}
                lng ={5.474719}
            text="Athene"
          />
                    <AnyReactComponent
                lat ={ 51.449359}
                lng ={5.473838}
            text="Kam Po"
          />
                    <AnyReactComponent
                lat ={ 51.447382}
                lng ={5.475611}
            text="Sri Ganesh Indiaas"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;