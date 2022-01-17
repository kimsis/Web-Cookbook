import {
  IonButton,
  IonContent,
  IonGrid,
  IonRow,
  IonItem,
  IonInput,
  IonCol,
  IonIcon,
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
import { cloudUploadOutline, trashBin } from "ionicons/icons";
import { useForm } from "react-hook-form";
import AppContext from "../../store/AppContext";
import "./ModalIngredient.css";
import Ingredient from "../../shared/interfaces/Ingredient.interfdace";

const ModalIngredient: React.FC<{
  showIngredientModal: number;
  setShowIngredientModal: Dispatch<SetStateAction<number>>;
}> = (props) => {
  const id = props.showIngredientModal;
  const [ingredient, setIngredient] = useState<Ingredient>();
  const [imagePath, setImagePath] = useState("");
  const [deleteButton, setDeleteButton] = useState(<div></div>);
  const appContext = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const fileInput = useRef<HTMLInputElement>(null);

  const handleRef = () => {
    fileInput.current?.click();
  };

  useEffect(() => {
    if (id > 0) {
      getData();
      setDeleteButton(
        <IonButton onClick={() => deleteIngredient()} color="danger">
          <IonIcon slot="start" icon={trashBin} />
          Delete
        </IonButton>
      )
    }
  }, [])

  //Select the image from the file input

  const imageSelectedHandler = (file: any) => {
    const imagePath: any = URL.createObjectURL(file);
    setImagePath(imagePath);

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
  }

  async function deleteIngredient() {
    axios
      .delete(appContext.http + "Ingredient/" + id, {
        headers: {
          "x-auth":
            appContext.user?.JWTToken == undefined
              ? ""
              : appContext.user.JWTToken,
        },
      })
      .then((response) => {
        props.setShowIngredientModal(0);
      })
      .catch((error) => {
        console.log(error + " Error deleting recipe");
      });
  };

  async function getData() {
    await axios(appContext.http + "Ingredient/" + id)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  function setData(data: AxiosResponse) {
    let ingredient: Ingredient = JSON.parse(JSON.stringify(data.data));
    setIngredient(ingredient);
    setImagePath(ingredient.imagePath);
  }

  function setError(error: any) {
    console.log(error);
  }

  //Submit POST request to API

  const onSubmit = (data: any) => {
    data = {
      ...data,
      name: ingredient?.name,
      imagePath: imagePath,
    };

    if (id === -1) {
      axios
        .post(appContext.http + "Ingredient", data, {
          headers: {
            "x-auth":
              appContext.user?.JWTToken == undefined
                ? ""
                : appContext.user.JWTToken,
          },
        })
        .then((response) => {
          props.setShowIngredientModal(0);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .put(appContext.http + "Ingredient/" + id, data, {
          headers: {
            "x-auth":
              appContext.user?.JWTToken == undefined
                ? ""
                : appContext.user.JWTToken,
          },
        })
        .then((response) => {
          props.setShowIngredientModal(0);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <IonContent className="ion-padding-top ion-padding-bottom ion-padding-horizontal">
      <h3>{id === -1 ? "Add new" : "Modify"} ingredient</h3>
      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)}>
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
                <p className="ion-padding">Select picture of the ingredient</p>
              )}
              {/*  */}
            </IonCol>
            <IonCol size="8">
              <IonItem>
                <IonInput
                  value={ingredient?.name}
                  placeholder="Ingredient name"
                  autocomplete="off"
                  required={true}
                  {...register("name")}
                />
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid className="ion-padding">
          <IonRow class="ion-justify-content-around">
            <IonButton type="submit"> {id === -1 ? "Add " : "Modify "}ingredient</IonButton>
            <IonButton
              onClick={() => props.setShowIngredientModal(0)}
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

export default ModalIngredient;
