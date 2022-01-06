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

let dummyRecipes:Recipe[] = ([
  {
      id: 1,
      title: "Swedish Meatballs",
      sharedBy: "Elise Bauer",
      difficulty: 3,
      type: "Meatballs",
      instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus mauris nibh, ultricies eget pulvinar sit amet, pharetra non ipsum. Donec ipsum tellus, pharetra vitae efficitur nec, vestibulum ac justo. Maecenas porta consequat odio, et rutrum nisi. Sed aliquet eget neque molestie vehicula. Quisque ultrices imperdiet tincidunt. Donec fermentum pellentesque massa, at malesuada est. Fusce a elit in nibh suscipit pellentesque. Phasellus leo sapien, scelerisque sed egestas in, ullamcorper vitae tellus.",
      countryOfOrigin: "Sweden",
      numberOfServings: "4 to 6 servings",
      preparationTimeTicks: 20,
      imagePath: "https://api.time.com/wp-content/uploads/2018/05/swedish-meatballs-turkey.jpg",
      longitude: 0,
      latitude: 0,
      ingredients: ["1 tablespoon butter", "1/2 large onion", "1/4 cup milk", "3 slices bread", "1 large egg", "3/4 pound ground beef", "1/2 pound ground pork", "1 teaspoon kosher salt", "1 teaspoon black pepper", "1/2 teaspoon freshly grated nutmeg", "1/2 teaspoon ground cardamom"],
      unlistedIngredients: ["salt or smthn"],
      rating: 4.5,
      timeToCook: "80 min",
  }
])



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
        recipesArray = JSON.parse(JSON.stringify(response.data));
        console.log(recipesArray.items);
        setRecipes(recipesArray.items)
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
