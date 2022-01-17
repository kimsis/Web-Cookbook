import {
  IonIcon,
  IonImg,
  IonRow,
  IonCol,
  IonGrid,
  IonText,
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
import AppContext from "../../store/AppContext";
import { useContext, useState } from "react";
import ModalRecipeInfo from "./ModalRecipeInfor";

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
  const [showRecipeInfoModal, setShowRecipeInfoModal] = useState(0);
  const recipeId = props.id; // pass id to info modal
  const starsArray = new Array(5).fill(0);
  const appContext = useContext(AppContext);

  return (
    <IonGrid
      style={{
        justifyContent: "center",
        margin: "20px 0px",
      }}
    >
      <IonModal
        isOpen={showRecipeInfoModal ? true : false}
        onDidDismiss={() => setShowRecipeInfoModal(0)}
      >
        <ModalRecipeInfo
          id={props.id}
          setShowRecipeInfoModal={setShowRecipeInfoModal}
        />
      </IonModal>
      <IonRow>
        <IonText className="ion-align-self-center">
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
              <div className="recipe-info">
                <IonIcon
                  icon={megaphone}
                  slot="start"
                  style={{
                    fontSize: 24,
                    marginRight: "5px",
                    marginBottom: "-5px",
                    color: "#F2AB27",
                  }}
                />
                <b>Shared by</b> {props.sharedBy.name}
              </div>
            </IonRow>
            <IonRow>
              <h6 className="recipe-info">
                <IonIcon
                  icon={time}
                  slot="start"
                  style={{
                    fontSize: 24,
                    marginRight: "5px",
                    marginBottom: "-5px",
                    color: "#F2AB27",
                  }}
                />
                <b>Cook</b> {props.timeToCook} minutes
              </h6>
            </IonRow>
            <IonRow>
              <div className="recipe-info">
                <IonIcon
                  icon={earth}
                  slot="start"
                  style={{
                    fontSize: 24,
                    marginBottom: "-5px",
                    marginRight: "5px",
                    color: "#F2AB27",
                  }}
                />
                <b>{props.type} cuisine </b>
              </div>
            </IonRow>
          </IonCol>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default RecipeListItem;
