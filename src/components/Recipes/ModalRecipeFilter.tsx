import { IonButton, IonContent, IonGrid, IonRow } from "@ionic/react";
import React, { Dispatch, SetStateAction, useContext } from "react";
import Filter from "../../shared/interfaces/Filter.interface";
import FilterContext from "../../store/FiltersContext";
import "./ModalRecipeFilter.css";

const ModalRecipeFilter: React.FC<{
  showRecipeFilterModal: boolean;
  setShowRecipeFilterModal: Dispatch<SetStateAction<boolean>>;
}> = (props) => {
  // Usubg the filter context, create lists of elements for each filter type
  const filterContext = useContext(FilterContext);
  let CountriesOfOriginList = filterContext.countryOfOrigin.map(
    (countryOfOrigin) => (
      <IonButton
        fill={countryOfOrigin.includes(countryOfOrigin) ? "outline" : "solid"}
        class="filterItem"
        onClick={() => addFilter("countryOfOrigin", countryOfOrigin)}
      >
        {countryOfOrigin}
      </IonButton>
    )
  );

  let DishTypesList = filterContext.dishType.map((dishType) => (
    <IonButton
      fill="outline"
      class="filterItem"
      onClick={() => addFilter("dishType", dishType)}
    >
      {dishType}
    </IonButton>
  ));

  let PreparationTimesList = filterContext.preparationTime.map(
    (preparationTime) => (
      <IonButton
        fill="outline"
        class="filterItem"
        onClick={() => addFilter("preparationTimeTicks", preparationTime)}
      >
        {preparationTime}
      </IonButton>
    )
  );

  let DifficultiesList = filterContext.difficulty.map((difficulty) => (
    <IonButton
      fill="outline"
      class="filterItem"
      onClick={() => {
        addFilter("difficulty", difficulty);
      }}
    >
      {difficulty}
    </IonButton>
  ));

  // Add the filter to the array of selected filters
  function addFilter(type: string, filter: string | number) {
    let addition: Filter = { type: type, value: filter };
    // Check if the filter exists
    if (
      filterContext.filters.find(
        (e) => e.type === addition.type && e.value === addition.value
      )
    ) {
      // Find the index of the filter and remove it from the array
      let index = filterContext.filters.findIndex(
        (e) => e.type === addition.type && e.value === addition.value
      );
      if (index > -1) {
        filterContext.filters.splice(index, 1);
      }
    } else {
      // Add the filter
      filterContext.filters.push(addition);
    }
  }

  return (
    <IonContent className="ion-padding">
      <h3 className="ion-padding">Add more Fillters</h3>
      <IonGrid>
        <IonRow>
          <h5>Country of Origin</h5>
        </IonRow>
        <IonRow>{CountriesOfOriginList}</IonRow>
        <IonRow>
          <h5>Dish Type</h5>
        </IonRow>
        <IonRow>{DishTypesList}</IonRow>
        <IonRow>
          <h5>Preparation Time</h5>
        </IonRow>
        <IonRow>{PreparationTimesList}</IonRow>
        <IonRow>
          <h5>Difficulty</h5>
        </IonRow>
        <IonRow>{DifficultiesList}</IonRow>
        <IonRow>
          <IonButton
            color="primary"
            fill="solid"
            onClick={() => props.setShowRecipeFilterModal(false)}
          >
            Save
          </IonButton>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
};

export default ModalRecipeFilter;
