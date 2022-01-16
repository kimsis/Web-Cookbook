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
import RecipeInfoModal from "../../components/Recipes/RecipeInfoModal";
import axios from "axios";
import Recipe from "../../shared/interfaces/Recipe.interface";
import AppContext from "../../store/AppContext";
import Vendor from "../../shared/interfaces/Vendor.interface";
import VendorInfoModal from "../../components/Profile/Vendors/VendorInfoModal";

interface RecipeData {
  page: number;
  size: number;
  items: Recipe[];
}

interface VendorData {
  page: number;
  size: number;
  items: Vendor[];
}

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
      width: "50px",
      transform: "translate(-50%, -100%)",
    }}
  >
    <div
      onClick={(e) => id && handleToggleOpen(id)}
      style={{
        color: "white",
        background: "orange",
        padding: "4px",
        width: "50px",
        height: "auto",
        display: "block",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "30%",
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
        height: 0,
        borderLeft: "20px solid transparent",
        borderRight: "20px solid transparent",
        borderTop: "20px solid orange",
        transform: "translate(13%, -25%)",
      }}
    ></div>
    <p>{text}</p>
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

  let recipesArray: RecipeData;
  let vendorsArray: VendorData;

  useEffect(() => {
    getRecipes();
    getVendors();
  }, []);

  const NovFC: React.FC<{ id: number }> = (props) => {
    return (
      <IonContent>
        <IonModal
          isOpen={showRecipeInfoModal == 0 ? false : true}
          onDidDismiss={() => setShowRecipeInfoModal(0)}
        >
          <RecipeInfoModal
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
          <VendorInfoModal
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
        recipesArray = JSON.parse(JSON.stringify(response.data));
        console.log(recipesArray.items);
        setRecipes(recipesArray.items);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  async function getVendors() {
    await axios(appContext.http + "Vendor/PagedList")
      .then((response) => {
        vendorsArray = JSON.parse(JSON.stringify(response.data));
        console.log(vendorsArray.items);
        setVendors(vendorsArray.items);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
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
    <div> No recipes found! </div>,
  ]);

  const [vendorMarkerList, setVendorMarkerList] = useState<JSX.Element[]>([
    <div> No vendors found! </div>,
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
    if (vendors != null) {
      const vendorMarkerList = vendors.map((vendor) => (
        <Marker
          id={vendor.id}
          text={vendor.name}
          markerImagePath={vendor.imagePath}
          lng={vendor.longitude}
          lat={vendor.latitude}
          handleToggleOpen={() => handleToggleOpenVendor(vendor.id)}
        />
      ));
      setVendorMarkerList(vendorMarkerList);
    } else {
      setVendorMarkerList([<div> No vendors found! </div>]);
    }
  }, [vendors]);

  useEffect(() => {
    if (recipeMarkerList.length > 0) {
      selectMarkerType(recipeMarkerList);
      setSelected(true);
    } else {
      selectMarkerType(vendorMarkerList);
      setSelected(false);
    }
  }, [recipeMarkerList]);

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
          {/* <Marker lat={51.45079} lng={5.471861} text='Lidl' id={1} handleToggleOpen={() => handleToggleOpen(1)} />
          <Marker lat={51.451563} lng={5.472298} text='Albert Heijn' id={2} handleToggleOpen={() => handleToggleOpen(50)} />
          <Marker lat={51.449972} lng={5.472884} text='The Food Corner' id={3} handleToggleOpen={() => handleToggleOpen(55)} />
          <Marker lat={51.448399} lng={5.474719} text='Athene' id={4} handleToggleOpen={() => handleToggleOpen(57)} />
          <Marker lat={51.449359} lng={5.473838} text='Kam Po' id={5} handleToggleOpen={() => handleToggleOpen(5)} />
          <Marker lat={51.447382} lng={5.475611} text='Sri Ganesh Indiaaas' id={6} handleToggleOpen={() => handleToggleOpen(6)} /> */}
        </GoogleMapReact>
        <NovFC id={itemId} />
        <VendorFC id={itemId} />
      </div>
    </IonPage>
  );
};

export default SimpleMap;
