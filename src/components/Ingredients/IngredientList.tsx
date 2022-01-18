import { IonSelectOption } from "@ionic/react";
import Ingredient from "../../shared/interfaces/Ingredient.interface";

  const IngredientList : React.FC<{ingredients:Ingredient[] | undefined}> = (props) => {
    let list;
    if (props.ingredients != undefined && props.ingredients.length > 0) {
      list = props.ingredients.map((ingredient, key) => (
        <IonSelectOption key={"ingredient" + key} value={ingredient.id}>{ingredient.name}</IonSelectOption>
      ));
    } else {
      list = <IonSelectOption> No ingredients found! </IonSelectOption>;
    }
    return <div>{list}</div>
  }

export default IngredientList