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
import ModalRecipeInfo from "./ModalRecipeInfo";
import { Rating } from "react-simple-star-rating";
import axios from "axios";

const RecipeListItem: React.FC<{
  id: number;
  title: string;
  sharedBy: { id: number; name: string };
  countryOfOrigin: string;
  type: string;
  rating: number;
  imagePath: string;
  timeToCook: number;
  onDismissCallback: () => void;
}> = (props) => {
  const [showRecipeInfoModal, setShowRecipeInfoModal] = useState(0);
  const recipeId = props.id; // pass id to info modal
  const appContext = useContext(AppContext);

  const [rating, setRating] = useState(0);

  function postRating(rate: number) {
    setRating(rate);
    let data: any = {
      rating: rate,
      recipeId: recipeId,
      userId: appContext.user?.id,
    };
    axios
      .post(appContext.http + "Recipe/Rate", data, {
        headers: {
          "x-auth":
            appContext.user?.JWTToken === undefined
              ? ""
              : appContext.user.JWTToken,
        },
      })
      .then((response) => {});
  }

  return (
    <IonGrid
      style={{
        justifyContent: "center",
        margin: "20px 0px",
      }}
    >
      <IonModal
        isOpen={showRecipeInfoModal ? true : false}
        onDidDismiss={() => {
          setShowRecipeInfoModal(0);
          props.onDismissCallback();
        }}
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
          <Rating
            onClick={postRating}
            ratingValue={props.rating}
            allowHalfIcon={true}
            size={25} /* Available Props */
          />
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
