import { IonButton, IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonList, IonModal, IonSearchbar } from '@ionic/react';
import React, { useContext, useEffect, useState } from "react";
import RecipeInfoModal from '../../components/Recipes/RecipeInfoModal';
import axios, { AxiosResponse } from 'axios';
import './Vendors.css';
import AppContext from '../../store/AppContext';
import { Vendor } from '../../shared/interfaces/Vendor.interface';
import VendorListItem from '../../components/Profile/Vendors/VendorListItem';
import VendorInfoModal from '../../components/Profile/Vendors/VendorInfoModal';

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

  const [showVendorInfoModal, setShowVendorInfoModal] = useState(0);
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
      <div key={vendor.id} onClick={() => setShowVendorInfoModal(vendor.id)}>
        <VendorListItem
          id={vendor.id}
          name={vendor.name}
          imagePath={vendor.imagePath}
          latitude={vendor.latitude}
          longitude={vendor.longitude}
        />
      </div>
    );
  } else {
    VendorList = <div> No vendors found! </div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Explore Vendors</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonModal isOpen={showVendorInfoModal == 0 ? false : true} onDidDismiss={() => setShowVendorInfoModal(0)}>
          < VendorInfoModal id={showVendorInfoModal} setShowVendorInfoModal={setShowVendorInfoModal} />
        </IonModal>
        <IonList id='menu-list'>
          {VendorList}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Vendors;
