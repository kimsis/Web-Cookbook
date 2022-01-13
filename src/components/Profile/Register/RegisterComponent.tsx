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
import { useContext, useEffect } from "react";
import axios from "axios";
import AppContext from "../../../store/AppContext";

const RegisterComponent: React.FC<{}> = ({}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const appContext = useContext(AppContext);

  const onSubmit = (data: any) => {
    var regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    if (!data.password.match(regex)) {
      setError("password", {
        type: "custom",
        message:
          "Password must be at least 8 symbols, contain 1 special character, an uppercase and a lowercase letter and a number.",
      });
      return;
    }
    if (data.password != data.password_repeat) {
      setError("password_repeat", {
        type: "custom",
        message: "Passwords do not match",
      });
      return;
    }
    submitRegister(data);
  };

  async function submitRegister(data: any) {
    axios
      .post(appContext.http + "authentication/register", data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return (
    <div className="content">
      <IonImg src={logo} className="center" />
      <h3>Welcome to PartiRecept</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IonItem class="input-field">
          <IonLabel position="stacked">Full Name</IonLabel>
          <IonInput {...register("name", { required: true })} />
        </IonItem>
        {errors.name && <IonText color="danger">Please enter a name</IonText>}
        <IonItem class="input-field">
          <IonLabel position="stacked">E-mail address</IonLabel>
          <IonInput type="email" {...register("email", { required: true })} />
        </IonItem>
        {errors.email && (
          <IonText color="danger">Please enter an email</IonText>
        )}
        <IonItem class="input-field">
          <IonLabel position="stacked">Create password</IonLabel>
          <IonInput
            type="password"
            {...register("password", { required: true })}
          />
        </IonItem>
        {errors.password && (
          <IonText color="danger">{errors.password?.message}</IonText>
        )}
        <IonItem class="input-field">
          <IonLabel position="stacked">Repeat password</IonLabel>
          <IonInput
            type="password"
            {...register("password_repeat", { required: true })}
          />
        </IonItem>
        {errors.password_repeat && (
          <IonText color="danger">{errors.password_repeat?.message}</IonText>
        )}

        <div style={{ padding: "0 20px" }}>
          {" "}
          <IonButton type="submit" expand="block">
            Register
          </IonButton>
        </div>
      </form>
      {/* To do: error handling after submit */}
      <IonText>
        <p>or</p>
      </IonText>
    </div>
  );
};

export default RegisterComponent;
