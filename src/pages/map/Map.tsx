import React, { useContext, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import './Map.css';
import {
  IonButton,
  IonContent,
  IonModal,
  IonPage,
} from '@ionic/react';
import RecipeInfoModal from '../../components/Recipes/RecipeInfoModal';
import axios from 'axios';
import Recipe from '../../shared/interfaces/Recipe.interface';
import AppContext from '../../store/AppContext';

interface Data {
  page: number;
  size: number;
  items: Recipe[];
}


export const Marker = ({ lat, lng, text, id, markerImagePath, handleToggleOpen }: { lat?: any; lng?: any; text?: any; id?: number; markerImagePath?: any; handleToggleOpen?: any; }) => (
  <div style={{
    width: '50px',
    transform: 'translate(-50%, -100%)'
  }}>
    <div onClick={(e) => id &&  handleToggleOpen(id) }
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
      {markerImagePath && <img
        alt='recipe'
        src={markerImagePath}
        width='40px'
        height='40px'
        style={{
          borderRadius: '50%'
        }}
      />}

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

  const [showRecipeInfoModal, setShowRecipeInfoModal] = useState(0);
  const [itemId, setItemId] = useState(-1);
  const [recipes, setRecipes] = useState<Recipe[] | null>();
  // const [ingredients, setIngredients] = useState<Ingredient[] | null>();

  let recipesArray: Data;

  useEffect(() => {
    getRecipes();
    // getIngredients();
  }, [])

  const NovFC: React.FC<{ id: number }> = (props) => {

    return (<IonContent >
      <IonModal isOpen={showRecipeInfoModal === 0 ? false : true} onDidDismiss={() => setShowRecipeInfoModal(0)}>
        <RecipeInfoModal id={showRecipeInfoModal} setShowRecipeInfoModal={setShowRecipeInfoModal} />
      </IonModal>

    </IonContent>)
  }

  let appContext = useContext(AppContext);

  async function getRecipes() {
    await axios(appContext.http + "Recipe/PagedList")
      .then((response) => {
        recipesArray = JSON.parse(JSON.stringify(response.data));
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

  function setError(error: any) {
    console.log(error);

  }

  function handleToggleOpen(e: any) {
    setItemId(e)
    setShowRecipeInfoModal(e)
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
        markerImagePath={recipe.imagePath}
        lng={recipe.longitude}
        lat={recipe.latitude}
        handleToggleOpen={() => handleToggleOpen(recipe.id)}
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
