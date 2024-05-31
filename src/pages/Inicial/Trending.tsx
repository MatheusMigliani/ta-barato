import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import Hamburguerbotao from "../../components/hamburguerbotao";
import "./trending.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../../components/swiper.css";
// Your custom styles for the carousel

import SwiperCore from "swiper";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import { getDeals, getGameInfo } from "../../services/api";
import {
  arrowDownCircleOutline,
  cartOutline,
  pricetagOutline,
} from "ionicons/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

// Install Swiper modules
SwiperCore.use([Pagination, Navigation]);

const Trending: React.FC = () => {
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
      (deal) => deal.type === "package" || deal.type === "game" || deal.type === "dlc"
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Hamburguerbotao />
        </IonToolbar>
      </IonHeader>
      <IonContent  color="tborchidpink" >
   

        <Swiper
        effect={"autoplay"}
          spaceBetween={1}
          slidesPerView={"auto"}
          pagination={{ clickable: true, dynamicBullets: true, }}
          loop={true}
          navigation={true}
        >
          {deals.map((deal) => (
            <SwiperSlide key={deal.id}>
            <IonCard color={"tbhoneydew"} className="deal-card">
              <IonCardContent>
                <IonText color="primary" className="section-title">OFERTAS ESPECIAIS</IonText>
                <div className="card-content">
                  <IonImg
                    className="main-image"
                    src={deal.image}
                    alt={`Main image for ${deal.title}`}
                  />
                  <div className="details">
                    <IonText color="primary" className="deal-title">{deal.title}</IonText>
                    <div className="price-section">
                      <IonText className="discount">-{deal.deal.cut}%</IonText>
                      <IonText color="tborchidpink"  className="current-price">
                        R$ {deal.deal.price.amount}
                      </IonText>
                      <IonText className="original-price">
                        R$ {deal.deal.regular.amount}
                      </IonText>
                      <IonText className="best-price">
                        Melhor R$ {deal.deal.historyLow.amount}
                      </IonText>
                      <IonButton
                        expand="block"
                        fill="outline"
                        color="primary"
                        onClick={() => handleLinkClick(deal.deal.url)}
                      >
                        <IonIcon icon={cartOutline} />
                        Comprar
                      </IonButton>
                    </div>
                  </div>
                </div>
              </IonCardContent>
            </IonCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default Trending;
