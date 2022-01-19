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
import "./Login.css";
import UserHandle from "../../components/Profile/UserHandle/UserHandle";
import AppContext from "../../store/AppContext";
import { useHistory } from "react-router";
import LoginComponent from "../../components/Profile/Login/LoginComponent";

const Login: React.FC<{}> = (props) => {
  const appContext = useContext(AppContext);
  const history = useHistory();

  if (appContext.user != null || localStorage.getItem("user") != null) {
    history.push("/profile");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle> Login </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        fullscreen
        class="ion-padding ion-align-items-end"
        style={{ alignSelf: "center" }}
      >
        <LoginComponent />
        <IonRow class="ion-justify-content-center">
          <IonButton
            className="button"
            fill="outline"
            onClick={() => history.push("/register")}
          >
            Not registered yet?
          </IonButton>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Login;
