import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useContext } from "react";
import "./Register.css";
import AppContext from "../../store/AppContext";
import { useHistory } from "react-router";
import RegisterComponent from "../../components/Profile/Register/RegisterComponent";

const Register: React.FC<{}> = (props) => {
  const appContext = useContext(AppContext);
  const history = useHistory();

  if (appContext.user != null || localStorage.getItem("user") != null) {
    history.push("/profile");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle> Register </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        fullscreen
        class="ion-padding ion-align-items-end"
        style={{ alignSelf: "center" }}
      >
        <RegisterComponent />
        <IonRow class="ion-justify-content-center">
          <IonButton
            className="button"
            fill="outline"
            onClick={() => history.push("/login")}
          >
            Login
          </IonButton>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Register;
