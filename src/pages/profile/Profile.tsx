import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useContext } from "react";
import ProfileComponent from "../../components/Profile/ProfileComponent";
import "./Profile.css";
import AppContext from "../../store/AppContext";
import { useHistory } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png";

const Profile: React.FC<{}> = (props) => {
  const appContext = useContext(AppContext);
  const history = useHistory();

  console.log(appContext.user?.expiry);
  console.log(new Date().getTime());
  console.log(appContext.user);
  console.log(localStorage.getItem("user"));

  if (appContext.user == null) {
    history.replace("/login");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton>
              <img src={logo}></img>
            </IonMenuButton>
          </IonButtons>
          {appContext.user ? (
            <IonTitle> Profile </IonTitle>
          ) : (
            <IonTitle> Log in </IonTitle>
          )}
        </IonToolbar>
      </IonHeader>
      <ToastContainer />
      <ProfileComponent />
    </IonPage>
  );
};

export default Profile;
