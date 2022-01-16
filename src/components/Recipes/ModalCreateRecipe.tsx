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
import axios, { AxiosResponse } from "axios";
import { cloudUploadOutline } from "ionicons/icons";
import { useForm } from "react-hook-form";
import "./ModalCreateRecipe.css";
import AppContext from "../../store/AppContext";
import { Marker } from "../../pages/map/Map";
import GoogleMapReact from "google-map-react";
import Recipe from "../../shared/interfaces/Recipe.interface";

const ModalCreateRecipe: React.FC<{
  showRecipeCreateModal: number;
  setShowRecipeCreateModal: Dispatch<SetStateAction<number>>;
}> = (props) => {
  const id = props.showRecipeCreateModal;
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
  const [recipe, setRecipe] = useState<Recipe>();

  // If the modal is opened with an id > 0 it's purpose is to edit an existing recipe
  useEffect(() => {
    if(id > 0)
    getData();
  }, [])
  
  async function getData() {
    await axios(appContext.http + "Recipe/" + id)
    .then((response) => {
      setData(response);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      setError(error);
    });
  }
  
  function setData(data: AxiosResponse) {
    let recipe: Recipe = JSON.parse(JSON.stringify(data.data));
    setRecipe(recipe);
    setimagePath(recipe.imagePath);
    // Set the Map marker, using the recipe data
    let lat = recipe.latitude;
    let lng = recipe.longitude;
    setMarker({lat, lng, markerImagePath});
  }
  
  function setError(error:any) {
    console.log(error);
  }

  //Select the image from the file input

  const imageSelectedHandler = (file: any) => {
    const imageURL: any = URL.createObjectURL(file);
    setimagePath(imageURL);
    uploadImage();
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

    if(id === -1) {
    axios
      .post(appContext.http + "Recipe", data, {
        headers: {
          "x-auth":
            appContext.user?.JWTToken === undefined
              ? ""
              : appContext.user.JWTToken,
        },
      })
      .then((response) => {
        console.log(response);
        props.setShowRecipeCreateModal(0);
      })
      .catch((error) => {
        console.log(error + " Reached maximum number of recipes");
      });
    } else if(id > 0) {
      axios
      .put(appContext.http + "Recipe/" + id, data, {
        headers: {
          "x-auth":
            appContext.user?.JWTToken === undefined
              ? ""
              : appContext.user.JWTToken,
        },
      })
      .then((response) => {
        console.log(response);
        props.setShowRecipeCreateModal(0);
      })
      .catch((error) => {
        console.log(error + " Reached maximum number of recipes");
      });
    }
  };

  const MapFC: React.FC<{}> = (props) => {
    // If opening the modal to edit a recipe, set the marker to its known location
    const center = {
      lat: 51.449747,
      lng: 5.473891,
    };
    const zoom = 17;
    const maxZoom = 300;

    function _onClick(obj: any) {
      setMarker({ ...obj, markerImagePath });
      console.log(obj);
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
            markerImagePath={marker.markerImagePath}
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
                  onChange={(event: any) => {
                    imageSelectedHandler(event.target.files[0]);
                  }}
                />
              </IonButton>
              <IonImg src={imagePath}></IonImg>
            </IonCol>
            <IonCol size="8">
              <IonItem>
                <IonLabel position="stacked">Name of Dish</IonLabel>
                <IonInput
                  value={recipe?.title}
                  autocomplete="off"
                  required={true}
                  {...register("title")}
                />
              </IonItem>
              {
                <IonItem>
                  <IonLabel position="stacked">Time to cook</IonLabel>
                  <IonInput value={recipe?.timeToCook} {...register("preparationTimeTicks")} />
                </IonItem>
              }
              {/* <IonItem>
                <IonLabel position="stacked">Shared by</IonLabel>
                <IonInput autocomplete="off" {...register("sharedBy")} />
              </IonItem> */}

              <IonItem>
                <IonLabel position="stacked">Type of cuisine</IonLabel>
                <IonSelect
                value={recipe?.type}
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
            value={recipe?.difficulty}
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
            <IonInput value={recipe?.countryOfOrigin} autocomplete="off" {...register("countryOfOrigin")} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Number of servings</IonLabel>
            <IonInput
            value={recipe?.numberOfServings}
              autocomplete="off"
              type="number"
              {...register("numberOfServings")}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Preparation Time</IonLabel>
            <IonInput
            value={recipe?.preparationTimeTicks}
              autocomplete="off"
              {...register("preparationTimeTicks")}
              type="number"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Ingredients</IonLabel>
            <IonSelect
            value={recipe?.unlistedIngredients}
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
            value={recipe?.instructions}
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
              onClick={() => props.setShowRecipeCreateModal(0)}
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
