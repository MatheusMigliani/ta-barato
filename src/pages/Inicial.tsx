import {
  IonButton,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { homeOutline, cogOutline } from "ionicons/icons";
import React from "react";
import Hamburguerbotao from "../components/hamburguerbotao";

const Inicial: React.FC = () => {
  const paths = [
    { name: "Home", url: "/menu/Inicial", icon: homeOutline },
    { name: "Settings", url: "/menu/settings", icon: cogOutline },
  ];

  return (
    <IonPage>
      <IonHeader>
        <Hamburguerbotao/>
      </IonHeader>
      <IonContent color={"dark"} className="ion-padding">UI goes here...</IonContent>
    </IonPage>
  );
};

export default Inicial;
