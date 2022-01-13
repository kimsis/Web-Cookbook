import { IonContent, IonItem, IonIcon, IonLabel, IonButton, IonImg, IonGrid, IonRow, IonCol, IonChip } from '@ionic/react';
import { useParams } from 'react-router';
import './RecipeInfoModal.css';
import { star, starHalf, starOutline, time, megaphone, cellular, fastFood, earth, egg, timer } from 'ionicons/icons';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import Recipe from '../../shared/interfaces/Recipe.interface';
import axios, { AxiosResponse } from 'axios';
import AppContext from '../../store/AppContext';

const RecipeInfoModal: React.FC<{
  id: number,
  setShowRecipeInfoModal: Dispatch<SetStateAction<number>>
}> = (props) => {

  useEffect(() => {
    getData();
  }, [])

  const [recipe, setRecipe] = useState<Recipe>();
  const appContext = useContext(AppContext);

  async function getData() {
    await axios(appContext.http + "Recipe/" + props.id)
    .then((response) => {
      setData(response);
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      setError(error);
    });
  }
  
  function setData(data: AxiosResponse) {
    let recipeTest: Recipe = JSON.parse(JSON.stringify(data.data));
    setRecipe(recipeTest)
  }
  
  function setError(error:any) {
    console.log(error);
    
  }

    const { name } = useParams<{ name: string; }>();
    const starsArray = new Array(5).fill(0);
    const iconsStyling = { margin: "0px", marginRight: "8px" };
    return (
      <IonContent>
        <IonGrid style={{ padding: '10px', paddingTop: '50px' }}>
          <IonRow>
            <IonCol size="5"><IonImg src={recipe?.imagePath}></IonImg></IonCol>
            <IonCol>
              <IonRow>
                <IonCol>
                  <div>{recipe?.title}</div>
                </IonCol>
                <IonCol className="ion-align-self-center ion-float-right">              {
                  starsArray.map((x, i) => {
                    if (i + 1 <= (recipe?.rating ? recipe.rating : 0)) {
                      return <IonIcon icon={star} style={{height: "10px"}}></IonIcon>
                    }
                    else if (i + 1 > (recipe?.rating ? recipe.rating : 0) && i < (recipe?.rating ? recipe.rating : 0)) {
                      return <IonIcon icon={starHalf} style={{height: "10px"}}></IonIcon>
                    }
                    return <IonIcon icon={starOutline} style={{height: "10px"}}></IonIcon>
                  })
                }</IonCol>

              </IonRow>
              <IonItem color="none" lines="none" >
                <IonIcon icon={time} slot="start" style={iconsStyling} />
                <div>Time to cook: {recipe?.timeToCook}</div>
              </IonItem>
              <IonItem color="none" lines="none">
                <IonIcon icon={megaphone} slot="start" style={iconsStyling} />
                <div>Shared by: {recipe?.sharedBy.name}</div>
              </IonItem>
              <IonItem color="none" lines="none">
                <IonIcon icon={cellular} color = "warning" slot="start" style={iconsStyling} />
                <div>Difficulty to cook: {recipe?.difficulty}</div>
              </IonItem>
              <IonItem color="none" lines="none">
                <IonIcon icon={fastFood} slot="start" style={iconsStyling} />
                <div>Dish type: {recipe?.type}</div>
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
              { /*
              Unnecessary
            <IonCol size="1">
              <IonButton color="warning" fill="outline">Delete</IonButton>
            </IonCol>
            <IonCol size="1" offset="8">
              <IonButton color="warning" fill="solid">Edit</IonButton>
            </IonCol>
              */ }
            <IonCol >
              <IonButton color="warning" fill="outline" onClick={() => props.setShowRecipeInfoModal(0)}>Close</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    )
  };


export default RecipeInfoModal;