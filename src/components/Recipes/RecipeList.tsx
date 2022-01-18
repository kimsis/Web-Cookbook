import { IonList, IonRow } from "@ionic/react";
import Recipe from "../../shared/interfaces/Recipe.interface";
import RecipeListItem from "./RecipeListItem";

const RecipeList: React.FC<{
  recipes: Recipe[] | null;
  message: string;
  onDismissCallback: () => void;
}> = (props) => {
  let list;
  if (props.recipes != null && props.recipes.length > 0) {
    list = props.recipes.map((recipe, key) => (
      <div key={key}>
        <RecipeListItem
          id={recipe.id}
          title={recipe.title}
          sharedBy={recipe.sharedBy}
          countryOfOrigin={recipe.countryOfOrigin}
          type={recipe.type}
          rating={recipe.rating}
          imagePath={recipe.imagePath}
          timeToCook={recipe.preparationTimeTicks}
          onDismissCallback={props.onDismissCallback}
        />
      </div>
    ));
  } else {
    list = <div>{props.message}</div>;
  }
  return (
    <IonList id="menu-list" style={{ margin: "auto", maxWidth: "800px" }}>
      {list}
    </IonList>
  );
};

export default RecipeList;
