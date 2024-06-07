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
import Tab1 from "../Perfil/Tab1settings";
import Tab2 from "./Tab2settings";
import {
  cogSharp,
  contrastOutline,
  hammerOutline,
  homeOutline,
  personOutline,
} from "ionicons/icons";
import Tab1settings from "../Perfil/Tab1settings";
import Tab2settings from "./Tab2settings";
import hamburguerbotao from "../../components/hamburguerbotao";
import "../../components/tabs.css";

const Settings: React.FC = () => {
  return (
    <IonTabs>
      <IonTabBar slot="bottom" className="custom-tab-bar">
        <IonTabButton tab="Tab2settings" href="/menu/inicial">
          <IonIcon color="tborchidpink" icon={homeOutline} />
          <IonLabel color="tborchidpink">Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="Tab1settings" href="/menu/perfil/tab1perfil">
          <IonIcon color="tborchidpink" icon={personOutline} />
          <IonLabel color="tborchidpink"> Configurações</IonLabel>
        </IonTabButton>
      </IonTabBar>
      <IonRouterOutlet>
        <Route path="/menu/settings/tab1settings" component={Tab1settings} />
        <Route path="/menu/settings/tab2settings" component={Tab2settings} />
        <Route exact path="/menu/settings">
          <Redirect to={`/menu/settings/tab1settings`} />
        </Route>
      </IonRouterOutlet>
    </IonTabs>
  );
};

export default Settings;
