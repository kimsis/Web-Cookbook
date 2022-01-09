import {
  IonButtons,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useContext, useState } from "react";
import RegisterComponent from "../../components/Profile/Register/RegisterComponent";
import LoginComponent from "../../components/Profile/Login/LoginComponent";
import ProfileComponent from "../../components/Profile/ProfileComponent";
import UserContext from "../../store/UserContext";
import "./Profile.css";
import UserHandle from "../../components/Profile/UserHandle/UserHandle";

const Profile: React.FC<{}> = (props) => {
  const userContext = useContext(UserContext);

  const [component, setComponent] = useState("Login");

  let profileContent;
  let contentName = "";

  if (userContext.user != null && component == "Profile") {
    contentName = "Profile Overview";
    profileContent = <ProfileComponent />;
  } else {
    contentName = "Login";
    profileContent = <UserHandle />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{contentName}</IonTitle>
        </IonToolbar>
      </IonHeader>
      {profileContent}
    </IonPage>
  );
};

export default Profile;
