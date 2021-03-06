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

  if (appContext.user == null) {
    history.push("/login");
    return <div></div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonTitle> Profile </IonTitle>
        </IonToolbar>
      </IonHeader>
      <ToastContainer />
      <ProfileComponent />
    </IonPage>
  );
};

export default Profile;
