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
import React, { useContext, useEffect, useState } from "react";
import "./ManageContent.css";
import AppContext from "../../store/AppContext";
import { useHistory } from "react-router";
import ContentList from "../../components/AdminTools/ContentSwiper/ContentSwiper";
import axios, { AxiosResponse } from "axios";
import Data from "../../shared/interfaces/Data.interface";
import Recipe from "../../shared/interfaces/Recipe.interface";
import ModalCreateRecipe from "../../components/Recipes/ModalCreateRecipe";
import Vendor from "../../shared/interfaces/Vendor.interfdace";

const ManageContent: React.FC<{}> = (props) => {
  const appContext = useContext(AppContext);
  const history = useHistory();
  const [vendors, setVendors] = useState<Vendor[] | null>(null);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [pendingRecipes, setPendingRecipes] = useState<Recipe[] | null>(null);

  if (appContext.user == null) {
    history.replace("/login");
  } else if (!appContext.user.type) {
    console.log(appContext.user);
    history.replace("/profile");
  }

  const [showUserModal, setShowUserModal] = useState(0);
  const [showVendorModal, setShowVendorModal] = useState(0);
  const [showRecipeModal, setShowRecipeModal] = useState(0);

  let dataArray: Data;
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await axios(appContext.http + "Recipe/PagedList")
      .then((response) => {
        setRecipesData(response);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
    await axios(appContext.http + "Vendor/PagedList")
      .then((response) => {
        setVendorsData(response);
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
        setPendingRecipesData(response);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  function setRecipesData(data: AxiosResponse) {
    dataArray = JSON.parse(JSON.stringify(data.data));
    setRecipes(dataArray.items);
  }

  function setPendingRecipesData(data: AxiosResponse) {
    dataArray = JSON.parse(JSON.stringify(data.data));
    setPendingRecipes(dataArray.items);
  }

  function setVendorsData(data: AxiosResponse) {
    dataArray = JSON.parse(JSON.stringify(data.data));
    setVendors(dataArray.items);
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
      <IonContent>
        <ContentList addItems={false} title="Recipes Awaiting approval" showModal={setShowRecipeModal} items={pendingRecipes} />
        <ContentList addItems={true} title="Create/Edit Recipes" showModal={setShowRecipeModal} items={recipes} />
        <ContentList addItems={true} title="Create/Edit Vendors" showModal={setShowRecipeModal} items={vendors} />
      </IonContent>
    </IonPage>
  );
};

export default ManageContent;
