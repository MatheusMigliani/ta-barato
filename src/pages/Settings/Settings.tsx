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
import Tab1 from "./Tab1settings";
import Tab2 from "./Tab2settings";
import {
  cogSharp,
  contrastOutline,
  hammerOutline,
  homeOutline,
} from "ionicons/icons";
import Tab1settings from "./Tab1settings";
import Tab2settings from "./Tab2settings";
import hamburguerbotao from "../../components/hamburguerbotao";

const Settings: React.FC = () => {



  return (
    <IonTabs>
      <IonTabBar slot="bottom">
        <IonTabButton tab="Tab1settings" href="/menu/settings/Tab1settings">
          <IonIcon icon={hammerOutline} />
          <IonLabel>Configurações</IonLabel>
        </IonTabButton>
        <IonTabButton tab="Tab2settings" href="/menu/settings/Tab2settings">
          <IonIcon icon={contrastOutline} />
          <IonLabel>Home</IonLabel>
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
