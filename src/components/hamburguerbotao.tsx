import {
  IonToolbar,
  IonButton,
  IonMenuButton,
  IonTitle,
  IonSearchbar,
  IonIcon,
} from "@ionic/react";
import "./ExploreContainer.css";
import {
  searchCircle,
  searchOutline,
  trashBin,
  personOutline,
  heart,
  homeOutline,
  cartOutline,
  cogOutline,
  settingsOutline,
} from "ionicons/icons";
import "./toolbarstyle.css";

const Hamburguerbotao: React.FC = () => {
  return (
    <IonToolbar color={"dark"}>
      
      <IonButton color={"primary"} slot="start" size="small" fill="clear">
        <IonMenuButton color={"tbpink"} />
       
      </IonButton>
      <IonSearchbar
        className="pesquisa"
        color={"dark"}
        showClearButton="focus"
        animated={true}
        clearIcon={trashBin}
        searchIcon={searchOutline}
        placeholder="Buscar"
      ></IonSearchbar>
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

    
    </IonToolbar>
  );
};

export default Hamburguerbotao;
