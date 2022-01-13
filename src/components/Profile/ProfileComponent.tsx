import {
  IonButton,
  IonCol,
  IonContent,
  IonIcon,
  IonItem,
  IonModal,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
} from "@ionic/react";
import { person, mail } from "ionicons/icons";
import { useContext, useState } from "react";
import { useHistory } from "react-router";
import AppContext from "../../store/AppContext";
import ModalCreateRecipe from "../Recipes/ModalCreateRecipe";
import RecipeListItem from "../Recipes/RecipeListItem";
import "./ProfileComponent.css";

const ProfileComponent: React.FC<{}> = ({}) => {
  const contentFontSize = "2.5vw";
  // const iconsStyling = {
  // 	margin: '5px',
  // 	width: '1.5em',
  // 	height: '1.5em',
  // 	fontSize: contentFontSize,
  // };

  const [showRecipeCreateModal, setShowRecipeCreateModal] = useState(false);
  const appContext = useContext(AppContext);
  const history = useHistory();
  let RecipeList;
  if (appContext.user?.recipes != null) {
    RecipeList = appContext.user.recipes.map((recipe) => (
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

  let FavouritesList;
  if (appContext.user?.favourites != null) {
    FavouritesList = appContext.user.recipes.map((recipe) => (
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

  function Logout() {
    appContext.user = null;
	localStorage.clear();
    history.replace("/Login");
  }
  return (
    <IonContent fullscreen className="profile-info">
      <IonModal
        isOpen={showRecipeCreateModal}
        onDidDismiss={() => setShowRecipeCreateModal(false)}
      >
        <ModalCreateRecipe
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
            style={{ flexDirection: "column" }}
          >
            <div>
              <IonIcon
                icon={person}
                slot="start"
                style={{
                  fontSize: 100,
                  color: "#374957",
                }}
              />
            </div>
            <div>
              <h4>{appContext.user?.fullName}</h4>
            </div>
            <h4>{appContext.user?.email ? "" : "placeholder@email.com"}</h4>
          </IonRow>
        </IonCol>
      </IonItem>
      <IonItem>
        <IonCol>
          <IonRow className="ion-align-items-center">
            <p>My Recipes</p>
            <IonRow class="ion-justify-content-center">
              <IonButton onClick={() => setShowRecipeCreateModal(true)}>
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
