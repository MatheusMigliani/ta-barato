import {
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import Tab1perfil from "./Tab1perfil";
import Tab2perfil from "./Tab2perfil";
import { personOutline, settingsOutline } from 'ionicons/icons';

const Perfil: React.FC = () => {
  return (
    <IonTabs>
      <IonTabBar slot="bottom">
        <IonTabButton tab="Tab1perfil" href="/menu/perfil/Tab1perfil">
          <IonIcon icon={personOutline} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
        <IonTabButton tab="Tab2perfil" href="/menu/perfil/Tab2perfil">
          <IonIcon icon={settingsOutline} />
          <IonLabel>Configurações</IonLabel>
        </IonTabButton>
      </IonTabBar>
      <IonRouterOutlet>
        <Route path="/menu/perfil/tab1perfil" component={Tab1perfil} />
        <Route path="/menu/perfil/tab2perfil" component={Tab2perfil} />
        <Route exact path="/menu/perfil">
          <Redirect to="/menu/perfil/tab1perfil" />
        </Route>
      </IonRouterOutlet>
    </IonTabs>
  );
};

export default Perfil;
