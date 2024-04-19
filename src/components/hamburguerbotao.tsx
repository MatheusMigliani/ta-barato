import { IonToolbar, IonButton, IonMenuButton, IonTitle } from '@ionic/react';
import './ExploreContainer.css';

interface ContainerProps { }

const Hamburguerbotao: React.FC<ContainerProps> = () => {
  return (
    <IonToolbar color={"dark"}>
          <IonButton color={"primary"} slot="start" size="small" fill="clear">
            <IonMenuButton color={"tbpink"}/>
          </IonButton>
          <IonTitle></IonTitle>
        </IonToolbar>
  );
};

export default Hamburguerbotao;
