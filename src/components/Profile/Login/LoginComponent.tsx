import {
  IonBadge,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import "./LoginComponent.css";
import logo from "./logo.png";
const LoginComponent: React.FC<{}> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log("Login data:", data);
  };
  return (
    <div className="ion-padding">
      <IonImg src={logo} className="center" />
      <h3>Welcome to PartiRecept</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IonItem>
          <IonLabel position="stacked">E-mail address</IonLabel>
          <IonInput {...register("email", { required: true })} />
        </IonItem>
        {errors.email && <IonText color="danger">Invalid email</IonText>}

        <IonItem>
          <IonLabel position="stacked">Your password</IonLabel>
          <IonInput {...register("password")} />
        </IonItem>
        <IonButton expand="block" type="submit">
          Login
        </IonButton>
      </form>
      {/* To do: error handling after submit */}
      <IonText>
        <p>or register</p>
      </IonText>
      <IonButton expand="block" type="submit">
        Register
      </IonButton>
    </div>
  );
};

export default LoginComponent;
