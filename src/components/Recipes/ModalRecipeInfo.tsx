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
  IonModal,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import { Redirect, useHistory, useLocation, useParams } from "react-router";
import "./ModalRecipeInfo.css";
import {
  time,
  megaphone,
  cellular,
  fastFood,
  earth,
  egg,
  timer,
  qrCode,
  chevronBackCircleOutline,
  heart,
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
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
} from "react-share";
import QRModal from "./QRModal";
import { Oval } from "react-loader-spinner";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import SimpleMap from "../../pages/map/Map";

const ModalRecipeInfo: React.FC<{
  id: number;
  setShowRecipeInfoModal: Dispatch<SetStateAction<number>>;
}> = (props) => {
  useEffect(() => {
    getData();
  }, []);

  const [recipe, setRecipe] = useState<Recipe>();
  const [isLoading, setIsLoading] = useState(true);
  const appContext = useContext(AppContext);
  const [favourite, setFavourite] = useState<Boolean>(false);
  const [rating, setRating] = useState(0);
  const history = useHistory();

  async function getData() {
    await axios
      .get(appContext.http + "Recipe/" + props.id)
      .then((response) => {
        setData(response);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
    if (
      appContext.user?.favourites !== null &&
      appContext.user?.favourites.find((r) => r.id === props.id) != null
    ) {
      setFavourite(true);
    } else {
      setFavourite(false);
    }
  }

  function notify(message: string) {
    toast(message);
  }

  function postRating(rate: number) {
    setRating(rate);
    let data: any = {
      rating: rate,
      recipeId: recipe?.id,
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

  function toggleFavourite(fav: boolean) {
    setFavourite(fav);
    if (fav) {
      axios
        .post(appContext.http + "Recipe/Favourite/" + props.id, null, {
          headers: {
            "x-auth":
              appContext.user?.JWTToken === undefined
                ? ""
                : appContext.user.JWTToken,
          },
        })
        .then((response) => {
          notify("Recipe has been favoured");
        });
    } else {
      axios
        .delete(appContext.http + "Recipe/Favourite?id=" + props.id, {
          headers: {
            "x-auth":
              appContext.user?.JWTToken === undefined
                ? ""
                : appContext.user.JWTToken,
          },
        })
        .then((response) => {
          notify("Recipe has been unfavoured");
        });
    }
  }

  function setData(data: AxiosResponse) {
    let recipeTest: Recipe = JSON.parse(JSON.stringify(data.data));
    setRecipe(recipeTest);
  }

  // Set the difficulty from number to string

  const difficulty = (diff: any) => {
    switch (diff) {
      case 0:
        return "Easy";
      case 1:
        return "Intermeddiate";
      case 2:
        return "Advanced";
      case 3:
        return "Challenging";
      case 4:
        return "Expert";
      default:
    }
  };

  // QR Code Modal
  const [showQRModal, setShowshowQRModal] = useState(0);

  function setError(error: any) {
    console.log(error);
  }

  const { name } = useParams<{ name: string }>();
  const iconsStyling = { margin: "0px", marginRight: "8px" };
  return isLoading ? (
    <div style={{ margin: "auto" }}>
      <Oval color="#F2AB27" />
    </div>
  ) : (
    <IonContent>
      <IonModal
        isOpen={showQRModal ? true : false}
        onDidDismiss={() => setShowshowQRModal(0)}
      >
        <QRModal id={props.id} setShowQRModal={setShowshowQRModal} />
      </IonModal>
      <IonGrid className="ion-padding-top ion-padding-bottom ion-padding-horizontal">
        <IonFab>
          <IonFabButton
            size="small"
            onClick={() => props.setShowRecipeInfoModal(0)}
          >
            <IonIcon
              style={{ fontSize: "32px" }}
              icon={chevronBackCircleOutline}
            />
          </IonFabButton>
        </IonFab>
        <h1 style={{ marginLeft: "60px" }}>{recipe?.title}</h1>
        <IonRow>
          <IonCol>
            <IonImg src={recipe?.imagePath}></IonImg>
          </IonCol>
          <IonCol>
            <IonRow>
              <IonCol
                sizeMd="10"
                className="ion-align-self-center ion-float-right ion-justify-content-center"
              >
                <Rating
                  onClick={postRating}
                  ratingValue={rating}
                  allowHalfIcon={true}
                  size={30} /* Available Props */
                />
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
        <IonItem>
          <IonIcon
            icon={heart}
            style={{ fontSize: 30 }}
            class={favourite ? "fav hydrated" : "hydrated"}
            onClick={() => toggleFavourite(!favourite)}
          ></IonIcon>
          <IonLabel>Share the meal!</IonLabel>
          <FacebookShareButton
            url={"http://www.partirecept.com"}
            quote={"PartiRecept - Explore the kitchen of Oud-Woensel"}
            hashtag="#partirecept"
          >
            <FacebookIcon size={36} borderRadius={50} />
          </FacebookShareButton>
          <PinterestShareButton
            url={"http://www.partirecept.com"}
            title={"PartiRecept - Explore the kitchen of Oud-Woensel"}
            media={recipe!.imagePath}
          >
            <PinterestIcon
              style={{ margin: "5px" }}
              size={36}
              borderRadius={50}
            ></PinterestIcon>
          </PinterestShareButton>
          <IonIcon
            onClick={() => setShowshowQRModal(props.id)}
            icon={qrCode}
            size="large"
            style={{ padding: "5px", color: "#F2AB27" }}
          ></IonIcon>
        </IonItem>
        <IonRow>
          <IonCol>
            {/* <h4>Details</h4> */}
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
            {recipe?.ingredients.map((ingredient) => (
              <IonChip
                onClick={() => {
                  history.push("/map&id=" + ingredient.id);
                }}
                color="primary"
                key={ingredient.id}
              >
                <IonLabel>{ingredient.name}</IonLabel>
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

export default ModalRecipeInfo;
