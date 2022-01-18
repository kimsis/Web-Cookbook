import {
  IonContent,
  IonLabel,
  IonButton,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import "./ModalVendorInfo.css";
import { chevronBackCircleOutline } from "ionicons/icons";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Vendor from "../../shared/interfaces/Vendor.interface";
import axios, { AxiosResponse } from "axios";
import AppContext from "../../store/AppContext";

const ModalVendorInfo: React.FC<{
  id: number;
  setShowVendorInfoModal: Dispatch<SetStateAction<number>>;
}> = (props) => {
  useEffect(() => {
    getData();
  }, []);

  const [vendor, setVendor] = useState<Vendor>();
  const appContext = useContext(AppContext);
  let ingredientsList;
  async function getData() {
    await axios(appContext.http + "Vendor/" + props.id)
      .then((response) => {
        setData(response);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  function setData(data: AxiosResponse) {
    let vendorTest: Vendor = JSON.parse(JSON.stringify(data.data));
    setVendor(vendorTest);
  }

  if (
    vendor != null &&
    vendor.ingredients !== null &&
    vendor.ingredients.length > 0
  ) {
    console.log(vendor.ingredients);
    ingredientsList = vendor?.ingredients.map((ingredient) => (
      <IonChip>
        <IonLabel key={ingredient.id}>{ingredient.name}</IonLabel>
      </IonChip>
    ));
  } else {
    ingredientsList = <div> No ingredients found for this vendor </div>;
  }

  function setError(error: any) {
    console.log(error);
  }

  const iconsStyling = { margin: "0px", marginRight: "8px" };
  return (
    <IonContent>
      <IonFab style={{ margin: "10px" }}>
        <IonFabButton
          size="small"
          onClick={() => props.setShowVendorInfoModal(0)}
        >
          <IonIcon
            style={{ fontSize: "32px" }}
            icon={chevronBackCircleOutline}
          />
        </IonFabButton>
      </IonFab>
      <IonGrid style={{ padding: "10px", marginTop: "65px" }}>
        <IonRow>
          <IonCol size="5">
            <IonImg src={vendor?.imagePath}></IonImg>
          </IonCol>
          <IonCol style={{ padding: "10px" }}>
            <IonRow>
              <h2>{vendor?.name}</h2>
            </IonRow>
            <IonRow>
              <p>{vendor?.description}</p>
            </IonRow>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <h1>Ingredients</h1>
            {ingredientsList}
          </IonCol>
        </IonRow>

        <IonRow>
          {/*
              Unnecessary
            <IonCol size="1">
              <IonButton color="warning" fill="outline">Delete</IonButton>
            </IonCol>
            <IonCol size="1" offset="8">
              <IonButton color="warning" fill="solid">Edit</IonButton>
            </IonCol>
              */}
          <IonCol>
            <IonButton
              color="warning"
              fill="outline"
              onClick={() => props.setShowVendorInfoModal(0)}
            >
              Close
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default ModalVendorInfo;
