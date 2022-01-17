import {
  IonButton,
  IonContent,
  IonGrid,
  IonRow,
  IonItem,
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
  useEffect,
  useRef,
  useState,
} from "react";
import axios, { AxiosResponse } from "axios";
import { cloudUploadOutline, trashBin } from "ionicons/icons";
import { useForm } from "react-hook-form";
import AppContext from "../../store/AppContext";
import { Marker } from "../../pages/map/Map";
import GoogleMapReact from "google-map-react";
import "./ModalCreateVendor.css";
import Vendor from "../../shared/interfaces/Vendor.interface";

const ModalCreateVendor: React.FC<{
  showVendorCreateModal: number;
  setShowVendorCreateModal: Dispatch<SetStateAction<number>>;
}> = (props) => {
  const id = props.showVendorCreateModal;
  const [vendor, setVendor] = useState<Vendor>();
  const [imagePath, setImagePath] = useState("");
  const markerImagePath =
    "https://icon-library.com/images/dot-icon/dot-icon-17.jpg"; //Image for the marker
  const [marker, setMarker] = useState({ lat: 0, lng: 0, markerImagePath });
  const [deleteButton, setDeleteButton] = useState(<div></div>);
  const appContext = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const fileInput = useRef<HTMLInputElement>(null);

  const handleRef = () => {
    fileInput.current?.click();
  };

  useEffect(() => {
    if (id > 0) {
      getData();
      setDeleteButton(
        <IonButton onClick={() => deleteVendor()} color="danger">
          <IonIcon slot="start" icon={trashBin} />
          Delete
        </IonButton>
      )
    }
  }, [])

  //Select the image from the file input

  const imageSelectedHandler = (file: any) => {
    const imagePath: any = URL.createObjectURL(file);
    setImagePath(imagePath);
    console.log(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fan6fnua");

    axios
      .post("https://api.cloudinary.com/v1_1/dafrxyo42/image/upload", formData)
      .then((data) => {
        console.log(data);
        setImagePath(data.data.url);
        console.log(imagePath);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function deleteVendor() {
    axios
      .delete(appContext.http + "Vendor/" + id, {
        headers: {
          "x-auth":
            appContext.user?.JWTToken == undefined
              ? ""
              : appContext.user.JWTToken,
        },
      })
      .then((response) => {
        console.log(response);
        props.setShowVendorCreateModal(0);
      })
      .catch((error) => {
        console.log(error + " Error deleting recipe");
      });
  };

  async function getData() {
    await axios(appContext.http + "Vendor/" + id)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  function setData(data: AxiosResponse) {
    let vendor: Vendor = JSON.parse(JSON.stringify(data.data));
    setVendor(vendor);
    setImagePath(vendor.imagePath);
    // Set the Map marker, using the recipe data
    let lat = vendor.latitude;
    let lng = vendor.longitude;
    setMarker({ lat, lng, markerImagePath });
    console.log(vendor);
  }

  function setError(error: any) {
    console.log(error);
  }

  //Submit POST request to API

  const onSubmit = (data: any) => {
    data = {
      ...data,
      imagePath: imagePath,
      latitude: marker.lat,
      longitude: marker.lng,
      ingredients: [],
    };

    if (id === -1) {
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
          props.setShowVendorCreateModal(0);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .put(appContext.http + "Vendor/" + id, data, {
          headers: {
            "x-auth":
              appContext.user?.JWTToken == undefined
                ? ""
                : appContext.user.JWTToken,
          },
        })
        .then((response) => {
          console.log(response);
          props.setShowVendorCreateModal(0);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
      <h3>{id === -1 ? "Add new" : "Modify"} vendor</h3>
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
              {imagePath ? (
                <IonImg src={imagePath}></IonImg>
              ) : (
                <p className="ion-padding">Select picture of the vendor</p>
              )}
              {/*  */}
            </IonCol>
            <IonCol size="8">
              <IonItem>
                <IonInput
                  value={vendor?.name}
                  placeholder="Vendor name"
                  autocomplete="off"
                  required={true}
                  {...register("name")}
                />
              </IonItem>
              <IonItem>
                <IonTextarea
                  value={vendor?.description}
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
            <IonButton type="submit"> {id === -1 ? "Add " : "Modify "}vendor</IonButton>
            <IonButton
              onClick={() => props.setShowVendorCreateModal(0)}
              fill="outline"
              color="medium"
            >
              Close
            </IonButton>
            {deleteButton}
          </IonRow>
        </IonGrid>
      </form>
      {/* End form */}
    </IonContent>
  );
};

export default ModalCreateVendor;
