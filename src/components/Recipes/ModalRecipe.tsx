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
  IonToast,
  IonChip,
  IonFab,
  IonFabButton,
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
import {
  cloudUploadOutline,
  trashBin,
  chevronBackCircleOutline,
} from "ionicons/icons";
import { useForm } from "react-hook-form";
import "./ModalRecipe.css";
import AppContext from "../../store/AppContext";
import { Marker } from "../../pages/map/Map";
import GoogleMapReact from "google-map-react";
import { toast } from "react-toastify";
import Recipe from "../../shared/interfaces/Recipe.interface";

const ModalRecipe: React.FC<{
  showRecipeCreateModal: number;
  setShowRecipeCreateModal: Dispatch<SetStateAction<number>>;
}> = (props) => {
  const markerImagePath =
    "https://icon-library.com/images/dot-icon/dot-icon-17.jpg"; //Image for the marker
  const id = props.showRecipeCreateModal;
  const appContext = useContext(AppContext);
  const fileInput = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRef = () => {
    fileInput.current?.click();
  };
  const [recipe, setRecipe] = useState<Recipe>();
  const [imagePath, setImagePath] = useState("");
  const [deleteButton, setDeleteButton] = useState(<div></div>);
  const [marker, setMarker] = useState({ lat: 0, lng: 0, markerImagePath });

  // If the modal is opened with an id > 0 it's purpose is to edit an existing recipe
  useEffect(() => {
    if (id > 0) {
      getData();
      setDeleteButton(
        <IonButton onClick={() => deleteRecipe()} color="danger">
          <IonIcon slot="start" icon={trashBin} />
          Delete
        </IonButton>
      );
    }
  }, []);

  async function deleteRecipe() {
    axios
      .delete(appContext.http + "Recipe/" + id, {
        headers: {
          "x-auth":
            appContext.user?.JWTToken == undefined
              ? ""
              : appContext.user.JWTToken,
        },
      })
      .then((response) => {
        props.setShowRecipeCreateModal(0);
      })
      .catch((error) => {
        console.log(error + " Error deleting recipe");
      });
  }

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
    setImagePath(recipe.imagePath);
    // Set the Map marker, using the recipe data
    let lat = recipe.latitude;
    let lng = recipe.longitude;
    setMarker({ lat, lng, markerImagePath });
  }

  function setError(error: any) {
    console.log(error);
  }

  const imageSelectedHandler = (file: any) => {
    const imageURL: any = URL.createObjectURL(file);
    setImagePath(imageURL);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fan6fnua");
    axios
      .post("https://api.cloudinary.com/v1_1/dafrxyo42/image/upload", formData)
      .then((data) => {
        setImagePath(data.data.url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Select the image from the file input
  function notify(message: string) {
    toast(message);
  }

  //Submit POST request to API
  const onSubmit = (data: any) => {
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
    if (id === -1 || (id > 0 && !recipe?.approved)) {
      let approve = recipe?.approved === false ? "/" + id : "";
      axios
        .post(appContext.http + "Recipe" + approve, data, {
          headers: {
            "x-auth":
              appContext.user?.JWTToken === undefined
                ? ""
                : appContext.user.JWTToken,
          },
        })
        .then((response) => {
          if (recipe?.approved) {
            notify("Recipe has been added!");
          } else {
            notify("Recipe has been sent for approval!");
          }
          props.setShowRecipeCreateModal(0);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
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
          notify("Recipe has been modified!");
          props.setShowRecipeCreateModal(0);
        })
        .catch((error) => {
          console.log(error);
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
      <IonFab>
        <IonFabButton onClick={() => props.setShowRecipeCreateModal(0)}>
          <IonIcon
            style={{ fontSize: "32px" }}
            icon={chevronBackCircleOutline}
          />
        </IonFabButton>
      </IonFab>

      <h3 style={{ marginLeft: "60px" }}>
        {id === -1 ? "Add new" : recipe?.approved === true ? "Modify" : "Approve"} recipe
      </h3>
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
              {/* Check if an image file is uploaded */}
              {imagePath ? (
                <IonImg src={imagePath}></IonImg>
              ) : (
                <p className="ion-padding">Select picture of the dish</p>
              )}
              {/*  */}
            </IonCol>
            <IonCol size="8">
              <IonItem>
                <IonLabel position="stacked">Dish name</IonLabel>
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
                  <IonInput
                    value={recipe?.timeToCook}
                    {...register("preparationTimeTicks")}
                  />
                </IonItem>
              }
              {/* <IonItem>
                <IonLabel position="stacked">Shared by</IonLabel>
                <IonInput autocomplete="off" {...register("sharedBy")} />
              </IonItem> */}

              <IonItem>
                <IonLabel position="stacked">Cuisine type</IonLabel>
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
          <h3>Aditional Details</h3>
          <IonItem>
            <IonLabel position="stacked">Difficulty</IonLabel>
            <IonSelect
              value={recipe?.difficulty}
              {...register("difficulty")}
              cancelText="Cancel"
              okText="Add"
            >
              <IonSelectOption value={0}>Easy</IonSelectOption>
              <IonSelectOption value={1}>Intermediate</IonSelectOption>
              <IonSelectOption value={2}>Advanced</IonSelectOption>
              <IonSelectOption value={3}>Challenging</IonSelectOption>
              <IonSelectOption value={4}>Expert</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Country of origin</IonLabel>
            <IonInput
              value={recipe?.countryOfOrigin}
              autocomplete="off"
              {...register("countryOfOrigin")}
            />
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
              <IonSelectOption value="tomato">Flour</IonSelectOption>
              <IonSelectOption value="egg">Egg</IonSelectOption>
              <IonSelectOption value="egg">Tomata</IonSelectOption>
              <IonSelectOption value="egg">Rice</IonSelectOption>
              <IonSelectOption value="egg">Chicken</IonSelectOption>
              <IonSelectOption value="egg">Potato</IonSelectOption>
              <IonSelectOption value="butter">Butter</IonSelectOption>
              <IonSelectOption value="butter">Oil</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItemDivider />
          <h3>Instructions</h3>
          <IonItem>
            <IonTextarea
              value={recipe?.instructions}
              rows={6}
              placeholder="Add instructions here..."
              {...register("instructions")}
            ></IonTextarea>
          </IonItem>
          <h5>Click on the map where the dish can be found(Optional)</h5>
          <MapFC />
        </IonGrid>
        <IonGrid className="ion-padding">
          <IonRow class="ion-justify-content-around">
            <IonButton type="submit">{recipe?.approved === true ? "Modify " : id === -1 ? "Add " : "Approve "}recipe</IonButton>
            <IonButton
              onClick={() => props.setShowRecipeCreateModal(0)}
              fill="outline"
              color="medium"
            >
              Close
            </IonButton>
            {deleteButton}
          </IonRow>
        </IonGrid>
      </form>
      {/* End form */}
    </IonContent>
  );
};

export default ModalRecipe;
