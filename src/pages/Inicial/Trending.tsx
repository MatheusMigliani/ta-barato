import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import Hamburguerbotao from '../../components/hamburguerbotao';

const Trending: React.FC = () => {

    return (
        
        <IonPage>
            <IonHeader>
                <IonToolbar>
                <Hamburguerbotao />
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                
                UI goes here...
            </IonContent>
        </IonPage>
    );
};

export default Trending;