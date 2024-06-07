import React, { useState } from "react";
import {
  IonToolbar,
  IonButton,
  IonMenuButton,
  IonSearchbar,
  IonIcon,
  IonLabel,
  IonToggle,
} from "@ionic/react";
import {
  searchOutline,
  trashBin,
  personOutline,
  homeOutline,
  cartOutline,
  settingsOutline,
  moonOutline,
} from "ionicons/icons";
import "./toolbarstyle.css";
import { useDarkMode } from "./darkmodecontext";
import "./darkmode.css";

const Hamburguerbotao: React.FC = () => {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { darkMode, setDarkMode } = useDarkMode();

  const toggleSearchbar = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <IonToolbar color={"tbhoneydew"}>
      <IonButton color={"primary"} slot="start" size="small" fill="clear">
        <IonMenuButton color={"tborchidpink"} />
      </IonButton>{" "}
      <div className="pesquisa-container">
        <IonSearchbar
          className={`pesquisa ${searchVisible ? "visible" : ""}`}
          color={"tbhoneydew"}
          showClearButton="focus"
          animated={true}
          clearIcon={null}
          searchIcon={searchOutline}
          placeholder="Buscar"
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value!)}
        ></IonSearchbar>

        <div className="toggle-icon">
          <IonToggle
            color="tborchidpink"
            slot="end"
            name="darkmode"
            id="darkmode"
            checked={darkMode}
            onIonChange={(e) => setDarkMode(e.detail.checked)}
          />

          <IonIcon icon={moonOutline} color="tborchidpink" />
        </div>
        <div className={`icons-container ${searchVisible ? "hidden" : ""}`}>
          <IonButton slot="end" color={"tbhoneydew"} onClick={toggleSearchbar}>
            <IonIcon
              color={"tborchidpink"}
              slot="icon-only"
              icon={searchOutline}
            ></IonIcon>
          </IonButton>
        </div>
        {searchVisible && (
          <IonButton
            className="close-button"
            color={"tbhoneydew"}
            onClick={toggleSearchbar}
          >
            <IonIcon
              color={"tborchidpink"}
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
