import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import "./ManageContent.css";
import AppContext from "../../store/AppContext";
import { useHistory } from "react-router";
import ContentList from "../../components/AdminTools/ContentSwiper/ContentSwiper";
import axios, { AxiosResponse } from "axios";
import Data from "../../shared/interfaces/Data.interface";
import Recipe from "../../shared/interfaces/Recipe.interface";
import ModalRecipe from "../../components/Recipes/ModalRecipe";
import Vendor from "../../shared/interfaces/Vendor.interface";
import Ingredient from "../../shared/interfaces/Ingredient.interface";
import ModalIngredient from "../../components/Ingredients/ModalIngredient";
import ModalVendor from "../../components/Vendors/ModalVendor";
import Displayable from "../../shared/interfaces/Displayable.interface";
import { ToastContainer } from "react-toastify";

const ManageContent: React.FC<{}> = (props) => {
  const appContext = useContext(AppContext);
  const history = useHistory();
  const [pendingRecipes, setPendingRecipes] = useState<Recipe[] | null>(null);
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [vendors, setVendors] = useState<Vendor[] | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[] | null>(null);

  if (appContext.user == null) {
    history.push("/login");
  } else if (!appContext.user.isAdmin) {
    history.push("/profile");
  }

  const [showUserModal, setShowUserModal] = useState(0);
  const [showVendorModal, setShowVendorModal] = useState(0);
  const [showRecipeModal, setShowRecipeModal] = useState(0);
  const [showIngredientModal, setShowIngredientModal] = useState(0);

  let dataArray: Data;
  useEffect(() => {
    getData("Recipe/PagedListPending", setPendingRecipes);
    getData("Recipe/PagedList", setRecipes);
    getData("Vendor/PagedList", setVendors);
    getData("Ingredient/PagedList", setIngredients);
  }, []);

  async function getData(endpoint: String, setter: Dispatch<any[]>) {
    await axios(appContext.http! + endpoint, {
      headers: {
        "x-auth":
          appContext.user?.JWTToken === undefined
            ? ""
            : appContext.user.JWTToken,
      },
    })
      .then((response) => {
        setData(response, setter);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  function setData(data: AxiosResponse, setter: Dispatch<any[]>) {
    dataArray = JSON.parse(JSON.stringify(data.data));
    setter(dataArray.items);
  }

  function setError(error: any) {
    console.log(error);
  }

  return (
    <IonPage>
      <ToastContainer />
      <IonHeader>
        <IonToolbar>
          {/* <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons> */}
          <IonTitle> Manage Content </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonModal
        isOpen={showRecipeModal === 0 ? false : true}
        onDidDismiss={() => {
          setShowRecipeModal(0);
          getData("Recipe/PagedList", setRecipes);
          getData("Recipe/PagedListPending", setPendingRecipes);
        }}
      >
        <ModalRecipe
          showRecipeModal={showRecipeModal}
          setShowRecipeModal={setShowRecipeModal}
        />
      </IonModal>
      <IonModal
        isOpen={showVendorModal === 0 ? false : true}
        onDidDismiss={() => {
          setShowVendorModal(0);
          getData("Vendor/PagedList", setVendors);
        }}
      >
        <ModalVendor
          showVendorCreateModal={showVendorModal}
          setShowVendorCreateModal={setShowVendorModal}
        />
      </IonModal>
      <IonModal
        isOpen={showIngredientModal === 0 ? false : true}
        onDidDismiss={() => {
          setShowIngredientModal(0);
          getData("Ingredient/PagedList", setIngredients);
        }}
      >
        <ModalIngredient
          showIngredientModal={showIngredientModal}
          setShowIngredientModal={setShowIngredientModal}
        />
      </IonModal>
      <IonContent>
        <ContentList
          addItems={false}
          title="Recipes Awaiting approval"
          showModal={setShowRecipeModal}
          items={pendingRecipes}
        />
        <ContentList
          addItems={true}
          title="Create/Edit Recipes"
          showModal={setShowRecipeModal}
          items={recipes}
        />
        <ContentList
          addItems={true}
          title="Create/Edit Vendors"
          showModal={setShowVendorModal}
          items={vendors}
        />
        <ContentList
          addItems={true}
          title="Create/Edit Ingredients"
          showModal={setShowIngredientModal}
          items={ingredients}
        />
      </IonContent>
    </IonPage>
  );
};

export default ManageContent;
