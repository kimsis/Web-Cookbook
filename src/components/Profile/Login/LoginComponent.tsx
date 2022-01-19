import {
  IonButton,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import "./LoginComponent.css";
import logo from "../../../assets/logo.png";
import axios from "axios";
import { useContext } from "react";
import AppContext from "../../../store/AppContext";
import { useHistory } from "react-router";

const LoginComponent: React.FC<{}> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const appContext = useContext(AppContext);
  const history = useHistory();
  const onSubmit = (data: any) => {
    submitLogin(data);
  };

  async function submitLogin(data: any) {
    await axios
      .post(appContext.http + "authentication/login", data)
      .then(function (response) {
        if (response.status === 200) {
          appContext.user = {
            JWTToken: response.data.jwtToken,
            email: data.email,
            id: response.data.id,
            fullName: response.data.name,
            isAdmin: response.data.isAdmin,
            recipes: [],
            favourites: [],
            // Getting the time of Login and adding an expiry of 24h, the duration of the token
            expiry: (new Date().getTime() + 86400000),
            imagePath: "",
          };
          
          localStorage.setItem("user", JSON.stringify(appContext.user));
          history.push("/profile");
        }
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
          <IonLabel position="stacked">E-mail address</IonLabel>
          <IonInput {...register("email", { required: true })} />
        </IonItem>
        {errors.email && <IonText color="danger">Invalid email</IonText>}

        <IonItem class="input-field">
          <IonLabel position="stacked">Your password</IonLabel>
          <IonInput type="password" {...register("password", { required: true })} />
        </IonItem>
        {errors.password && <IonText color="danger">Invalid Password</IonText>}

        <div style={{ padding: "0 20px" }}>
          <IonButton expand="block" type="submit">
            Not registered yet?
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

export default LoginComponent;
