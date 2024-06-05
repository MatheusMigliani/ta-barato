import React, { useState } from "react";
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
  IonButton,
  IonToast,
  useIonRouter,
} from "@ionic/react";
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
  logOutOutline,
} from "ionicons/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/FirebaseConfig";

const Menu: React.FC = () => {
  const [user] = useAuthState(auth);
  const [showLogout, setShowLogout] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const router = useIonRouter();

  const paths = [
    { name: "Inicial", url: "/menu/inicial", icon: homeOutline },
    { name: "Perfil", url: "/menu/perfil", icon: personOutline },
    { name: "Carrinho", url: "/menu/carrinho", icon: cartOutline },
    { name: "Configurações", url: "/menu/settings", icon: settingsOutline },
  ];

  const handleLogout = async () => {
    if (!logoutSuccess) {
      router.push("/", "root");
      // Verifica se o logout já foi realizado
      setShowLogoutToast(true); // Exibe o toast de logout
      await auth.signOut();
      setLogoutSuccess(true);
    }
  };

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
          {user && (
            <IonItem color={"dark"}>
              <IonButton
                fill="clear"
                expand="block"
                color="danger"
                onClick={() => handleLogout()}
              >
                <IonIcon slot="start" color="tbpink" icon={logOutOutline} />
                <IonText color={"tbpink"}>Sair</IonText>
              </IonButton>
            </IonItem>
          )}

          <IonToast
            isOpen={showLogoutToast}
            onDidDismiss={() => setShowLogoutToast(false)}
            message="Você foi deslogado com sucesso."
            duration={2000}
          />
        </IonContent>
      </IonMenu>
      <IonRouterOutlet id="main">
        <Route
          path="/menu/Inicial" // <-- "/menu/inicial/*"
          component={Inicial}
        />
        <Route path="/menu/settings" component={Settings} />
        <Route path="/menu/perfil" component={Perfil} />
        <Redirect exact from="/menu" to="/menu/Inicial" />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default Menu;
