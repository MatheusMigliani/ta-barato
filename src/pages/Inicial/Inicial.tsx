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
  IonImg,
} from "@ionic/react";
import Hamburguerbotao from "../../components/hamburguerbotao";
import { getDeals, getGameInfo } from "../../services/api";
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
    const fetchAllData = async () => {
      const dealsData = await getDeals();
      const gameInfos = await Promise.all(
        dealsData.map((deal) => getGameInfo(deal.id))
      );
      const dealsWithImages = dealsData.map((deal, index) => ({
        ...deal,
        image: gameInfos[index], // Store the URL of the game image
      }));
      // Filter out deals with types "dlc" and "software"
      const filteredDeals = dealsWithImages.filter(
        (deal) => deal.type === "package" || deal.type === "game"
      );
      setDeals(filteredDeals);
    };

    fetchAllData();
  }, []);

  const handleLinkClick = (url) => {
    window.open(url, "_blank"); // Open the URL in a new tab
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
            <IonGrid>
              <IonRow>
                <IonCol size="12">
                  {deal.image && (
                    <IonImg
                      src={deal.image}
                      alt={`Box art for ${deal.title}`}
                    />
                  )}
                </IonCol>
              </IonRow>
              <IonRow className="ion-align-items-center">
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
                    fill="outline"
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