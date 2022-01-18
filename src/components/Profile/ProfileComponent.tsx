import {
  IonButton,
  IonCol,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonModal,
  IonRow,
} from "@ionic/react";
import axios, { AxiosResponse } from "axios";
import { person } from "ionicons/icons";
import { Dispatch, useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import Data from "../../shared/interfaces/Data.interface";
import Recipe from "../../shared/interfaces/Recipe.interface";
import Profile from "../../shared/interfaces/Profile.interface";
import AppContext from "../../store/AppContext";
import ModalRecipe from "../Recipes/ModalRecipe";
import RecipeListItem from "../Recipes/RecipeListItem";
import "./ProfileComponent.css";
import { pencil } from "ionicons/icons";
import { toast } from "react-toastify";

const ProfileComponent: React.FC<{}> = () => {
  const [recipes, setRecipe] = useState<Recipe[] | null>(null);
  const [favourites, setFavourites] = useState<Recipe[] | null>(null);
  const [imagePath, setimagePath] = useState("");
  const [userData, setUserData] = useState<Profile | null>();
  const [edit, setEdit] = useState(false);
  
  const [showRecipeCreateModal, setShowRecipeCreateModal] = useState(0);
  const appContext = useContext(AppContext);
  const history = useHistory();
  let RecipeList;
  let FavouritesList;
  appContext.user!.recipes = recipes;
  appContext.user!.favourites = favourites;
  console.log(appContext.user!.recipes);
  console.log(appContext.user!.favourites);
  useEffect(() => {
    axios
      .get(appContext.http + "User/" + appContext.user?.id, {
        headers: {
          "x-auth":
            appContext.user?.JWTToken === undefined
              ? ""
              : appContext.user.JWTToken,
        },
      })
      .then((response) => {
        setUserData(response.data);
      });
    if (appContext.user?.id !== undefined) {
      getData("Recipe/PagedListByUser?UserId=" + appContext.user.id, setRecipe);
      getData("Recipe/Favourite?UserId=" + appContext.user.id, setFavourites);
    }
  }, []);

  async function getData(endpoint: string, setter: Dispatch<any>) {
    await axios
      .get(appContext.http + endpoint, {
        headers: {
          "x-auth":
            appContext.user?.JWTToken == undefined
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

  function setData(
    data: AxiosResponse,
    setter: Dispatch<any>,
  ) {
    let itemsArray: Data = JSON.parse(JSON.stringify(data.data));
    let recipesArray : Recipe[] = itemsArray.items;
    setter(recipesArray);
    return itemsArray.items;
  }

  function setError(error: any) {
    console.log(error);
  }

  if (recipes != null && recipes.length > 0) {
    RecipeList = recipes.map((recipe) => (
      <div key={recipe.id}>
        <RecipeListItem
          id={recipe.id}
          title={recipe.title}
          sharedBy={recipe.sharedBy}
          countryOfOrigin={recipe.countryOfOrigin}
          type={recipe.type}
          rating={recipe.rating}
          imagePath={recipe.imagePath}
          timeToCook={recipe.preparationTimeTicks}
        />
      </div>
    ));
  } else {
    RecipeList = <div> No recipes created! </div>;
  }

  if (favourites != null && favourites.length > 0) {
    FavouritesList = favourites.map((recipe) => (
      <div key={recipe.id}>
        <RecipeListItem
          id={recipe.id}
          title={recipe.title}
          sharedBy={recipe.sharedBy}
          countryOfOrigin={recipe.countryOfOrigin}
          type={recipe.type}
          rating={recipe.rating}
          imagePath={recipe.imagePath}
          timeToCook={recipe.preparationTimeTicks}
        />
      </div>
    ));
  } else {
    FavouritesList = <div> No recipes created! </div>;
  }

  function Logout() {
    appContext.user = null;
    localStorage.clear();
    history.replace("/Login");
  }
  const notify = () => {
    toast("Your profile has been updated");
  };
  const imageSelectedHandler = (file: any) => {
    const imageURL: any = URL.createObjectURL(file);
    setimagePath(imageURL);
    setEdit(true);
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
  const editPicture = () => { };
  const handleRef = () => {
    fileInput.current?.click();
  };
  const fileInput = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    data = {
      ...data,
      profilePicUrl: imagePath,
      name: appContext.user?.fullName,
    };
    axios
      .put(appContext.http + "User/" + appContext.user?.id, data, {
        headers: {
          "x-auth":
            appContext.user?.JWTToken === undefined
              ? ""
              : appContext.user.JWTToken,
        },
      })
      .then((response) => {
        notify();
        setEdit(false);
      })
      .catch((error) => {
        console.log(error + " Reached maximum number of recipes");
      });
  };
  return (
    <IonContent fullscreen className="profile-info">
      <IonModal
        isOpen={showRecipeCreateModal === 0 ? false : true}
        onDidDismiss={() => setShowRecipeCreateModal(0)}
      >
        <ModalRecipe
          showRecipeCreateModal={showRecipeCreateModal}
          setShowRecipeCreateModal={setShowRecipeCreateModal}
        />
      </IonModal>
      <IonItem>
        <IonCol>
          <IonRow class="ion-justify-content-end">
            <IonButton
              onClick={() => {
                Logout();
              }}
            >
              Logout
            </IonButton>
          </IonRow>
          <IonRow
            class="ion-align-items-center"
            style={{ flexDirection: "column", textAlign: "center" }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="profile-image" onClick={handleRef}>
                {userData?.profilePicUrl == ">:)" && !imagePath ? (
                  <IonIcon
                    icon={person}
                    slot="start"
                    style={{
                      fontSize: 100,
                      color: "#374957",
                    }}
                  />
                ) : (
                  <IonImg
                    className="user-image"
                    src={imagePath ? imagePath : userData?.profilePicUrl}
                  ></IonImg>
                )}
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
              </div>
              <h1 className="ion-padding">{appContext.user?.fullName}</h1>
              <h4>{appContext.user?.email ? "" : "placeholder@email.com"}</h4>
              {/* <IonButton>
                <IonIcon slot="start" color="" icon={pencil} />
                Edit
              </IonButton> */}

              {edit && <IonButton type="submit">Update Profile</IonButton>}
            </form>
          </IonRow>
        </IonCol>
      </IonItem>
      <IonItem>
        <IonCol>
          <IonRow className="ion-align-items-center">
            <p>My Recipes</p>
            <IonRow class="ion-justify-content-center">
              <IonButton onClick={() => setShowRecipeCreateModal(-1)}>
                + Add Recipe
              </IonButton>
            </IonRow>
          </IonRow>
          {RecipeList}
        </IonCol>
      </IonItem>
      <IonItem>
        <IonCol>
          <IonRow>
            <p>My Favourites </p>
          </IonRow>
          {FavouritesList}
        </IonCol>
      </IonItem>
    </IonContent>
  );
};

export default ProfileComponent;
