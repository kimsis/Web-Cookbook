import {
  IonIcon,
  IonCard,
  IonImg,
  IonRow,
  IonCol,
  IonGrid,
  IonText,
  IonButton,
  IonModal,
} from "@ionic/react";
import {
  star,
  starHalf,
  starOutline,
  time,
  megaphone,
  earth,
} from "ionicons/icons";
import "./RecipeListItem.css";
import { trashBin } from "ionicons/icons";
import axios from "axios";
import AppContext from "../../store/AppContext";
import { useContext, useState } from "react";
import RecipeInfoModal from "./RecipeInfoModal";

const RecipeListItem: React.FC<{
  id: number;
  title: string;
  sharedBy: { id: number; name: string };
  countryOfOrigin: string;
  type: string;
  rating: number;
  imagePath: string;
  timeToCook: number;
}> = (props) => {
  const [none, setNone] = useState(false);
  const [showRecipeInfoModal, setShowRecipeInfoModal] = useState(0);
  const recipeId = props.id; // pass id to info modal
  const starsArray = new Array(5).fill(0);
  const appContext = useContext(AppContext);

  const deleteRecipe = () => {
    axios
      .delete(appContext.http + "Recipe/" + props.id, {
        headers: {
          "x-auth":
            appContext.user?.JWTToken == undefined
              ? ""
              : appContext.user.JWTToken,
        },
      })
      .then((response) => {
        console.log(response);
        setNone(true);
      })
      .catch((error) => {
        console.log(error + " Error deleting recipe");
      });
  };
  return (
    <IonGrid
      style={{
        justifyContent: "center",
        margin: "20px 0px",
        display: none ? "none" : "",
      }}
    >
      <IonModal
        isOpen={showRecipeInfoModal ? true : false}
        onDidDismiss={() => setShowRecipeInfoModal(0)}
      >
        <RecipeInfoModal
          id={props.id}
          setShowRecipeInfoModal={setShowRecipeInfoModal}
        />
      </IonModal>
      <IonRow>
        <IonCol size="4" style={{ display: "flex" }}>
          <IonRow>
            <IonImg
              onClick={() => setShowRecipeInfoModal(recipeId)}
              src={props.imagePath}
              className="dish-image"
            />
          </IonRow>
        </IonCol>
        <IonCol>
          <IonCol>
            <IonRow>
              <IonText>
                <h2>{props.title}</h2>
              </IonText>
              <IonCol className="ion-align-self-center ion-text-right">
                {starsArray.map((x, i) => {
                  if (i + 1 <= props.rating) {
                    return (
                      <IonIcon
                        icon={star}
                        style={{ fontSize: 22, color: "#F2AB27" }}
                      ></IonIcon>
                    );
                  } else if (i + 1 > props.rating && i < props.rating) {
                    return (
                      <IonIcon
                        icon={starHalf}
                        style={{ fontSize: 22, color: "#F2AB27" }}
                      ></IonIcon>
                    );
                  }
                  return (
                    <IonIcon
                      icon={starOutline}
                      style={{ fontSize: 24, color: "#F2AB27" }}
                    ></IonIcon>
                  );
                })}
              </IonCol>
            </IonRow>
            <IonRow>
              <div className="recipe-info">
                <IonIcon
                  icon={megaphone}
                  slot="start"
                  style={{
                    fontSize: 24,
                    marginBottom: "-5px",
                    color: "#374957",
                  }}
                />
                Shared by: {props.sharedBy.name}
              </div>
            </IonRow>
            <IonRow>
              <div className="recipe-info">
                <IonIcon
                  icon={time}
                  slot="start"
                  style={{
                    fontSize: 24,
                    marginBottom: "-5px",
                    color: "#374957",
                  }}
                />
                Time to cook: {props.timeToCook}
              </div>
            </IonRow>
            <IonRow>
              <div className="recipe-info">
                <IonIcon
                  icon={earth}
                  slot="start"
                  style={{
                    fontSize: 24,
                    marginBottom: "-5px",
                    color: "#374957",
                  }}
                />
                Cuisine: {props.countryOfOrigin}
              </div>
            </IonRow>
          </IonCol>
          <IonCol>
            <IonRow className="ion-justify-content-end ion-self-align-end">
              <IonButton onClick={() => deleteRecipe()} color="danger">
                <IonIcon slot="start" icon={trashBin} />
                Delete
              </IonButton>
              <IonButton
                onClick={() => setShowRecipeInfoModal(recipeId)}
                color="primary"
              >
                View more
              </IonButton>
            </IonRow>
          </IonCol>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default RecipeListItem;
