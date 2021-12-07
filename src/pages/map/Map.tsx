import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './Map.css';

const Marker = ({ lat,lng,text }:{lat:any;lng:any;text:any;}) => (
  <div  style={{
    color: 'white', 
    background: 'orange',
    padding: '4px',
    width: '50px',
    display: 'block',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)',
  }}>
    <p>
      {text}
    </p>
        <img src="https://www.australia.com/content/australia/en/places/sydney-and-surrounds/guide-to-sydney/jcr:content/mainParsys/imagecontainer/imageContainerParsys/imagehighlights_835593945/ImageTile/imageHighlightsSrc.adapt.740.medium.jpg" width="25px" height="25px"/>
        

  </div>
);

class SimpleMap extends React.Component {

  static defaultProps = {
    center: {
      lat: 51.449747,
      lng: 5.473891
    },
    zoom: 17,
  };

  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyC_n0tFC99A24CfBUdscGVjGenGf7PILNw" }}
          defaultCenter={SimpleMap.defaultProps.center}
          defaultZoom={SimpleMap.defaultProps.zoom}
        >
          <Marker
                lat ={ 51.450790}
                lng ={5.471861}
            text="Lidl"
          />
                    <Marker
                lat ={ 51.451563}
                lng ={5.472298}
            text="Albert Heijn"
          />
                    <Marker
                lat ={ 51.449972}
                lng ={5.472884}
            text="The Food Corner"
          />
                    <Marker
                lat ={ 51.448399}
                lng ={5.474719}
            text="Athene"
          />
                    <Marker
                lat ={ 51.449359}
                lng ={5.473838}
            text="Kam Po"
          />
                    <Marker
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