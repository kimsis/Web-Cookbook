import { createContext } from "react";
import Filter from "../shared/interfaces/Filter.interface";

let dummyCountryOfOrigin: string[] = [
  "Bulgarian",
  "Turkish",
  "Japanese",
  "Indian",
];
let dummyDishType: string[] = [
  "Appetizer",
  "Dessert",
  "Drink",
  "Snack",
  "Salad",
  "Soup",
  "Main",
];
let dummyPreparationTime: number[] = [5, 15, 30, 45, 60];
let dummyDifficulty: string[] = [
  "Easy",
  "Intermediate",
  "Advanced",
  "Challenging",
  "Expert",
];
let dummyFilters: Filter[] = [];

const FilterContext = createContext({
  countryOfOrigin: dummyCountryOfOrigin,
  dishType: dummyDishType,
  preparationTime: dummyPreparationTime,
  difficulty: dummyDifficulty,
  filters: dummyFilters,
});

export const FilterContextProvider: React.FC = (props) => {
  const context = {
    countryOfOrigin: dummyCountryOfOrigin,
    dishType: dummyDishType,
    preparationTime: dummyPreparationTime,
    difficulty: dummyDifficulty,
    filters: dummyFilters,
  };

  return (
    <FilterContext.Provider value={context}>
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
