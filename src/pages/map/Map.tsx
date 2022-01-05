import React, { Component, useState } from 'react';
import GoogleMapReact, { Props } from 'google-map-react';
import './Map.css';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import ModalCreateRecipe from '../../components/Recipes/ModalCreateRecipe';
import RecipeInfoModal from '../../components/Recipes/RecipeInfoModal';


const Marker = ({ lat, lng, text, id, handleToggleOpen }: { lat: any; lng: any; text: any; id: number; handleToggleOpen: any; }) => (
  <div style={{
    width: '50px',
    transform: 'translate(-50%, -50%)'
  }}>
    <div onClick={(e) => handleToggleOpen(text)}
      style={{
        color: 'white',
        background: 'orange',
        padding: '4px',
        width: '50px',
        height: 'auto',
        display: 'block',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '30%',
      }}>
      <img
        src='https://www.australia.com/content/australia/en/places/sydney-and-surrounds/guide-to-sydney/jcr:content/mainParsys/imagecontainer/imageContainerParsys/imagehighlights_835593945/ImageTile/imageHighlightsSrc.adapt.740.medium.jpg'
        width='40px'
        height='40px'
        style={{
          borderRadius: '50%'
        }}
      />

    </div>
    <div style={{
      width: 0,
      height: 0,
      borderLeft: '20px solid transparent',
      borderRight: '20px solid transparent',
      borderTop: '20px solid orange',
      transform: 'translate(13%, -25%)'
    }}>
    </div>
    <p>{text}</p>
  </div>
);



const SimpleMap: React.FC<{}> = (props) => {

  const [isModalVisible, setIsModalVisible] = useState(0);
  const [itemId, setItemId] = useState(-1);

  const NovFC: React.FC<{ id: number }> = (props) => {

    return (<IonContent >
      <IonModal isOpen={isModalVisible == 0 ? false : true} onDidDismiss={() => setIsModalVisible(0)}>
        <RecipeInfoModal id={props.id} setShowRecipeInfoModal={() => setIsModalVisible} />
      </IonModal>

    </IonContent>)
  }

  function handleToggleOpen(e: any) {
    setItemId(e)
    setIsModalVisible(1)
  };

  let center = {
    lat: 51.449747,
    lng: 5.473891,
  };
  let zoom = 17;

  return (
    <IonPage>
      <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
        <div style={{ position: 'absolute', zIndex: '150', top: '3%', width: '100%', textAlign: 'center', display: 'inline-block' }}>
          <IonButton color="secondary" fill="solid" onClick={() => { }} style={{ width: '250px' }} >Recipes</IonButton>
          <IonButton color="secondary" fill="solid" style={{ width: '250px' }} >Ingredients</IonButton>
        </div>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyC_n0tFC99A24CfBUdscGVjGenGf7PILNw',
          }}
          defaultCenter={center}
          defaultZoom={zoom}>
          <Marker lat={51.45079} lng={5.471861} text='Lidl' id={1} handleToggleOpen={() => handleToggleOpen(1)} />
          <Marker lat={51.451563} lng={5.472298} text='Albert Heijn' id={2} handleToggleOpen={() => handleToggleOpen(2)} />
          <Marker lat={51.449972} lng={5.472884} text='The Food Corner' id={3} handleToggleOpen={() => handleToggleOpen(3)} />
          <Marker lat={51.448399} lng={5.474719} text='Athene' id={4} handleToggleOpen={() => handleToggleOpen(4)} />
          <Marker lat={51.449359} lng={5.473838} text='Kam Po' id={5} handleToggleOpen={() => handleToggleOpen(5)} />
          <Marker lat={51.447382} lng={5.475611} text='Sri Ganesh Indiaaas' id={6} handleToggleOpen={() => handleToggleOpen(6)} />

        </GoogleMapReact>
        <NovFC id={itemId} />
      </div>
    </IonPage >
  );
}

export default SimpleMap;
