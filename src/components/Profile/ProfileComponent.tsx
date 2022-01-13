import {
	IonButton,
	IonCol,
	IonContent,
	IonIcon,
	IonItem,
	IonModal,
	IonPage,
	IonRow,
	IonText,
	IonTitle,
} from '@ionic/react';
import axios, { AxiosResponse } from 'axios';
import { person, mail } from 'ionicons/icons';
import { Dispatch, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Data from '../../shared/interfaces/Data.interface';
import Recipe from '../../shared/interfaces/Recipe.interface';
import AppContext from '../../store/AppContext';
import ModalCreateRecipe from '../Recipes/ModalCreateRecipe';
import RecipeListItem from '../Recipes/RecipeListItem';
import './ProfileComponent';

const ProfileComponent: React.FC<{}> = ({ }) => {
	const contentFontSize = '2.5vw';
	//const iconsStyling = {
	//	margin: '5px',
	//	width: '1.5em',
	//	height: '1.5em',
	//	fontSize: contentFontSize,
	//};
	const [recipeList, setRecipeList] = useState<Recipe[] | null>();
	const [favouritesList, setFavouritesList] = useState<Recipe[] | null>();

	useEffect(() => {
		if (appContext.user?.id != undefined) {
			getData();
		}
	}, []);

	async function getData(id: number = appContext.user?.id || 0) {
		await axios(appContext.http + "Recipe/" + id)
			.then((response) => {
				appContext.user!.recipes = setData(response, setRecipeList);
			})
			.catch((error) => {
				console.error("Error fetching data: ", error);
				setError(error);
			});
		await axios(appContext.http + "Favourites/" + id)
			.then((response) => {
				appContext.user!.favourites = setData(response, setFavouritesList);
			})
			.catch((error) => {
				console.error("Error fetching data: ", error);
				setError(error);
			});
	}

	function setData(data: AxiosResponse, setRecipes: Dispatch<Recipe[]>): Recipe[] {
		let recipesArray:Data = JSON.parse(JSON.stringify(data.data));
		setRecipes(recipesArray.items);
		return recipesArray.items;
	}

	function setError(error: any) {
		console.log(error);
	}


  const [showRecipeCreateModal, setShowRecipeCreateModal] = useState(false);
  const appContext = useContext(AppContext);
  const history = useHistory();
  let RecipeList;
  if (appContext.user?.recipes != null) {
    RecipeList = appContext.user.recipes.map((recipe) => (
      <div key={recipe.id}>
        <RecipeListItem
          id={recipe.id}
          title={recipe.title}
          sharedBy={recipe.sharedBy}
          countryOfOrigin={recipe.countryOfOrigin}
          type={recipe.type}
          rating={recipe.rating}
          imagePath={recipe.imagePath}
          timeToCook={recipe.preparationTimeTicks}
        />
      </div>
    ));
  } else {
    RecipeList = <div> No recipes created! </div>;
  }

  let FavouritesList;
  if (appContext.user?.favourites != null) {
    FavouritesList = appContext.user.recipes.map((recipe) => (
      <div key={recipe.id}>
        <RecipeListItem
          id={recipe.id}
          title={recipe.title}
          sharedBy={recipe.sharedBy}
          countryOfOrigin={recipe.countryOfOrigin}
          type={recipe.type}
          rating={recipe.rating}
          imagePath={recipe.imagePath}
          timeToCook={recipe.preparationTimeTicks}
        />
      </div>
    ));
  } else {
    RecipeList = <div> No recipes created! </div>;
  }

<<<<<<< HEAD
	function Logout() {
		appContext.user = null;
		localStorage.clear();
		history.replace('/login')
	}
	return (
		<IonContent fullscreen>
			<IonModal isOpen={showRecipeCreateModal} onDidDismiss={() => setShowRecipeCreateModal(false)}>
				<ModalCreateRecipe showRecipeCreateModal={showRecipeCreateModal} setShowRecipeCreateModal={setShowRecipeCreateModal} />
			</IonModal>
			<IonItem style={{ marginTop: '20px' }}>
				<IonCol>
					<IonRow class="ion-justify-content-center">
						<IonButton onClick={() => { Logout() }}> Logout </IonButton>
					</IonRow>
					<IonRow class="ion-justify-content-center">
						<IonButton onClick={() => setShowRecipeCreateModal(true)}> Add Recipe </IonButton>
					</IonRow>
					<IonRow>
						<div style={{ display: 'flex', fontSize: contentFontSize }}>
							<IonIcon icon={person} slot='start' style={iconsStyling} />
							<div style={{ margin: 'auto' }}>{appContext.user?.fullName}</div>
						</div>
					</IonRow>
					<IonRow>
						<div style={{ display: 'flex', fontSize: contentFontSize }}>
							<IonIcon icon={mail} slot='start' style={iconsStyling} />
							<div style={{ margin: 'auto' }}>{appContext.user?.email}</div>
						</div>
					</IonRow>
				</IonCol>
			</IonItem>
			<IonItem>
				<IonCol>
					<IonRow><p> Recipes</p> </IonRow>
					{RecipeList}
				</IonCol>
			</IonItem>
			<IonItem>
				<IonCol>
					<IonRow><p> Favourites </p></IonRow>
					{FavouritesList}
				</IonCol>
			</IonItem>
		</IonContent>
	);
=======
  function Logout() {
    appContext.user = null;
    history.replace("/Login");
  }
  return (
    <IonContent fullscreen className="profile-info">
      <IonModal
        isOpen={showRecipeCreateModal}
        onDidDismiss={() => setShowRecipeCreateModal(false)}
      >
        <ModalCreateRecipe
          showRecipeCreateModal={showRecipeCreateModal}
          setShowRecipeCreateModal={setShowRecipeCreateModal}
        />
      </IonModal>
      <IonItem>
        <IonCol>
          <IonRow class="ion-justify-content-end">
            <IonButton
              onClick={() => {
                Logout();
              }}
            >
              Logout
            </IonButton>
          </IonRow>
          <IonRow
            class="ion-align-items-center"
            style={{ flexDirection: "column" }}
          >
            <div>
              <IonIcon
                icon={person}
                slot="start"
                style={{
                  fontSize: 100,
                  color: "#374957",
                }}
              />
            </div>
            <div>
              <h4>{appContext.user?.fullName + "user"}</h4>
            </div>
            <h4>{appContext.user?.email ? "" : "placeholder@email.com"}</h4>
          </IonRow>
        </IonCol>
      </IonItem>
      <IonItem>
        <IonCol>
          <IonRow className="ion-align-items-center">
            <p>My Recipes</p>
            <IonRow class="ion-justify-content-center">
              <IonButton onClick={() => setShowRecipeCreateModal(true)}>
                + Add Recipe
              </IonButton>
            </IonRow>
          </IonRow>
          {RecipeList}
        </IonCol>
      </IonItem>
      <IonItem>
        <IonCol>
          <IonRow>
            <p>My Favourites </p>
          </IonRow>
          {FavouritesList}
        </IonCol>
      </IonItem>
    </IonContent>
  );
>>>>>>> 4c814237dd105552237357602ecba1b114fd018f
};

export default ProfileComponent;
