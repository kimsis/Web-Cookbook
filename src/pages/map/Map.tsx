import React, { Component, useContext, useEffect, useState } from 'react';
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
import axios, { AxiosResponse } from 'axios';
import { Recipe } from '../../shared/interfaces/Recipe.interface';
import AppContext from '../../store/AppContext';

interface Data {
  page: number;
  size: number;
  items: Recipe[];
}


const Marker = ({ lat, lng, text, id, imagePath, handleToggleOpen }: { lat: any; lng: any; text: any; id: number; imagePath: any; handleToggleOpen: any; }) => (
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
        src={imagePath}
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
  const [recipes, setRecipes] = useState<Recipe[] | null>();
  // const [ingredients, setIngredients] = useState<Ingredient[] | null>();

  let recipesArray: Data;
  let ingredientsArray: Data;

  useEffect(() => {
    getRecipes();
   // getIngredients();
  }, [])

  const NovFC: React.FC<{ id: number }> = (props) => {

    return (<IonContent >
      <IonModal isOpen={isModalVisible == 0 ? false : true} onDidDismiss={() => setIsModalVisible(0)}>
        <RecipeInfoModal id={props.id} setShowRecipeInfoModal={() => setIsModalVisible} />
      </IonModal>

    </IonContent>)
  }

  let appContext = useContext(AppContext);

  async function getRecipes() {
    await axios(appContext.http + "Recipe/PagedList")
    .then((response) => {
      recipesArray = JSON.parse(JSON.stringify(response.data));
      console.log(recipesArray.items);
      setRecipes(recipesArray.items)
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      setError(error);
    });
  }

  // async function getIngredients() {
  //   await axios("https://i403375core.venus.fhict.nl/Ingredient/PagedList")
  //   .then((response) => {
  //     ingredientsArray = JSON.parse(JSON.stringify(response.data));
  //     console.log(ingredientsArray.items);
  //     setRecipes(ingredientsArray.items)
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching data: ", error);
  //     setError(error);
  //   });
  // }

  function setError(error:any) {
    console.log(error);
    
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

  let MarkerList;

  if (recipes != null) {
    MarkerList = recipes.map((recipe) =>
        <Marker
          id={recipe.id}
          text={recipe.title}
          imagePath={recipe.imagePath}
          lng = {recipe.longitude}
          lat = {recipe.latitude}
          handleToggleOpen= {() => handleToggleOpen(recipe.id)}
        />
    );
  } else {
    MarkerList = <div> No recipes found! </div>;
  }

  // if (ingredients != null) {
  //   MarkerList = ingredients.map((ingredient) =>
  //       <Marker
  //         id={ingredient.id}
  //         text={ingredient.title}
  //         imagePath={ingredient.imagePath}
  //         lng = {ingredient.longitude}
  //         lat = {ingredient.latitude}
  //         handleToggleOpen= {() => handleToggleOpen(ingredient.id)}
  //       />
  //   );
  // } else {
  //   MarkerList = <div> No ingredients found! </div>;
  // }


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
          {MarkerList}
          {/* <Marker lat={51.45079} lng={5.471861} text='Lidl' id={1} handleToggleOpen={() => handleToggleOpen(1)} />
          <Marker lat={51.451563} lng={5.472298} text='Albert Heijn' id={2} handleToggleOpen={() => handleToggleOpen(50)} />
          <Marker lat={51.449972} lng={5.472884} text='The Food Corner' id={3} handleToggleOpen={() => handleToggleOpen(55)} />
          <Marker lat={51.448399} lng={5.474719} text='Athene' id={4} handleToggleOpen={() => handleToggleOpen(57)} />
          <Marker lat={51.449359} lng={5.473838} text='Kam Po' id={5} handleToggleOpen={() => handleToggleOpen(5)} />
          <Marker lat={51.447382} lng={5.475611} text='Sri Ganesh Indiaaas' id={6} handleToggleOpen={() => handleToggleOpen(6)} /> */}
        </GoogleMapReact>
        <NovFC id={itemId} />
      </div>
    </IonPage >
  );
}

export default SimpleMap;
