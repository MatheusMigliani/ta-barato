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
import { homeOutline, personOutline, settingsOutline } from "ionicons/icons";


const Perfil: React.FC = () => {
  return (
    <IonTabs>
      <IonTabBar color={"tbhoneydew"} slot="bottom" className="custom-tab-bar">
        <IonTabButton tab="Home" href="/menu/inicial">
          <IonIcon color="tborchidpink" icon={homeOutline} />
          <IonLabel color="tborchidpink">Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="Configurações" href="/menu/settings">
          <IonIcon color="tborchidpink" icon={settingsOutline} />
          <IonLabel color="tborchidpink">Configurações</IonLabel>
        </IonTabButton>
      </IonTabBar>
      <IonRouterOutlet>
        <Route path="/menu/perfil/tab1perfil" component={Tab1perfil} />

        <Route exact path="/menu/perfil">
          <Redirect to="/menu/perfil/tab1perfil" />
        </Route>
      </IonRouterOutlet>
    </IonTabs>
  );
};

export default Perfil;
