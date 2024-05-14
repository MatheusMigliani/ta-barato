import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonToolbar,
  IonIcon,
  IonButton,
  IonCol,
  IonGrid,
  IonRow,
  IonImg,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import Hamburguerbotao from "../../components/hamburguerbotao";
import { getDeals, getGameInfo } from "../../services/api";
import {
  arrowBackCircleOutline,
  arrowDownCircleOutline,
  caretDownCircle,
  cartOutline,
  contrastOutline,
  hammerOutline,
} from "ionicons/icons";
import "./Inicial.css"; // Importando estilos CSS personalizados
import { Route, Redirect } from "react-router";
import Populares from "./Populares";

const Ofertas: React.FC = () => {
  const [deals, setDeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const dealsData = await getDeals();
    const gameInfos = await Promise.all(
      dealsData.map((deal) => getGameInfo(deal.id))
    );
    const dealsWithImages = dealsData.map((deal, index) => ({
      ...deal,
      image: gameInfos[index], // Armazena a URL da imagem do jogo
    }));
    // Filtra os deals com tipos "dlc" e "software"
    const filteredDeals = dealsWithImages.filter(
      (deal) => deal.type === "package" || deal.type === "game"
    );
    setDeals(filteredDeals);
    setIsLoading(false);
  };

  const handleRefresh = (event: CustomEvent) => {
    fetchData();
    setTimeout(() => {
      event.detail.complete();
    }, 2000); // Simula um atraso de 2 segundos para demonstração
  };

  const handleLinkClick = (url: string) => {
    window.open(url, "_blank"); // Abre a URL em uma nova aba
  };

  // Função para renderizar um card esqueleto
  const renderSkeletonCard = () => (
    <IonCard color="dark" className="ion-padding skeleton-card">
      <IonGrid>
        <IonRow>
          <IonCol size="12">
            <div className="skeleton-img skeleton-animation"></div>
          </IonCol>
        </IonRow>
        <IonRow className="ion-align-items-center">
          <IonCol>
            <IonText color="tbpink">
              <h2 className="ion-text-center skeleton-text skeleton-animation"></h2>
            </IonText>
            <IonText color="tbpink" className="ion-text-center">
              <p className="skeleton-text skeleton-animation"></p>
              <p className="skeleton-text skeleton-animation"></p>
              <p className="skeleton-text skeleton-animation"></p>
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
              className="skeleton-animation"
            >
              <IonIcon icon={cartOutline} />
              Comprar
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );

  return (
    <IonPage color="success">
      <IonHeader>
        <IonToolbar>
          <Hamburguerbotao />
        </IonToolbar>
      </IonHeader>
      <IonContent color="success" className="ion-padding" fullscreen>
        <div className="spinner-container success-spinner">
          <IonRefresher
            color="success"
            slot="fixed"
            onIonRefresh={handleRefresh}
          >
            <IonRefresherContent
              color="dark"
              pullingIcon={arrowDownCircleOutline}
              pullingText="Puxe para atualizar"
              refreshingSpinner="lines" // Alterar para "lines"
              refreshingText="Atualizando..."
            />
          </IonRefresher>
        </div>

        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <React.Fragment key={index}>
                {renderSkeletonCard()}
              </React.Fragment>
            ))
          : deals.map((deal) => (
              <IonCard key={deal.id} color="dark" className="ion-padding">
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
                        <p>{deal.type}</p>
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

export default Ofertas;