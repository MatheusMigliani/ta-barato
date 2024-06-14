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
import "../../pages/Perfil/Perfil"
import "../../components/tabs.css"

const Inicial: React.FC = () => {
  
  return (
    <IonTabs>
      <IonTabBar slot="bottom" className="custom-tab-bar">
        <IonTabButton tab="Ofertas" href="/menu/Inicial/Ofertas">
          <IonIcon  icon={pricetagOutline} />
          <IonLabel >Ofertas</IonLabel>
        </IonTabButton>
        <IonTabButton tab="Perfil" href="/menu/perfil">
          <IonIcon  icon={personOutline} />
          <IonLabel >Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
      <IonRouterOutlet>
        <Route path="/menu/Inicial/Trending" component={Trending}  />
        <Route path="/menu/Inicial/Ofertas" component={Ofertas}  />
        <Route exact path="/menu/Inicial">
          <Redirect to="/menu/Inicial/Ofertas" />
        </Route>
      </IonRouterOutlet>
    </IonTabs>
  );
};

export default Inicial;
