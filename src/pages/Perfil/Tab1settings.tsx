import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import Hamburguerbotao from '../../components/hamburguerbotao';

const Tab1settings: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <Hamburguerbotao/>
            </IonHeader>
            <IonContent className="ion-padding">
                settings 1
            </IonContent>
        </IonPage>
    );
};

export default Tab1settings;