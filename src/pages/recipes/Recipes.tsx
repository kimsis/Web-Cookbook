import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonModal,
  IonSearchbar,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import ModalFilterRecipe from "../../components/Recipes/ModalFilterRecipe";
import RecipeListItem from "../../components/Recipes/RecipeListItem";
// import RecipeInfoModal from "../../components/Recipes/RecipeInfoModal";
import axios, { AxiosResponse } from "axios";
import Recipe from "../../shared/interfaces/Recipe.interface";
import Data from "../../shared/interfaces/Data.interface";
import "./Recipes.css";
import AppContext from "../../store/AppContext";
import FilterContext from "../../store/FiltersContext";

const Recipes: React.FC<{}> = (props) => {
  useEffect(() => {
    getData();
  }, []);

  // const [showRecipeInfoModal, setShowRecipeInfoModal] = useState(0);
  const [showRecipeFilterModal, setShowRecipeFilterModal] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[] | null>();
  const [searchText, setSearchText] = useState("");
  const appContext = useContext(AppContext);
  const filterContext = useContext(FilterContext);

  let recipesArray: Data;
  async function getData(attributes: string = "") {
    await axios(appContext.http + "Recipe/PagedList" + attributes)
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
    setRecipes(recipesArray.items);
  }

  function setError(error: any) {
    console.log(error);
  }

  function SearchFiltered() {
    let httpAddition = "?title=" + searchText;
    filterContext.filters.map(
      (filter) => (httpAddition += "&" + filter.type + "=" + filter.value)
    );
    getData(httpAddition);
  }

  function FilterModalDismiss() {
    setShowRecipeFilterModal(false);
    SearchFiltered();
  }
  function SearchText(value: string) {
    setSearchText(value);
    SearchFiltered();
  }

  let RecipeList;
  if (recipes != null && recipes.length > 0) {
    RecipeList = recipes.map((recipe, key) => (
      <div
        className="recipe-list"
        key={recipe.id}
      // onClick={() => setShowRecipeInfoModal(recipe.id)}
      >
        <RecipeListItem
          key={recipe.id}
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
    ));
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
          <IonTitle>Explore Recipes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonModal
          isOpen={showRecipeFilterModal}
          onDidDismiss={() => FilterModalDismiss()}
        >
          <ModalFilterRecipe
            showRecipeFilterModal={showRecipeFilterModal}
            setShowRecipeFilterModal={setShowRecipeFilterModal}
          />
        </IonModal>
        {/* <IonModal
          isOpen={showRecipeInfoModal == 0 ? false : true}
          onDidDismiss={() => setShowRecipeInfoModal(0)}
        >
          <RecipeInfoModal
            id={showRecipeInfoModal}
            setShowRecipeInfoModal={setShowRecipeInfoModal}
          />
        </IonModal> */}
        <IonSearchbar
          value={searchText}
          onIonChange={(e) =>
            SearchText(e.detail.value == undefined ? "" : e.detail.value)
          }
          showCancelButton="focus"
        ></IonSearchbar>
        <IonButton class="filter" onClick={(e) => getData()}>
          All
        </IonButton>
        <IonButton
          class="filter"
          onClick={() => setShowRecipeFilterModal(true)}
        >
          +Filter
        </IonButton>
        <IonList id="menu-list">{RecipeList}</IonList>
      </IonContent>
    </IonPage>
  );
};

export default Recipes;
