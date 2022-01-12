import {
  IonIcon,
  IonCard,
  IonImg,
  IonRow,
  IonCol,
  IonGrid,
  IonText,
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

const RecipeListItem: React.FC<{
  id: number;
  title: string;
  sharedBy: string;
  countryOfOrigin: string;
  type: string;
  rating: number;
  imagePath: string;
  timeToCook: number;
}> = (props) => {
  const starsArray = new Array(5).fill(0);
  // const titleFontSize = "2.7vw";
  // const contentFontSize = "2.5vw";
  // const iconsStyling = { margin: "5px", width: "1.5em", height: "1.5em", fontSize: contentFontSize };
  // const starStyling = { fontSize: titleFontSize, width: "1em",height: "1em",color: "#F2AB27" }

  return (
    <IonGrid style={{ justifyContent: "center", margin: "20px 0px" }}>
      <IonRow>
        <IonCol size="4" style={{ display: "flex" }}>
          <IonRow>
            <IonImg src={props.imagePath} className="dish-image" />
          </IonRow>
        </IonCol>
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
                style={{ fontSize: 24, marginBottom: "-5px", color: "#374957" }}
              />
              Shared by: {props.sharedBy}
            </div>
          </IonRow>
          <IonRow>
            <div className="recipe-info">
              <IonIcon
                icon={time}
                slot="start"
                style={{ fontSize: 24, marginBottom: "-5px", color: "#374957" }}
              />
              Time to cook: {props.timeToCook}
            </div>
          </IonRow>
          <IonRow>
            <div className="recipe-info">
              <IonIcon
                icon={earth}
                slot="start"
                style={{ fontSize: 24, marginBottom: "-5px", color: "#374957" }}
              />
              Cuisine: {props.countryOfOrigin}
            </div>
          </IonRow>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default RecipeListItem;
