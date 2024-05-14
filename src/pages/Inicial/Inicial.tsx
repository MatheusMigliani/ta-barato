import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/react";
import { personOutline, settingsOutline } from "ionicons/icons";
import { Route, Redirect } from "react-router";
import Ofertas from "./Ofertas";
import Trending from "./Trending";

const Inicial: React.FC = () => {
  return (
    <IonTabs>
      <IonTabBar slot="bottom">
        <IonTabButton tab="Ofertas" href="/menu/Inicial/Ofertas">
          <IonIcon icon={personOutline} />
          <IonLabel>Ofertas</IonLabel>
        </IonTabButton>
        <IonTabButton tab="Trending" href="/menu/Inicial/Trending">
          <IonIcon icon={settingsOutline} />
          <IonLabel>Populares</IonLabel>
        </IonTabButton>
      </IonTabBar>
      <IonRouterOutlet>
        <Route exact path="/menu/Inicial/Trending" component={Trending} />
        <Route exact path="/menu/Inicial/Ofertas" component={Ofertas} />
        <Route exact path="/menu/Inicial">
          <Redirect to="/menu/Inicial/Ofertas" />
        </Route>
      </IonRouterOutlet>
    </IonTabs>
  );
};

export default Inicial;
