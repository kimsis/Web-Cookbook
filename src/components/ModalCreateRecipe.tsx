import {
  IonModal,
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
} from "@ionic/react";
import React, { useRef, useState } from "react";
import axios from "axios";
import { cloudUploadOutline } from "ionicons/icons";
import { useForm } from "react-hook-form";
import "./ModalCreateRecipe.css";

const ModalCreateRecipe: React.FC = () => {
  const [image, setImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const fileInput = useRef<HTMLInputElement>(null);
  const imageSelectedHandler = (event: any) => {
    const imageURL: any = URL.createObjectURL(event.target.files[0]);
    setImage(imageURL);
  };
  const handleRef = () => {
    fileInput.current?.click();
  };

  const onSubmit = (data: any) => {
    console.log("creating new recipe with data:", data);
    axios
      .post("https://i403375core.venus.fhict.nl/Recipe", {
        data,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <IonContent>
      <IonGrid>
        <IonRow className="ion-padding ion-align-items-center ion-justify-content-between">
          <h2 className="ion-float-left">Recipes Overview</h2>

          <IonButton onClick={() => setShowModal(true)}>Add Recipe</IonButton>
        </IonRow>
      </IonGrid>
      <IonModal
        isOpen={showModal}
        cssClass="my-custom-class"
        backdropDismiss={false}
      >
        <IonContent className="ion-padding">
          <h3 className="ion-padding">Add Recipe</h3>
          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <img src={image} /> //Display Selected Image*/}
            <IonGrid>
              <IonRow>
                <IonCol size="4" style={{ margin: "auto" }}>
                  <IonButton onClick={handleRef}>
                    <IonIcon slot="start" icon={cloudUploadOutline} />
                    Choose Image
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      {...register("imagePath")}
                      ref={fileInput}
                    />
                  </IonButton>
                </IonCol>
                <IonCol size="8">
                  <IonItem>
                    <IonLabel position="stacked">Name of Dish</IonLabel>
                    <IonInput
                      autocomplete="off"
                      required={true}
                      {...register("title")}
                    />
                  </IonItem>
                  {/* <IonItem> Missing from API
              <IonLabel position="stacked">Time to cook</IonLabel>
              <IonInput {...register("timeToCook")} />
            </IonItem> */}
                  <IonItem>
                    <IonLabel position="stacked">Shared by</IonLabel>
                    <IonInput autocomplete="off" {...register("sharedBy")} />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">Type of cuisine</IonLabel>
                    <IonSelect
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
              <h3 className="ion-padding">More Details</h3>
              <IonItem>
                <IonLabel position="stacked">Difficulty</IonLabel>
                <IonInput
                  autocomplete="off"
                  type="number"
                  {...register("difficulty")}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Country of origin</IonLabel>
                <IonInput autocomplete="off" {...register("countryOfOrigin")} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Number of servings</IonLabel>
                <IonInput
                  autocomplete="off"
                  {...register("numberOfServings")}
                  type="number"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Preparation Time</IonLabel>
                <IonInput
                  autocomplete="off"
                  {...register("preparationTimeTicks")}
                  type="number"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Type of cuisine</IonLabel>
                <IonSelect
                  multiple={true}
                  {...register("ingredients")}
                  cancelText="Cancel"
                  okText="Add"
                >
                  <IonSelectOption value="tomato">Tomato</IonSelectOption>
                  <IonSelectOption value="egg">Egg</IonSelectOption>
                  <IonSelectOption value="butter">Butter</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItemDivider />
              <h3 className="ion-padding">Instructions</h3>
              <IonItem>
                <IonTextarea
                  placeholder="Add instructions here..."
                  {...register("instructions")}
                ></IonTextarea>
              </IonItem>
            </IonGrid>
            <IonGrid className="ion-padding">
              <IonRow class="ion-justify-content-around">
                <IonButton type="submit">Add Recipe</IonButton>
                <IonButton
                  onClick={() => setShowModal(false)}
                  fill="outline"
                  color="medium"
                >
                  Close
                </IonButton>
              </IonRow>
            </IonGrid>
          </form>
          {/* End form */}
        </IonContent>
      </IonModal>
      {/* End modal */}
    </IonContent>
  );
};

export default ModalCreateRecipe;