import React, { useState } from "react";
import {
  IonToolbar,
  IonButton,
  IonMenuButton,
  IonSearchbar,
  IonIcon,
} from "@ionic/react";
import "./ExploreContainer.css";
import {
  searchOutline,
  trashBin,
  personOutline,
  homeOutline,
  cartOutline,
  settingsOutline,
} from "ionicons/icons";
import "./toolbarstyle.css";

const Hamburguerbotao: React.FC = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleSearchbar = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <IonToolbar color={"dark"}>
      <IonButton color={"primary"} slot="start" size="small" fill="clear">
        <IonMenuButton color={"tbpink"} />
      </IonButton>

      <div className="pesquisa-container">
        <IonSearchbar
          className={`pesquisa ${searchVisible ? "visible" : ""}`}
          color={"dark"}
          showClearButton="focus"
          animated={true}
          clearIcon={null}
          searchIcon={searchOutline}
          placeholder="Buscar"
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value!)}
        ></IonSearchbar>

        <div className={`icons-container ${searchVisible ? "hidden" : ""}`}>
          <IonButton slot="end" color={"dark"} onClick={toggleSearchbar}>
            <IonIcon
              color={"tbpink"}
              slot="icon-only"
              icon={searchOutline}
            ></IonIcon>
          </IonButton>
          <IonButton slot="end" color={"dark"} href="/menu/Inicial">
            <IonIcon color={"tbpink"} slot="icon-only" icon={homeOutline}></IonIcon>
          </IonButton>
          <IonButton slot="end" color={"dark"} href="/menu/perfil">
            <IonIcon color={"tbpink"} slot="icon-only" icon={cartOutline}></IonIcon>
          </IonButton>
          <IonButton slot="end" color={"dark"} href="/menu/perfil">
            <IonIcon
              color={"tbpink"}
              slot="icon-only"
              icon={personOutline}
            ></IonIcon>
          </IonButton>
          <IonButton slot="end" color={"dark"} href="/menu/settings">
            <IonIcon
              color={"tbpink"}
              slot="icon-only"
              icon={settingsOutline}
            ></IonIcon>
          </IonButton>
        </div>

        {searchVisible && (
          <IonButton className="close-button" color={"dark"} onClick={toggleSearchbar}>
            <IonIcon
              color={"tbpink"}
              slot="icon-only"
              icon={trashBin}
            ></IonIcon>
          </IonButton>
        )}
      </div>
    </IonToolbar>
  );
};

export default Hamburguerbotao;
