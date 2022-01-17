import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { Dispatch, useContext, useEffect, useState } from "react";
import "./ManageContent.css";
import AppContext from "../../store/AppContext";
import { useHistory } from "react-router";
import ContentList from "../../components/AdminTools/ContentSwiper/ContentSwiper";
import axios, { AxiosResponse } from "axios";
import Data from "../../shared/interfaces/Data.interface";
import Recipe from "../../shared/interfaces/Recipe.interface";
import ModalCreateRecipe from "../../components/Recipes/ModalCreateRecipe";
import Vendor from "../../shared/interfaces/Vendor.interface";
import Ingredient from "../../shared/interfaces/Ingredient.interfdace";
import ModalCreateVendor from "../../components/Vendors/ModalCreateVendor";

const ManageContent: React.FC<{}> = (props) => {
  const appContext = useContext(AppContext);
  const history = useHistory();
  const [pendingRecipes, setPendingRecipes] = useState<Recipe[] | null>(null);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [vendors, setVendors] = useState<Vendor[] | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[] | null>(null);

  if (appContext.user == null) {
    history.replace("/login");
  } else if (!appContext.user.isAdmin) {
    console.log(appContext.user);
    history.replace("/profile");
  }

  const [showUserModal, setShowUserModal] = useState(0);
  const [showVendorModal, setShowVendorModal] = useState(0);
  const [showRecipeModal, setShowRecipeModal] = useState(0);
  const [showIngredientModal, setShowIngredientModal] = useState(0);

  let dataArray: Data;
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await axios(appContext.http + "Recipe/PagedList")
      .then((response) => {
        setData(response, setRecipes);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
    await axios(appContext.http + "Vendor/PagedList")
      .then((response) => {
        setData(response, setVendors);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
    await axios(appContext.http + "Ingredients/PagedList")
      .then((response) => {
        setData(response, setIngredients);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
    await axios(appContext.http + "Recipe/PagedListPending", {
      headers: {
        "x-auth":
          appContext.user?.JWTToken === undefined
            ? ""
            : appContext.user.JWTToken,
      },
    })
      .then((response) => {
        setData(response, setPendingRecipes);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  function setData(data: AxiosResponse, setData: Dispatch<any[]>) {
    dataArray = JSON.parse(JSON.stringify(data.data));
    setData(dataArray.items);
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
        isOpen={showRecipeModal === 0 ? false : true}
        onDidDismiss={() => setShowRecipeModal(0)}
      >
        <ModalCreateRecipe
          showRecipeCreateModal={showRecipeModal}
          setShowRecipeCreateModal={setShowRecipeModal}
        />
      </IonModal>
      <IonModal
        isOpen={showVendorModal === 0? false : true}
        onDidDismiss={() => setShowVendorModal(0)}
        >
          <ModalCreateVendor
            showVendorCreateModal={showVendorModal}
            setShowVendorCreateModal={setShowVendorModal}
          />
        </IonModal>
      <IonContent>
        <ContentList addItems={false} title="Recipes Awaiting approval" showModal={setShowRecipeModal} items={pendingRecipes} />
        <ContentList addItems={true} title="Create/Edit Recipes" showModal={setShowRecipeModal} items={recipes} />
        <ContentList addItems={true} title="Create/Edit Vendors" showModal={setShowVendorModal} items={vendors} />
        <ContentList addItems={true} title="Create/Edit Ingredients" showModal={setShowIngredientModal} items={ingredients} />
      </IonContent>
    </IonPage>
  );
};

export default ManageContent;
