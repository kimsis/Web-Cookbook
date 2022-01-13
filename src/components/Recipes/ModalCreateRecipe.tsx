import {
  IonButton,
  IonContent,
  IonGrid,
  IonRow,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonCol,
  IonIcon,
  IonItemDivider,
  IonTextarea,
  IonModal,
  IonPage,
} from "@ionic/react";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { cloudUploadOutline } from "ionicons/icons";
import { useForm } from "react-hook-form";
import "./ModalCreateRecipe.css";
import AppContext from "../../store/AppContext";
import SimpleMap, { Marker } from "../../pages/map/Map";
import GoogleMapReact, { Props } from "google-map-react";

const ModalCreateRecipe: React.FC<{
  showRecipeCreateModal: boolean;
  setShowRecipeCreateModal: Dispatch<SetStateAction<boolean>>;
}> = (props) => {
  const [image, setImage] = useState("");

  const imagePath = "https://icon-library.com/images/dot-icon/dot-icon-17.jpg"; //Image for the marker
  const [marker, setMarker] = useState({ lat: 0, lng: 0, imagePath });

  const appContext = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const fileInput = useRef<HTMLInputElement>(null);
  const imageSelectedHandler = (event: any) => {
    const imageURL: any = URL.createObjectURL(event.target.files[0]);
    setImage(imageURL);
  };
  const handleRef = () => {
    fileInput.current?.click();
  };

  const onSubmit = (data: any) => {
    data = {
      ...data,
      difficulty: parseInt(data.difficulty),
      numberOfServings: parseInt(data.numberOfServings),
      preparationTimeTicks: parseInt(data.preparationTimeTicks),
      ingredients: [],
      imagePath:
        "http://thefountains.ae/wp-content/gallery/dishdash/30B0496-1.jpg",
      rating: 0,
      latitude: marker.lat,
      longitude: marker.lng,
    };
    console.log("creating new recipe with data:", data);

    axios
      .post(appContext.http + "Recipe", data, {
        headers: {
          "x-auth":
            appContext.user?.JWTToken == undefined
              ? ""
              : appContext.user.JWTToken,
        },
      })
      .then(function (response) {
        console.log(response);
        props.setShowRecipeCreateModal(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const MapFC: React.FC<{}> = (props) => {
    const center = {
      lat: 51.449747,
      lng: 5.473891,
    };
    const zoom = 17;
    const maxZoom = 300;

    function _onClick(obj: any) {
      setMarker({ ...obj, imagePath });
    }
    return (
      <IonContent style={{ height: "25vh" }}>
        <GoogleMapReact
          onClick={_onClick}
          style={{ height: "100%" }}
          bootstrapURLKeys={{
            key: "AIzaSyC_n0tFC99A24CfBUdscGVjGenGf7PILNw",
          }}
          defaultCenter={marker.lat ? marker : center}
          defaultZoom={marker.lat ? maxZoom : zoom}
        >
          <Marker
            lng={marker.lng}
            lat={marker.lat}
            imagePath={marker.imagePath}
          />
        </GoogleMapReact>
      </IonContent>
    );
  };

  return (
    <IonContent className="ion-padding">
      <h3 className="ion-padding">Add Recipe</h3>
      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <img src={image} /> //Display Selected Image*/}
        <IonGrid>
          <IonRow>
            <IonCol size="4" style={{ margin: "auto" }}>
              <IonButton onClick={handleRef} style={{ width: "100%" }}>
                <IonIcon slot="start" icon={cloudUploadOutline} />
                Choose Image
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  {...register("imagePath")}
                  ref={fileInput}
                />
              </IonButton>
            </IonCol>
            <IonCol size="8">
              <IonItem>
                <IonLabel position="stacked">Name of Dish</IonLabel>
                <IonInput
                  autocomplete="off"
                  required={true}
                  {...register("title")}
                />
              </IonItem>
              {
                <IonItem>
                  <IonLabel position="stacked">Time to cook</IonLabel>
                  <IonInput {...register("preparationTimeTicks")} />
                </IonItem>
              }
              <IonItem>
                <IonLabel position="stacked">Shared by</IonLabel>
                <IonInput autocomplete="off" {...register("sharedBy")} />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Type of cuisine</IonLabel>
                <IonSelect
                  {...register("type")}
                  cancelText="Cancel"
                  okText="Add"
                >
                  <IonSelectOption value="Turkish">Turkish</IonSelectOption>
                  <IonSelectOption value="Mexican">Mexican</IonSelectOption>
                  <IonSelectOption value="Italian">Italian</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <h3 className="ion-padding">More Details</h3>
          <IonItem>
            <IonLabel position="stacked">Difficulty</IonLabel>
            <IonSelect
              {...register("difficulty")}
              cancelText="Cancel"
              okText="Add"
            >
              <IonSelectOption value={0}>Beginner</IonSelectOption>
              <IonSelectOption value={1}>Intermediate</IonSelectOption>
              <IonSelectOption value={2}>Advanced</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Country of origin</IonLabel>
            <IonInput autocomplete="off" {...register("countryOfOrigin")} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Number of servings</IonLabel>
            <IonInput
              autocomplete="off"
              type="number"
              {...register("numberOfServings")}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Preparation Time</IonLabel>
            <IonInput
              autocomplete="off"
              {...register("preparationTimeTicks")}
              type="number"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Ingredients</IonLabel>
            <IonSelect
              multiple={true}
              {...register("unlistedIngredients")}
              cancelText="Cancel"
              okText="Add"
            >
              <IonSelectOption value="tomato">Tomato</IonSelectOption>
              <IonSelectOption value="egg">Egg</IonSelectOption>
              <IonSelectOption value="butter">Butter</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItemDivider />
          <h3 className="ion-padding">Instructions</h3>
          <IonItem>
            <IonTextarea
              placeholder="Add instructions here..."
              {...register("instructions")}
            ></IonTextarea>
          </IonItem>

          <h3 className="ion-padding">Select Location</h3>
          <MapFC />
        </IonGrid>

        <IonGrid className="ion-padding">
          <IonRow class="ion-justify-content-around">
            <IonButton type="submit">Add Recipe</IonButton>
            <IonButton
              onClick={() => props.setShowRecipeCreateModal(false)}
              fill="outline"
              color="medium"
            >
              Close
            </IonButton>
          </IonRow>
        </IonGrid>
      </form>
      {/* End form */}
    </IonContent>
  );
};

export default ModalCreateRecipe;
