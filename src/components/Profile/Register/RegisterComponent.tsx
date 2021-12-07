import "./RegisterComponent";
import {
  IonButton,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import logo from "../../../assets/logo.png";
import { useForm } from "react-hook-form";
import "./RegisterComponent.css";

const RegisterComponent: React.FC<{}> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Register data:", data);
  };
  return (
    <div className="content">
      <IonImg src={logo} className="center" />
      <h3>Welcome to PartiRecept</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IonItem>
          <IonLabel position="stacked">Full Name</IonLabel>
          <IonInput {...register("name", { required: true })} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">E-mail address</IonLabel>
          <IonInput {...register("email", { required: true })} />
        </IonItem>
        {errors.email && <IonText color="danger">Invalid email</IonText>}

        <IonItem>
          <IonLabel position="stacked">Create password</IonLabel>
          <IonInput {...register("password")} />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Repeat password</IonLabel>
          <IonInput {...register("password_repeat")} />
          {/* To do: match passwords */}
        </IonItem>
        <IonButton type="submit" expand="block">
          Register
        </IonButton>
      </form>
      {/* To do: error handling after submit */}
      <IonText>
        <p>or</p>
      </IonText>
    </div>
  );
};

export default RegisterComponent;
