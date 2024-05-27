import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/react";
import { flameOutline, personOutline, pricetagOutline, settingsOutline } from "ionicons/icons";
import { Route, Redirect } from "react-router";
import Ofertas from "./Ofertas";
import Trending from "./Trending";

const Inicial: React.FC = () => {
  return (
    <IonTabs>
      <IonTabBar color={"dark"} slot="bottom">
        <IonTabButton tab="Ofertas" href="/menu/Inicial/Ofertas">
          <IonIcon color="tbpink" icon={pricetagOutline} />
          <IonLabel color="tbpink">Ofertas</IonLabel>
        </IonTabButton>
        <IonTabButton tab="Trending" href="/menu/Inicial/Trending">
          <IonIcon color="tbpink" icon={flameOutline} />
          <IonLabel color="tbpink">Populares</IonLabel>
        </IonTabButton>
      </IonTabBar>
      <IonRouterOutlet>
        <Route path="/menu/Inicial/Trending" component={Trending} exact />
        <Route path="/menu/Inicial/Ofertas" component={Ofertas} exact />
        <Route exact path="/menu/Inicial">
          <Redirect to="/menu/Inicial/Ofertas" />
        </Route>
      </IonRouterOutlet>
    </IonTabs>
  );
};

export default Inicial;
