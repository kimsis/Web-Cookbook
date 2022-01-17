import { createContext } from "react";
import Filter from "../shared/interfaces/Filter.interface";

let dummyCountryOfOrigin: string[] = [
  "Bulgarian",
  "Turkish",
  "Japanese",
  "Indian",
];
let dummyDishType: string[] = [
  "Breakfast",
  "Brunch",
  "Lunch",
  "Snack",
  "Dinner",
  "Dessert",
];
let dummyPreparationTime: number[] = [5, 10, 15, 20, 30, 60, 120, 180];
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
