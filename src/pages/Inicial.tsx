import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonButton,
  IonItem,
  IonCol,
  IonGrid,
  IonRow,
} from "@ionic/react";
import Hamburguerbotao from "../components/hamburguerbotao";
import { getDeals } from "../services/api";
import {
  arrowBackCircleOutline,
  arrowForwardCircle,
  caretDownCircle,
  caretUpCircle,
  cartOutline,
  linkOutline,
  personOutline,
  pricetag,
  pricetagOutline,
  pricetagSharp,
  pricetags,
  pricetagsSharp,
} from "ionicons/icons";

const Inicial: React.FC = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      const data = await getDeals();
      console.log("Fetched data:", data);
      if (data) {
        setDeals(data);
      }
    };

    fetchDeals();
  }, []);

  const handleLinkClick = (url) => {
    window.open(url, "_blank"); // Abre a URL em uma nova aba
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Hamburguerbotao />
        </IonToolbar>
      </IonHeader>
      <IonContent color={"success"} className="ion-padding">
        {deals.map((deal) => (
          <IonCard key={deal.id} color={"dark"} className="ion-padding">
            <IonIcon icon={pricetagsSharp} color="tbpink" size="large" />
            <IonGrid>
              <IonRow className="ion-align-items-center">
                <IonCol size="auto"></IonCol>
                <IonCol>
                  <IonText color="tbpink">
                    <h2 className="ion-text-center">{deal.title}</h2>
                  </IonText>
                  <IonText color="tbpink" className="ion-text-center">
                    <p>{deal.deal.historyLow.amount}</p>
                    <p>
                      <IonIcon icon={caretDownCircle} size="large" />$
                      {deal.deal.price.amount} {deal.deal.price.currency}{" "}
                      (Normal: ${deal.deal.regular.amount})
                    </p>
                    <p>Loja: {deal.deal.shop.name}</p>
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="12" className="ion-text-right">
                  <IonButton
                    expand="block"
                    fill="solid"
                    color="tbpink"
                    onClick={() => handleLinkClick(deal.deal.url)}
                  >
                    <IonIcon icon={cartOutline} />
                    Comprar
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Inicial;
