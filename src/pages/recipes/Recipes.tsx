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
  IonIcon,
} from "@ionic/react";
import React, { useContext, useEffect, useState } from "react";
import RecipeListItem from "../../components/Recipes/RecipeListItem";
// import RecipeInfoModal from "../../components/Recipes/RecipeInfoModal";
import axios, { AxiosResponse } from "axios";
import Recipe from "../../shared/interfaces/Recipe.interface";
import Data from "../../shared/interfaces/Data.interface";
import "./Recipes.css";
import AppContext from "../../store/AppContext";
import FilterContext from "../../store/FiltersContext";
import ModalRecipeInfo from "../../components/Recipes/ModalRecipeInfo";
import ModalRecipeFilter from "../../components/Recipes/ModalRecipeFilter";
import RecipeList from "../../components/Recipes/RecipeList";
import QRReader from "../../components/QR/QRReader";

const Recipes: React.FC<{}> = (props) => {
  useEffect(() => {
    getData();
  }, []);

  const [showRecipeInfoModal, setShowRecipeInfoModal] = useState(0);
  const [showRecipeFilterModal, setShowRecipeFilterModal] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {/* <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons> */}
          <IonTitle>Explore Recipes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="modal">
        <IonModal
          isOpen={showRecipeFilterModal}
          onDidDismiss={() => FilterModalDismiss()}
        >
          <ModalRecipeFilter
            showRecipeFilterModal={showRecipeFilterModal}
            setShowRecipeFilterModal={setShowRecipeFilterModal}
          />
        </IonModal>
        <IonModal
          isOpen={showRecipeInfoModal === 0 ? false : true}
          onDidDismiss={() => setShowRecipeInfoModal(0)}
        >
          <ModalRecipeInfo
            id={showRecipeInfoModal}
            setShowRecipeInfoModal={setShowRecipeInfoModal}
          />
        </IonModal>
        <IonSearchbar
          value={searchText}
          onIonChange={(e) =>
            SearchText(e.detail.value === undefined ? "" : e.detail.value)
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
        <QRReader></QRReader>

        <RecipeList
          recipes={recipes}
          message="No recipes found"
          onDismissCallback={() => {
            getData();
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default Recipes;
