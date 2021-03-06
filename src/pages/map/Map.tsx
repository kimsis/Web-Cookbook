import React, { Component, useContext, useEffect, useState } from "react";
import GoogleMapReact, { Props } from "google-map-react";
import "./Map.css";
import {
  IonButton,
  IonContent,
  IonModal,
  IonPage,
  IonTitle,
} from "@ionic/react";
import axios from "axios";
import Recipe from "../../shared/interfaces/Recipe.interface";
import AppContext from "../../store/AppContext";
import Vendor from "../../shared/interfaces/Vendor.interface";
import Data from "../../shared/interfaces/Data.interface";
import ModalRecipeInfo from "../../components/Recipes/ModalRecipeInfo";
import ModalVendorInfo from "../../components/Vendors/ModalVendorInfo";
import Ingredient from "../../shared/interfaces/Ingredient.interface";
import { RouteComponentProps, useLocation } from "react-router";

export const Marker = ({
  lat,
  lng,
  text,
  id,
  markerImagePath,
  handleToggleOpen,
}: {
  lat?: any;
  lng?: any;
  text?: any;
  id?: number;
  markerImagePath?: any;
  handleToggleOpen?: any;
}) => (
  <div
    style={{
      width: "75px",
      transform: "translate(-50%, -100%)",
    }}
  >
    <div
      onClick={(e) => id && handleToggleOpen(id)}
      style={{
        margin: "auto",
        color: "white",
        background: "orange",
        padding: "4px",
        width: "50px",
        height: "auto",
        display: "block",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "35%",
      }}
    >
      {markerImagePath && (
        <img
          alt="item image"
          src={markerImagePath}
          width="40px"
          height="40px"
          style={{
            borderRadius: "50%",
          }}
        />
      )}
    </div>
    <div
      style={{
        width: 0,
        margin: "auto",
        height: 0,
        borderLeft: "20px solid transparent",
        borderRight: "20px solid transparent",
        borderTop: "20px solid orange",
        transform: "translate(0%, -25%)",
      }}
    ></div>
    <p
      style={{
        color: "black",
        textAlign: "center",
        fontSize: "1.2em",
        fontWeight: "bold",
      }}
    >
      {text}
    </p>
  </div>
);

const SimpleMap: React.FC<{}> = (props) => {
  const [showRecipeInfoModal, setShowRecipeInfoModal] = useState(0);
  const [showVendorInfoModal, setShowVendorInfoModal] = useState(0);
  const [itemId, setItemId] = useState(-1);
  const [recipes, setRecipes] = useState<Recipe[] | null>();
  const [vendors, setVendors] = useState<Vendor[] | null>();
  const [selectedMarkerType, setMarkerType] = useState<JSX.Element[]>([]);
  const [color, setSelected] = useState(true);
  const [ingredientId, setIngredientId] = useState<number>(0);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.pathname);
    let id = params.get("id") ? params.get("id") : "0";
    setIngredientId(Number.parseInt(id!));
    getRecipes();
    getVendors(Number.parseInt(id!));
  }, [location]);

  useEffect(() => {}, [ingredientId]);

  const NovFC: React.FC<{ id: number }> = (props) => {
    return (
      <IonContent>
        <IonModal
          isOpen={showRecipeInfoModal == 0 ? false : true}
          onDidDismiss={() => setShowRecipeInfoModal(0)}
        >
          <ModalRecipeInfo
            id={showRecipeInfoModal}
            setShowRecipeInfoModal={setShowRecipeInfoModal}
          />
        </IonModal>
      </IonContent>
    );
  };

  const VendorFC: React.FC<{ id: number }> = (props) => {
    return (
      <IonContent>
        <IonModal
          isOpen={showVendorInfoModal === 0 ? false : true}
          onDidDismiss={() => setShowVendorInfoModal(0)}
        >
          <ModalVendorInfo
            id={showVendorInfoModal}
            setShowVendorInfoModal={setShowVendorInfoModal}
          />
        </IonModal>
      </IonContent>
    );
  };

  let appContext = useContext(AppContext);

  async function getRecipes() {
    await axios(appContext.http + "Recipe/PagedList")
      .then((response) => {
        let recipesArray: Data = JSON.parse(JSON.stringify(response.data));
        setRecipes(recipesArray.items);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  async function getVendors(id: number) {
    if (id == 0) {
      await axios(appContext.http + "Vendor/PagedList")
        .then((response) => {
          let vendorsArray: Data = JSON.parse(JSON.stringify(response.data));
          setVendors(vendorsArray.items);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          setError(error);
        });
    } else {
      axios
        .get(appContext.http + "Ingredient/" + id)
        .then((response) => {
          let ingredient: Ingredient = JSON.parse(
            JSON.stringify(response.data)
          );
          setVendors(ingredient.vendors);
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          setError(error);
        });
    }
  }

  function setError(error: any) {
    console.log(error);
  }

  function handleToggleOpenRecipe(e: any) {
    setItemId(e);
    setShowRecipeInfoModal(e);
  }

  function handleToggleOpenVendor(e: any) {
    setItemId(e);
    setShowVendorInfoModal(e);
  }

  function selectMarkerType(e: any) {
    setMarkerType(e);
    if (e == vendorMarkerList) {
      setSelected(false);
    } else {
      setSelected(true);
    }
  }

  let center = {
    lat: 51.449747,
    lng: 5.473891,
  };
  let zoom = 17;

  const [recipeMarkerList, setRecipeMarkerList] = useState<JSX.Element[]>([
    <h2 style={{ color: "orange" }}> No recipes found! </h2>,
  ]);

  const [vendorMarkerList, setVendorMarkerList] = useState<JSX.Element[]>([
    <h2 style={{ color: "orange" }}> No vendors found! </h2>,
  ]);

  useEffect(() => {
    if (recipes != null) {
      const recipeMarkerList = recipes.map((recipe) => (
        <Marker
          id={recipe.id}
          text={recipe.title}
          markerImagePath={recipe.imagePath}
          lng={recipe.longitude}
          lat={recipe.latitude}
          handleToggleOpen={() => handleToggleOpenRecipe(recipe.id)}
        />
      ));
      setRecipeMarkerList(recipeMarkerList);
      setSelected(true);
    } else {
      setRecipeMarkerList([<div> No recipes found! </div>]);
    }
  }, [recipes]);

  useEffect(() => {
    if (vendors?.length) {
      const _vendorMarkerList = vendors.map((vendor) => (
        <Marker
          id={vendor.id}
          text={vendor.name}
          markerImagePath={vendor.imagePath}
          lng={vendor.longitude}
          lat={vendor.latitude}
          handleToggleOpen={() => handleToggleOpenVendor(vendor.id)}
        />
      ));
      setVendorMarkerList(_vendorMarkerList);
      setSelected(false);
    }
  }, [vendors]);

  useEffect(() => {
    if (ingredientId == 0) {
      if (recipeMarkerList.length > 0) {
        selectMarkerType(recipeMarkerList);
        setSelected(true);
      } else {
        selectMarkerType(vendorMarkerList);
        setSelected(false);
      }
    } else {
      if (vendorMarkerList.length > 0) {
        selectMarkerType(vendorMarkerList);
        setSelected(false);
      } else {
        selectMarkerType(recipeMarkerList);
        setSelected(true);
      }
    }
  }, [recipeMarkerList, vendorMarkerList]);

  return (
    <IonPage>
      <div style={{ position: "relative", height: "100vh", width: "100%" }}>
        <div
          style={{
            position: "absolute",
            zIndex: "150",
            top: "3%",
            width: "100%",
            textAlign: "center",
            display: "inline-block",
          }}
        >
          <IonButton
            color={color == false ? "secondary" : "primary"}
            fill="solid"
            onClick={() => selectMarkerType(recipeMarkerList)}
            style={{ width: "250px" }}
          >
            Recipes
          </IonButton>
          <IonButton
            color={color === true ? "secondary" : "primary"}
            fill="solid"
            onClick={() => selectMarkerType(vendorMarkerList)}
            style={{ width: "250px" }}
          >
            Vendors
          </IonButton>
        </div>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyC_n0tFC99A24CfBUdscGVjGenGf7PILNw",
          }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          {selectedMarkerType}
        </GoogleMapReact>
        <NovFC id={itemId} />
        <VendorFC id={itemId} />
      </div>
    </IonPage>
  );
};

export default SimpleMap;
