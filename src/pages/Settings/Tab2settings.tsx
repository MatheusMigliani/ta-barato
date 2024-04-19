import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import Hamburguerbotao from '../../components/hamburguerbotao';

const Tab2settings: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <Hamburguerbotao/>
            </IonHeader>
            <IonContent className="ion-padding">
                settings 2
            </IonContent>
        </IonPage>
    );
};

export default Tab2settings;