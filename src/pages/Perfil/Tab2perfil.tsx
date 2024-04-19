import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import Hamburguerbotao from '../../components/hamburguerbotao';

const Tab2perfil: React.FC = () => {

    return (
        <IonPage>
            <IonHeader>
                <Hamburguerbotao/>
            </IonHeader>
            <IonContent className="ion-padding">
                perfil 2
            </IonContent>
        </IonPage>
    );
};

export default Tab2perfil;