import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton, IonImg, IonGrid, IonRow, IonCol, IonChip } from '@ionic/react';
import { useParams } from 'react-router';
import './RecipeInfoModal.css';
import { star, starHalf, starOutline, time, megaphone, cellular, fastFood, earth, egg, timer } from 'ionicons/icons';
import { Dispatch, SetStateAction, useContext } from 'react';
import RecipesContext from '../store/RecipesContext';

const RecipeInfoModal: React.FC<{
  id: number,
  setShowRecipeInfoModal: Dispatch<SetStateAction<number>>
}> = (props) => {
    const recipesContext = useContext(RecipesContext);
    const recipes = recipesContext.recipes;
    const recipe = recipes.find(r => r.id === props.id);
    const { name } = useParams<{ name: string; }>();
    const starsArray = new Array(5).fill(0);
    const iconsStyling = { margin: "5px" };
    return (
      <IonContent>
        <IonGrid style={{ padding: '50px' }}>
          <IonRow>
            <IonCol size="3"><IonImg src={recipe?.imagePath}></IonImg></IonCol>
            <IonCol>
              <IonRow>
                <IonCol>
                  <h1>{recipe?.title}</h1>
                </IonCol>
                <IonCol className="ion-align-self-center ion-float-right">              {
                  starsArray.map((x, i) => {
                    if (i + 1 <= (recipe?.rating ? recipe.rating : 0)) {
                      return <IonIcon icon={star} style={{width: "30px",height: "30px"}}></IonIcon>
                    }
                    else if (i + 1 > (recipe?.rating ? recipe.rating : 0) && i < (recipe?.rating ? recipe.rating : 0)) {
                      return <IonIcon icon={starHalf} style={{width: "30px",height: "30px"}}></IonIcon>
                    }
                    return <IonIcon icon={starOutline} style={{width: "30px",height: "30px"}}></IonIcon>
                  })
                }</IonCol>

              </IonRow>
              <IonItem color="none" lines="none" >
                <IonIcon icon={time} slot="start" style={iconsStyling} />
                <p>Time to cook: {recipe?.timeToCook}</p>
              </IonItem>
              <IonItem color="none" lines="none">
                <IonIcon icon={megaphone} slot="start" style={iconsStyling} />
                <p>Shared by: {recipe?.sharedBy}</p>
              </IonItem>
              <IonItem color="none" lines="none">
                <IonIcon icon={cellular} color = "warning" slot="start" style={iconsStyling} />
                <p>Difficulty to cook: {recipe?.difficulty}</p>
              </IonItem>
              <IonItem color="none" lines="none">
                <IonIcon icon={fastFood} slot="start" style={iconsStyling} />
                <p>Dish type: {recipe?.type}</p>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol><h1>More Details</h1>
              <IonItem color="none" lines="none">
                <IonIcon icon={earth} slot="start" style={iconsStyling} />
                <p>Country of origin: {recipe?.countryOfOrigin}</p>
              </IonItem>
              <IonItem color="none" lines="none">
                <IonIcon icon={egg} slot="start" style={iconsStyling} />
                <p>Number of servings: {recipe?.numberOfServings}</p>
              </IonItem>
              <IonItem color="none" lines="none">
                <IonIcon icon={timer} slot="start" style={iconsStyling} />
                <p>Preparation time: {recipe?.preparationTimeTicks}</p>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol ><h1>Ingredients</h1>
              {
                recipe?.ingredients.map(x =>
                  <IonChip>
                    <IonLabel>{x}</IonLabel>
                  </IonChip>
                )
              }

            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol ><h1>Instructions</h1>
              <p>{recipe?.instructions}</p> </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="1">
              <IonButton color="warning" fill="outline">Delete</IonButton>
            </IonCol>
            <IonCol size="1" offset="8">
              <IonButton color="warning" fill="solid">Edit</IonButton>
            </IonCol>
            <IonCol >
              <IonButton color="warning" fill="outline" onClick={() => props.setShowRecipeInfoModal(0)}>Close</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    )
  };


export default RecipeInfoModal;