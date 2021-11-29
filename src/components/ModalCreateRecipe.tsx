import React, { useReducer, useRef, useState } from "react";
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
} from "@ionic/react";
import { useForm, Controller } from "react-hook-form";

const ModalCreateRecipe: React.FC = () => {
  const fileInput = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState("");
  const imageSelectedHandler = (event: any) => {
    const imageURL: any = URL.createObjectURL(event.target.files[0]);
    setImage(imageURL);
  };
  const handleRef = () => {
    fileInput.current?.click();
  };
  const [showModal, setShowModal] = useState(false);
  const formReducer = (state: any, event: any) => {
    if (event.reset) {
      return {
        name: "",
        type: "",
      };
    }
    return {
      ...state,
      [event.name]: event.value,
    };
  };
  const [formData, setFormData] = useReducer(formReducer, {});
  const onSubmit = (data: any) => {
    setFormData({ reset: true });
    data.append(image);
    console.log("creating new recipe with data:", data);
    setShowModal(false);
    setImage("");
  };
  const handleChange = (event: any) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
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
      {/* Modal - does not matter where in the code it is*/}
      <IonModal
        isOpen={showModal}
        cssClass="my-custom-class"
        backdropDismiss={false}
      >
        <h3 className="ion-padding">Add Recipe</h3>
        {/* form */}

        <IonItem>
          <IonLabel position="stacked">Name of Dish</IonLabel>
          <IonInput
            value={formData.name || ""}
            name="name"
            onIonChange={handleChange}
          ></IonInput>
        </IonItem>
        <img src={image} />
        <IonButton expand="full" onClick={handleRef}>
          <input
            hidden
            type="file"
            accept="image/*"
            ref={fileInput}
            onChange={imageSelectedHandler}
          />
          Choose Image
        </IonButton>

        <IonItem>
          <IonLabel position="stacked">Type of cuisine</IonLabel>
          <IonSelect
            value={formData.type || ""}
            name="type"
            cancelText="Cancel"
            okText="Add"
            onIonChange={handleChange}
          >
            <IonSelectOption value="Turkish">Turkish</IonSelectOption>
            <IonSelectOption value="Mexican">Mexican</IonSelectOption>
            <IonSelectOption value="Italian">Italian</IonSelectOption>
          </IonSelect>
        </IonItem>

        {/* End form */}
        <IonGrid className="ion-padding">
          <IonRow class="ion-justify-content-around">
            <IonButton onClick={() => onSubmit(formData)}>Add Recipe</IonButton>
            <IonButton
              onClick={() => setShowModal(false)}
              fill="outline"
              color="medium"
            >
              Close
            </IonButton>
          </IonRow>
        </IonGrid>
      </IonModal>
      {/* End modal */}
    </IonContent>
  );
};

export default ModalCreateRecipe;
