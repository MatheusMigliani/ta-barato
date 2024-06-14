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
  IonRow,
  IonToggle,
  IonLabel,
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
  moonOutline,
  moon,
} from "ionicons/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/FirebaseConfig";
import Trending from "../Inicial/Trending";

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
    <IonPage color={"tbhoneydew"}>
      <IonContent color={"tbhoneydew"}></IonContent>
      <IonMenu color="tborchidpink" contentId="main">
        <IonHeader color="tborchidpink">
          <IonToolbar color={"tbhoneydew"}>
            <IonTitle color="tborchidpink">Menu</IonTitle>

            {user && (
              <IonButton
                fill="clear"
                color={"tborchidpink"}
                slot="end"
                onClick={() => handleLogout()}
              >
                <IonIcon
                  slot="start"
                  color="tborchidpink"
                  icon={logOutOutline}
                />
                <IonText color={"tborchidpink"}>Sair</IonText>
              </IonButton>
            )}
          </IonToolbar>
        </IonHeader>
        <IonContent color="tbhoneydew" className="ion-padding">
          
          {paths.map((item, index) => (
            <IonMenuToggle key={index}>
              <IonItem
                color={"tbhoneydew"}
                routerLink={item.url}
                routerDirection="none"
              >
                <IonIcon slot="start" color="tborchidpink" icon={item.icon} />
                <IonText color={"tborchidpink"}>{item.name}</IonText>
              </IonItem>
            </IonMenuToggle>
          ))}

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
        <Route
          path="/menu/trending" // <-- "/menu/inicial/*"
          component={Trending}
        />
        <Route path="/menu/settings" component={Settings} />
        <Route path="/menu/perfil" component={Perfil} />
        <Redirect exact from="/menu" to="/menu/inicial" />
      </IonRouterOutlet>
    </IonPage>
  );
};

export default Menu;
