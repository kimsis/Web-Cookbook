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
import AppContext from "../../store/AppContext";
import { useHistory } from "react-router";
import User from "../../shared/interfaces/User.interface";

const Profile: React.FC<{}> = (props) => {
  const appContext = useContext(AppContext);
  const history = useHistory();
  
  // let userString = localStorage.getItem("user");
  // if(userString != null) {
  //   let user:User = JSON.parse(userString);
  //   if(user.expiry < new Date().getTime()){
  //     appContext.user = null;
  //     localStorage.clear();
  //   } else {
  //     appContext.user = user;
  //   }
  // }
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
