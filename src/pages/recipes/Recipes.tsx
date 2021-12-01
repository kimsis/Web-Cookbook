import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonModal } from '@ionic/react';
import React, { useContext, useEffect, useRef, useState } from "react";
import { Virtuoso } from 'react-virtuoso'
import ModalCreateRecipe from '../../components/ModalCreateRecipe';
import RecipeListItem from '../../components/RecipeListItem';
import './Recipes.css';
import { createContext } from 'react';
import RecipesContext from '../../store/RecipesContext';
import RecipeInfoModal from '../../components/RecipeInfoModal';
import axios, { AxiosResponse } from 'axios';

export interface Recipe {
    id: number;
    title: string;
    sharedBy: string;
    difficulty: number;
    type: string;
    instructions: string;
    countryOfOrigin: string;
    numberOfServings: string;
    preparationTimeTicks: number;
    rating: number;
    imagePath: string;
    ingredients: string[];
    unlistedIngredients: string[];
    timeToCook: string;
}

interface Data {
  page: number;
  size: number;
  items: Recipe[];
}



const Recipes: React.FC<{
}> = (props) => {

useEffect(() => {
  getData();
}, [])

    const [showRecipeCreateModal, setshowRecipeCreateModal] = useState(false);
    const [showRecipeInfoModal, setShowRecipeInfoModal] = useState(0);
    const recipesContext = useContext(RecipesContext);
    const recipes = recipesContext.recipes;



    let recipesArray: Data;


    async function getData() {
      await axios("https://i403375core.venus.fhict.nl/Recipe/PagedList")
      .then((response) => {
        recipesArray = JSON.parse(JSON.stringify(response.data));
        console.log(recipesArray.items);
        recipesContext.setRecipes(recipesArray.items)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
    }
    
    function setData(data: AxiosResponse) {
      console.log(data);
      
    }
    
    function setError(error:any) {
      console.log(error);
      
    }

    function setshowRecipeInfoModal(id: number) {
      console.log(id);
      setShowRecipeInfoModal(id);
    }
	return (
		<IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Recipes Overview</IonTitle>
          <IonButtons slot="end">
            <IonButton color="secondary" fill="solid" onClick={() => setshowRecipeCreateModal(true)}>Add Recipe</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonModal isOpen={showRecipeCreateModal}>
          <ModalCreateRecipe showRecipeCreateModal={showRecipeCreateModal} setShowRecipeCreateModal={setshowRecipeCreateModal} />
        </IonModal>
        <IonModal isOpen={showRecipeInfoModal == 0 ? false : true} >
            < RecipeInfoModal id={showRecipeInfoModal} setShowRecipeInfoModal={setShowRecipeInfoModal}/>
          </IonModal>
        <IonList id='menu-list'>
        { recipes.map((recipe, index) => {
				return (
          <div key={index} onClick={() => setshowRecipeInfoModal(recipe.id)}>
					  <RecipeListItem
              id={recipe.id}
              title={recipe.title}
              sharedBy={recipe.sharedBy}
              countryOfOrigin={recipe.countryOfOrigin}
              type={recipe.type}
              rating={recipe.rating}
              imagePath={recipe.imagePath}
              timeToCook={recipe.preparationTimeTicks}
					  />
          </div>
				);
            })}
        </IonList>
      </IonContent>
    </IonPage>
	);
};

export default Recipes;
