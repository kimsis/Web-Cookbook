import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonModal } from '@ionic/react';
import React, { useContext, useEffect, useRef, useState } from "react";
import ModalCreateRecipe from '../../components/Recipes/ModalCreateRecipe';
import RecipeListItem from '../../components/Recipes/RecipeListItem';
import RecipeInfoModal from '../../components/Recipes/RecipeInfoModal';
import axios, { AxiosResponse } from 'axios';
import { Recipe } from '../../store/RecipesContext';
import './Recipes.css';

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
    const [recipes, setRecipes] = useState<Recipe[] | null>();



    let recipesArray: Data;


    async function getData() {
      await axios("https://i403375core.venus.fhict.nl/Recipe/PagedList")
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
    }
    
    function setData(data: AxiosResponse) {
      recipesArray = JSON.parse(JSON.stringify(data.data));
      console.log(recipesArray.items);
      setRecipes(recipesArray.items)

    }
    
    function setError(error:any) {
      console.log(error);
      
    }

    function setshowRecipeInfoModal(id: number) {
      console.log(id);
      setShowRecipeInfoModal(id);
    }

    let RecipeList;
    if (recipes != null) {
      RecipeList = recipes.map((recipe) =>
        <div key={recipe.id} onClick={() => setshowRecipeInfoModal(recipe.id)}>
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
    } else {
      RecipeList = <div> No recipes found! </div>;
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
        <IonModal isOpen={showRecipeCreateModal} onDidDismiss={() => setshowRecipeCreateModal(false)}>
          <ModalCreateRecipe showRecipeCreateModal={showRecipeCreateModal} setShowRecipeCreateModal={setshowRecipeCreateModal} />
        </IonModal>
        <IonModal isOpen={showRecipeInfoModal == 0 ? false : true}  onDidDismiss={() => setShowRecipeInfoModal(0)}>
            < RecipeInfoModal id={showRecipeInfoModal} setShowRecipeInfoModal={setShowRecipeInfoModal}/>
          </IonModal>
        <IonList id='menu-list'>
        { RecipeList }
        </IonList>
      </IonContent>
    </IonPage>
	);
};

export default Recipes;
