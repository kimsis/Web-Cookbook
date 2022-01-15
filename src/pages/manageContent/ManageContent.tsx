import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import "./ManageContent.css";
import AppContext from "../../store/AppContext";
import { useHistory } from "react-router";
import ContentList from "../../components/AdminTools/ContentSwiper/ContentSwiper";
import axios, { AxiosResponse } from "axios";
import Data from "../../shared/interfaces/Data.interface";
import Recipe from "../../shared/interfaces/Recipe.interface";
import RecipeInfoModal from "../../components/Recipes/RecipeInfoModal";

const ManageContent: React.FC<{}> = (props) => {
  const appContext = useContext(AppContext);
  const history = useHistory();
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  
  // let user = localStorage.getItem("user");
  // if(user != null) {
  //   appContext.user = JSON.parse(user);
  // }
  
  if (appContext.user == null) {
    history.replace("/login");
  } else if (!appContext.user.type) {
    console.log(appContext.user);
    
    history.replace("/profile");
  }

  const [showUserModal, setShowUserModal] = useState(0);
  const [showVendorModal, setShowVendorModal] = useState(0);
  const [showRecipeModal, setShowRecipeModal] = useState(0);

  let recipesArray: Data;
  useEffect(() => {
    getData();
  }, []);
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


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle> Manage Content </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonModal
          isOpen={showRecipeModal == 0 ? false : true}
          onDidDismiss={() => setShowRecipeModal(0)}
        >
          <RecipeInfoModal
            id={showRecipeModal}
            setShowRecipeInfoModal={setShowRecipeModal}
          />
        </IonModal>
      <ContentList showModal={setShowRecipeModal} items={recipes} />
    </IonPage>
  );
};

export default ManageContent;
