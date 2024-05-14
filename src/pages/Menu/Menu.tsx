import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import Inicial from "../Inicial/Inicial";
import Settings from "../Settings/Settings";
import Perfil from "../Perfil/Perfil";
import {
  cardOutline,
  cartOutline,
  settingsOutline,
  homeOutline,
  personOutline,
} from "ionicons/icons";


const Menu: React.FC = () => {
  const paths = [
    { name: "Inicial", url: "/menu/inicial", icon: homeOutline },
    { name: "Perfil", url: "/menu/perfil", icon: personOutline },
    { name: "Carrinho", url: "/menu/carrinho", icon: cartOutline },
    { name: "Configurações", url: "/menu/settings", icon: settingsOutline },
  ];

  return (
    <IonPage color={"dark"}>
      <IonContent color={"dark"}></IonContent>
      <IonMenu color="tbpurple" contentId="main">
        <IonHeader color="tbpink">
          <IonToolbar color={"dark"}>
            <IonTitle color="tbpink">Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent color="dark" className="ion-padding">
          {paths.map((item, index) => (
            <IonMenuToggle key={index}>
              <IonItem
                color={"dark"}
                routerLink={item.url}
                routerDirection="none"
              >
                <IonIcon slot="start" color="tbpink" icon={item.icon} />
                <IonText color={"tbpink"}>{item.name}</IonText>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonContent>
      </IonMenu>
      <IonRouterOutlet id="main">
        <Route exact path="/menu/Inicial" component={Inicial} />
        <Route path="/menu/Settings" component={Settings} />
        <Route path="/menu/perfil" component={Perfil} />
        <Route exact path="/menu">
          <Redirect to="/menu/Inicial" />
        </Route>
      </IonRouterOutlet>
    </IonPage>
  );
};

export default Menu;
