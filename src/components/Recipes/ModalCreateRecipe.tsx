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
  IonImg,
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
import { Console } from "console";

const ModalCreateRecipe: React.FC<{
  showRecipeCreateModal: boolean;
  setShowRecipeCreateModal: Dispatch<SetStateAction<boolean>>;
}> = (props) => {
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePath, setimagePath] = useState("");
  const markerImagePath =
    "https://icon-library.com/images/dot-icon/dot-icon-17.jpg"; //Image for the marker
  const [marker, setMarker] = useState({ lat: 0, lng: 0, markerImagePath });
  const appContext = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const fileInput = useRef<HTMLInputElement>(null);

  //Select the image from the file input

  const imageSelectedHandler = (file: any) => {
    const imageURL: any = URL.createObjectURL(file);
    setImage(file);
    setImageUrl(imageURL);
    console.log(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fan6fnua");
    axios
      .post("https://api.cloudinary.com/v1_1/dafrxyo42/image/upload", formData)
      .then((data) => {
        setimagePath(data.data.url);
      })
      .catch((error) => {
        console.log(error);
      });
    setImage("");
  };
  //Upload selected image
  const uploadImage = () => {};
  const handleRef = () => {
    fileInput.current?.click();
  };

  //Submit POST request to API

  const onSubmit = (data: any) => {
    console.log(appContext.user);
    console.log(imagePath);
    data = {
      ...data,
      difficulty: parseInt(data.difficulty),
      numberOfServings: parseInt(data.numberOfServings),
      preparationTimeTicks: parseInt(data.preparationTimeTicks),
      sharedBy: appContext.user?.id,
      ingredients: [],
      imagePath: imagePath,
      latitude: marker.lat,
      longitude: marker.lng,
    };

    axios
      .post(appContext.http + "Recipe", data, {
        headers: {
          "x-auth":
            appContext.user?.JWTToken == undefined
              ? ""
              : appContext.user.JWTToken,
        },
      })
      .then((response) => {
        console.log(response);
        props.setShowRecipeCreateModal(false);
      })
      .catch((error) => {
        console.log(error + " Reached maximum number of recipes");
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
      setMarker({ ...obj, markerImagePath });
    }
    return (
      <IonContent style={{ height: "40vh" }}>
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
            markerImagePath={marker.markerImagePath}
          />
        </GoogleMapReact>
      </IonContent>
    );
  };

  return (
    <IonContent className="ion-padding-top ion-padding-bottom ion-padding-horizontal">
      <h3>Add new recipe</h3>
      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <img src={image} /> //Display Selected Image*/}
        <IonGrid>
          <IonRow>
            <IonCol size="4" style={{ margin: "auto" }}>
              <IonButton onClick={handleRef} style={{ width: "100%" }}>
                <IonIcon slot="start" icon={cloudUploadOutline} />
                Picture
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  {...register("imagePath")}
                  ref={fileInput}
                  onChange={(event: any) => {
                    imageSelectedHandler(event.target.files[0]);
                  }}
                />
              </IonButton>
              <IonImg src={imageUrl}></IonImg>
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
              {/* <IonItem>
                <IonLabel position="stacked">Shared by</IonLabel>
                <IonInput autocomplete="off" {...register("sharedBy")} />
              </IonItem> */}

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
          <h3>More Details</h3>
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
              rows={6}
              placeholder="Add instructions here..."
              {...register("instructions")}
            ></IonTextarea>
          </IonItem>
          <h3>Select Location</h3>
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
