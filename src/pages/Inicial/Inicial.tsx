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
      <IonTabBar color={"tbhoneydew"}  slot="bottom" className="custom-tab-bar">
        <IonTabButton tab="Ofertas" href="/menu/Inicial/Ofertas">
          <IonIcon color="tborchidpink" icon={pricetagOutline} />
          <IonLabel color="tborchidpink">Ofertas</IonLabel>
        </IonTabButton>
        <IonTabButton tab="Perfil" href="/menu/perfil">
          <IonIcon color="tborchidpink" icon={personOutline} />
          <IonLabel color="tborchidpink">Perfil</IonLabel>
        </IonTabButton>
        <IonTabButton tab="Configurações" href="/menu/settings">
          <IonIcon color="tborchidpink" icon={settingsOutline} />
          <IonLabel color="tborchidpink">Configurações</IonLabel>
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
