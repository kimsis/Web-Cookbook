import { IonMenuToggle, IonItem, IonIcon, IonLabel } from '@ionic/react';
import { AppPage } from './Menu';

const MenuItem: React.FC<{
	index: number;
	appPage: AppPage;
	pathname: string;
}> = (props) => {
	return (
		<IonMenuToggle key={props.index} autoHide={false}>
			<IonItem
				className={props.pathname === props.appPage.url ? 'selected' : ''}
				routerLink={props.appPage.url}
				routerDirection='none'
				lines='none'
				detail={false}>
				<IonIcon
					slot='start'
					ios={props.appPage.iosIcon}
					md={props.appPage.mdIcon}
				/>
				<IonLabel>{props.appPage.title}</IonLabel>
			</IonItem>
		</IonMenuToggle>
	);
};

export default MenuItem;
