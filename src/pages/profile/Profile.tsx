import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useContext, useState } from "react";
import ProfileComponent from "../../components/Profile/ProfileComponent";
import "./Profile.css";
import UserHandle from "../../components/Profile/UserHandle/UserHandle";
import AppContext from "../../store/AppContext";
import { useHistory } from "react-router";

const Profile: React.FC<{}> = (props) => {
  const appContext = useContext(AppContext);
  const history = useHistory();

  let profileContent;

  if (appContext.user == null) {
    history.replace("/Login");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle> Profile </IonTitle>
        </IonToolbar>
      </IonHeader>
      <ProfileComponent />
    </IonPage>
  );
};

export default Profile;
