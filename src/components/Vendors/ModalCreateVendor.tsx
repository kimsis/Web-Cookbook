import {
  IonButton,
  IonContent,
  IonGrid,
  IonRow,
  IonItem,
  IonLabel,
  IonInput,
  IonCol,
  IonIcon,
  IonTextarea,
  IonImg,
} from "@ionic/react";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import axios from "axios";
import { cloudUploadOutline } from "ionicons/icons";
import { useForm } from "react-hook-form";
import AppContext from "../../store/AppContext";
import SimpleMap, { Marker } from "../../pages/map/Map";
import GoogleMapReact, { Props } from "google-map-react";
import "./ModalCreateVendor.css";

const ModalCreateVendor: React.FC<{
  showVendorCreateModal: boolean;
  setShowVendorCreateModal: Dispatch<SetStateAction<boolean>>;
}> = (props) => {
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePath, setimagePath] = useState("");
  const markerImagePath =
    "https://icon-library.com/images/dot-icon/dot-icon-17.jpg"; //Image for the marker
  const [marker, setMarker] = useState({ lat: 0, lng: 0, markerImagePath });
  const appContext = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const fileInput = useRef<HTMLInputElement>(null);

  //Select the image from the file input

  const imageSelectedHandler = (file: any) => {
    const imageURL: any = URL.createObjectURL(file);
    setImage(file);
    setImageUrl(imageURL);
    console.log(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fan6fnua");
    axios
      .post("https://api.cloudinary.com/v1_1/dafrxyo42/image/upload", formData)
      .then((data) => {
        console.log(data);
        setimagePath(data.data.url);
        console.log(imagePath);
      })
      .catch((error) => {
        console.log(error);
      });
    setImage("");
  };
  const handleRef = () => {
    fileInput.current?.click();
  };

  //Submit POST request to API

  const onSubmit = (data: any) => {
    data = {
      ...data,
      imagePath: imagePath,
      latitude: marker.lat,
      longitude: marker.lng,
      ingredients: [],
    };

    axios
      .post(appContext.http + "Vendor", data, {
        headers: {
          "x-auth":
            appContext.user?.JWTToken == undefined
              ? ""
              : appContext.user.JWTToken,
        },
      })
      .then((response) => {
        console.log(response);
        props.setShowVendorCreateModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const MapFC: React.FC<{}> = (props) => {
    const center = {
      lat: 51.449747,
      lng: 5.473891,
    };
    const zoom = 17;
    const maxZoom = 300;

    function _onClick(obj: any) {
      setMarker({ ...obj, markerImagePath });
    }
    return (
      <IonContent style={{ height: "35vh" }}>
        <GoogleMapReact
          onClick={_onClick}
          style={{ height: "100%" }}
          bootstrapURLKeys={{
            key: "AIzaSyC_n0tFC99A24CfBUdscGVjGenGf7PILNw",
          }}
          defaultCenter={marker.lat ? marker : center}
          defaultZoom={marker.lat ? maxZoom : zoom}
        >
          <Marker
            lng={marker.lng}
            lat={marker.lat}
            markerImagePath={marker.markerImagePath}
          />
        </GoogleMapReact>
      </IonContent>
    );
  };

  return (
    <IonContent className="ion-padding-top ion-padding-bottom ion-padding-horizontal">
      <h3>Add new vendor</h3>
      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <IonGrid>
          <IonRow>
            <IonCol size="4" style={{ margin: "auto" }}>
              <IonButton onClick={handleRef} style={{ width: "100%" }}>
                <IonIcon slot="start" icon={cloudUploadOutline} />
                Picture
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  {...register("imagePath")}
                  ref={fileInput}
                  onChange={(event: any) => {
                    imageSelectedHandler(event.target.files[0]);
                  }}
                />
              </IonButton>
              {/* Check if an image file is uploaded */}
              {imageUrl ? (
                <IonImg src={imageUrl}></IonImg>
              ) : (
                <p className="ion-padding">Select picture of the vendor</p>
              )}
              {/*  */}
            </IonCol>
            <IonCol size="8">
              <IonItem>
                <IonInput
                  placeholder="Vendor name"
                  autocomplete="off"
                  required={true}
                  {...register("name")}
                />
              </IonItem>
              <IonItem>
                <IonTextarea
                  rows={6}
                  placeholder="Add more information about the vendor"
                  {...register("description")}
                ></IonTextarea>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid>
          <h5>Click on the map where the dish can be found</h5>
          <MapFC />
        </IonGrid>
        <IonGrid className="ion-padding">
          <IonRow class="ion-justify-content-around">
            <IonButton type="submit">Add vendor</IonButton>
            <IonButton
              onClick={() => props.setShowVendorCreateModal(false)}
              fill="outline"
              color="medium"
            >
              Close
            </IonButton>
          </IonRow>
        </IonGrid>
      </form>
      {/* End form */}
    </IonContent>
  );
};

export default ModalCreateVendor;
