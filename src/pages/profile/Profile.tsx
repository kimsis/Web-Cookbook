import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import React, { useContext } from "react";
import RegisterComponent from '../../components/LoginComponent';
import LoginComponent from '../../components/LoginComponent';
import ProfileComponent from '../../components/ProfileComponent';
import UserContext from '../../store/UserContext';
import './Profile.css';

const ProfileContent: React.FC<{
}> = (props) => {
    const userContext = useContext(UserContext);
    const user = userContext.user;

    if(user != null) {
        return (
            <IonContent>
                <ProfileComponent />
            </IonContent>
        );
    } else {
        return (
            <IonContent>
                <LoginComponent />
            </IonContent>
        )
    }
};

const Profile: React.FC<{
}> = (props) => {

    const userContext = useContext(UserContext);
    const user = userContext.user;

	return (
	<IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Profile Overview</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
          < ProfileContent />
      </IonContent>
    </IonPage>
	);
};

export default Profile;
