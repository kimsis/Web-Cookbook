import {
  IonContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonButton,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
} from "@ionic/react";
import { useParams } from "react-router";
import "./RecipeInfoModal.css";
import {
  star,
  starHalf,
  starOutline,
  time,
  megaphone,
  cellular,
  fastFood,
  earth,
  egg,
  timer,
} from "ionicons/icons";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Recipe from "../../shared/interfaces/Recipe.interface";
import axios, { AxiosResponse } from "axios";
import AppContext from "../../store/AppContext";

const RecipeInfoModal: React.FC<{
  id: number;
  setShowRecipeInfoModal: Dispatch<SetStateAction<number>>;
}> = (props) => {
  useEffect(() => {
    getData();
  }, []);

  const [recipe, setRecipe] = useState<Recipe>();
  const appContext = useContext(AppContext);

  async function getData() {
    await axios(appContext.http + "Recipe/" + props.id)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  function setData(data: AxiosResponse) {
    let recipeTest: Recipe = JSON.parse(JSON.stringify(data.data));
    setRecipe(recipeTest);
  }

  // Set the difficulty from number to string

  const difficulty = (diff: any) => {
    switch (diff) {
      case 0:
        return "Begginer";
      case 1:
        return "Intermeddiate";
      case 2:
        return "Advanced";
      default:
    }
  };

  function setError(error: any) {
    console.log(error);
  }

  const { name } = useParams<{ name: string }>();
  const starsArray = new Array(5).fill(0);
  const iconsStyling = { margin: "0px", marginRight: "8px" };
  return (
    <IonContent>
      <IonGrid className="ion-padding-top ion-padding-bottom ion-padding-horizontal">
        <h1>{recipe?.title}</h1>
        <IonRow>
          <IonCol size="5">
            <IonImg src={recipe?.imagePath}></IonImg>
          </IonCol>
          <IonCol>
            <IonRow>
              <IonCol className="ion-align-self-center ion-float-right ion-justify-content-center">
                {starsArray.map((x, i) => {
                  if (i + 1 <= (recipe?.rating ? recipe.rating : 0)) {
                    return (
                      <IonIcon
                        icon={star}
                        style={{ fontSize: 22, color: "#F2AB27" }}
                      ></IonIcon>
                    );
                  } else if (
                    i + 1 > (recipe?.rating ? recipe.rating : 0) &&
                    i < (recipe?.rating ? recipe.rating : 0)
                  ) {
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
                      style={{ fontSize: 22, color: "#F2AB27" }}
                    ></IonIcon>
                  );
                })}
              </IonCol>
            </IonRow>
            <IonItem color="none" lines="none">
              <IonIcon
                icon={time}
                slot="start"
                style={{
                  fontSize: 24,
                  marginRight: "5px",
                  color: "#F2AB27",
                }}
              />
              <div>
                <b>Cook</b> {recipe?.preparationTimeTicks} minutes
              </div>
            </IonItem>
            <IonItem color="none" lines="none">
              <IonIcon
                icon={megaphone}
                slot="start"
                style={{
                  fontSize: 24,
                  marginRight: "5px",
                  color: "#F2AB27",
                }}
              />
              <p>
                <b>Shared by </b> {recipe?.sharedBy.name}
              </p>
            </IonItem>
            <IonItem color="none" lines="none">
              <IonIcon
                icon={cellular}
                color="warning"
                slot="start"
                style={{
                  fontSize: 24,
                  marginRight: "5px",
                  color: "#F2AB27",
                }}
              />
              <p>
                <b>Difficulty</b> {difficulty(recipe?.difficulty)}
              </p>
            </IonItem>
            <IonItem color="none" lines="none">
              <IonIcon
                icon={fastFood}
                slot="start"
                style={{
                  fontSize: 24,
                  marginRight: "5px",
                  color: "#F2AB27",
                }}
              />
              <p>
                <b>Dish type</b> {recipe?.type}
              </p>
            </IonItem>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <h4>Details</h4>
            <IonItem color="none" lines="none">
              <IonIcon
                icon={earth}
                slot="start"
                style={{
                  fontSize: 24,
                  marginRight: "5px",
                  color: "#F2AB27",
                }}
              />
              <p>
                <b>Country of origin</b> {recipe?.countryOfOrigin}
              </p>
            </IonItem>
            <IonItem color="none" lines="none">
              <IonIcon
                icon={egg}
                slot="start"
                style={{
                  fontSize: 24,
                  marginRight: "5px",
                  color: "#F2AB27",
                }}
              />
              <p>
                <b>Serving size</b> {recipe?.numberOfServings} meals
              </p>
            </IonItem>
            <IonItem color="none" lines="none">
              <IonIcon
                icon={timer}
                slot="start"
                style={{
                  fontSize: 24,
                  marginRight: "5px",
                  color: "#F2AB27",
                }}
              />
              <p>
                <b>Preparation time</b> {recipe?.preparationTimeTicks} minutes
              </p>
            </IonItem>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <h1>Ingredients</h1>
            {recipe?.unlistedIngredients.map((x) => (
              <IonChip color="primary">
                <IonLabel>{x}</IonLabel>
              </IonChip>
            ))}
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <h1>Instructions</h1>
            <p>{recipe?.instructions}</p>{" "}
          </IonCol>
        </IonRow>
        <IonRow>
          {/*
              Unnecessary
            <IonCol size="1">
              <IonButton color="warning" fill="outline">Delete</IonButton>
            </IonCol>
            <IonCol size="1" offset="8">
              <IonButton color="warning" fill="solid">Edit</IonButton>
            </IonCol>
              */}
          <IonCol>
            <IonButton
              color="warning"
              fill="outline"
              onClick={() => props.setShowRecipeInfoModal(0)}
            >
              Close
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default RecipeInfoModal;
