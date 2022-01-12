import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonModal, IonSearchbar } from '@ionic/react';
import React, { useContext, useEffect, useState } from "react";
import RecipeInfoModal from '../../components/Recipes/RecipeInfoModal';
import axios, { AxiosResponse } from 'axios';
import './Vendors.css';
import AppContext from '../../store/AppContext';
import { Vendor } from '../../shared/interfaces/Vendor.interfdace';
import VendorListItem from '../../components/Profile/Vendors/VendorListItem';

interface Data {
  page: number;
  size: number;
  items: Vendor[];
}

const Vendors: React.FC<{
}> = (props) => {

  useEffect(() => {
    getData();
  }, [])

  const [showRecipeInfoModal, setShowRecipeInfoModal] = useState(0);
  const [vendors, setVendors] = useState<Vendor[] | null>();
  const appContext = useContext(AppContext);


  let vendorsArray: Data;
  async function getData() {
    await axios(appContext.http + "Vendor/PagedList")
      .then((response) => {
        console.log(response);
        setData(response);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError(error);
      });
  }

  function setData(data: AxiosResponse) {
    vendorsArray = JSON.parse(JSON.stringify(data.data));
    console.log(vendorsArray.items);
    setVendors(vendorsArray.items)
  }

  function setError(error: any) {
    console.log(error);
  }

  let VendorList;
  if (vendors != null) {
    VendorList = vendors.map((vendor) =>
      <div key={vendor.id} onClick={() => setShowRecipeInfoModal(vendor.id)}>
        <VendorListItem
          id={vendor.id}
          name={vendor.name}
          imagePath={vendor.imagePath}
        />
      </div>
    );
  } else {
    VendorList = <div> No recipes found! </div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Explore Recipes</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonModal isOpen={showRecipeInfoModal == 0 ? false : true} onDidDismiss={() => setShowRecipeInfoModal(0)}>
          < RecipeInfoModal id={showRecipeInfoModal} setShowRecipeInfoModal={setShowRecipeInfoModal} />
        </IonModal>
        <IonList id='menu-list'>
          {VendorList}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Vendors;
