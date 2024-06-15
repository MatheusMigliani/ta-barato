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
  IonSkeletonText,
  IonText,
  IonToast,
  IonToolbar,
  useIonLoading,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import Hamburguerbotao from "../../components/hamburguerbotao";
import "./trending.css";
import {
  arrowDownCircleOutline,
  cartOutline,
  pricetagOutline,
} from "ionicons/icons";
import "../../components/darkmode.css";

// Your custom styles for the carousel

import {
  getDeals,
  getGameBoxart,
  getGameInfo,
  getMostPopularGames,
  getMostCollectedGames,
  getMostWaitlistedGames,
  getPriceHistory,
  getGameURL,
  getGameBanner,
} from "../../services/api";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import SwiperCore from "swiper";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../../components/body.css";

// Install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay]);

const Ofertas: React.FC = () => {
  const [deals, setDeals] = useState([]);
  const [mostPopularGames, setMostPopularGames] = useState([]);
  const [mostCollectedGames, setMostCollectedGames] = useState([]);
  const [mostWaitlistedGames, setMostWaitlistedGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    present("Carregando Dados");

    try {
      const [
        dealsData,
        mostPopularData,
        mostCollectedData,
        mostWaitlistedData,
      ] = await Promise.all([
        getDeals(),
        getMostPopularGames(),
        getMostCollectedGames(),
        getMostWaitlistedGames(),
      ]);

      const enrichedDealsData = await Promise.all(
        dealsData.map(async (deal) => {
          const gameBanner = await getGameBanner(deal.id);
          return {
            ...deal,
            banner600: gameBanner,
          };
        })
      );

      const enrichedMostPopularGames = await Promise.all(
        mostPopularData.map(async (game) => {
          const gameBoxart = await getGameBoxart(game.id);
          const gameBanner = await getGameBanner(game.id);
          const priceHistory = await getPriceHistory(game.id);

          return {
            ...game,
            banner: gameBanner,
            image: gameBoxart,
            price: priceHistory[0]?.deal?.price.amount,
            regular: priceHistory[0]?.deal?.regular.amount,
            cut: priceHistory[0]?.deal?.cut,
            historyLow: priceHistory.reduce(
              (min, p) =>
                p.deal.price.amount < min ? p.deal.price.amount : min,
              priceHistory[0]?.deal.price.amount
            ),
          };
        })
      );

      const enrichedMostCollectedGames = await Promise.all(
        mostCollectedData.map(async (game) => {
          const gameBoxart = await getGameBoxart(game.id);
          const priceHistory = await getPriceHistory(game.id);

          return {
            ...game,
            image: gameBoxart,
            price: priceHistory[0]?.deal?.price.amount,
            regular: priceHistory[0]?.deal?.regular.amount,
            cut: priceHistory[0]?.deal?.cut,
            historyLow: priceHistory.reduce(
              (min, p) =>
                p.deal.price.amount < min ? p.deal.price.amount : min,
              priceHistory[0]?.deal.price.amount
            ),
          };
        })
      );

      const enrichedMostWaitlistedGames = await Promise.all(
        mostWaitlistedData.map(async (game) => {
          const gameBoxart = await getGameBoxart(game.id);
          const priceHistory = await getPriceHistory(game.id);

          return {
            ...game,
            image: gameBoxart,
            price: priceHistory[0]?.deal?.price.amount,
            regular: priceHistory[0]?.deal?.regular.amount,
            cut: priceHistory[0]?.deal?.cut,
            historyLow: priceHistory.reduce(
              (min, p) =>
                p.deal.price.amount < min ? p.deal.price.amount : min,
              priceHistory[0]?.deal.price.amount
            ),
          };
        })
      );

      setDeals(enrichedDealsData);
      setMostPopularGames(enrichedMostPopularGames);
      setMostCollectedGames(enrichedMostCollectedGames);
      setMostWaitlistedGames(enrichedMostWaitlistedGames);
    } catch (error) {
      showToastMessage("Tente novamente em 10 segundos");
      console.error("Error fetching data", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        dismiss();
        showToastMessage("Pagina carregada com sucesso.");
      }, 2000); // Timeout de 2 segundos para garantir que a UI carregue completamente
    }
  };
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };


  const handleRefresh = (event: CustomEvent) => {
    fetchData();
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  const handleLinkClick = (url: string) => {
    window.open(url, "_blank"); // Abre a URL em uma nova aba
  };

  const handleLink = async (gameId) => {
    const url = await getGameURL(gameId);
    window.open(url, "_blank"); // Abre a URL em uma nova aba
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Hamburguerbotao />
        </IonToolbar>
      </IonHeader>
      <IonContent color={"tborchidpink"}>
        <div className="spinner-container success-spinner ion-padding">
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

        {/* Skeleton para Swiper de jogos populares */}
        {isLoading ? (
          <Swiper className="large-image-swiper">
            <SwiperSlide>
              <IonCard color={"tbhoneydew"} className="deal-card">
                <IonCardContent>
                  <IonSkeletonText animated style={{ width: "60%" }} />
                  <div className="card-content">
                    <IonSkeletonText
                      animated
                      style={{ width: "100%", height: "200px" }}
                    />
                    <div className="details">
                      <IonSkeletonText animated style={{ width: "80%" }} />
                      <div className="price-section">
                        <IonSkeletonText animated style={{ width: "30%" }} />
                        <IonSkeletonText animated style={{ width: "50%" }} />
                      </div>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
          </Swiper>
        ) : (
          <Swiper
            className="large-image-swiper"
            autoplay={{
              delay: 1800,
              disableOnInteraction: false,
            }}
            centeredSlides={true}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[Autoplay, Pagination]}
          >
            {mostPopularGames.map((game) => (
              <SwiperSlide key={game.id}>
                <div
                  className="swiper-slide"
                  style={{
                    backgroundImage: `url(${game.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="slide-text">
                    <h1>{game.title}</h1>
                    <br />
                    <p>
                      <IonText>Clássicos & Atemporais</IonText>
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Outros swipers com skeletons */}
        {isLoading ? (
          <Swiper>
            <SwiperSlide>
              <IonCard color={"tbhoneydew"} className="deal-card">
                <IonCardContent>
                  <IonSkeletonText animated style={{ width: "60%" }} />
                  <div className="card-content">
                    <IonSkeletonText
                      animated
                      style={{ width: "100%", height: "200px" }}
                    />
                    <div className="details">
                      <IonSkeletonText animated style={{ width: "80%" }} />
                      <div className="price-section">
                        <IonSkeletonText animated style={{ width: "30%" }} />
                        <IonSkeletonText animated style={{ width: "50%" }} />
                      </div>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
          </Swiper>
        ) : (
          <Swiper
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            centeredSlides={true}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[Autoplay, Pagination]}
          >
            {deals.map((deal) => (
              <SwiperSlide key={deal.id}>
                <IonCard color={"tbhoneydew"} className="deal-card">
                  <IonCardContent>
                    <IonText color="primary" className="section-title">
                      🔥MELHORES OFERTAS🔥
                    </IonText>
                    <div className="card-content">
                      <IonImg
                        className="main-image"
                        src={deal.banner600}
                        alt={`Main image for ${deal.title}`}
                      />
                      <div className="details">
                        <IonText color="primary" className="deal-title">
                          {deal.title}
                        </IonText>
                        <div className="price-section">
                          <IonText className="discount">
                            -{deal.deal.cut}%
                          </IonText>
                          <IonText
                            color="tborchidpink"
                            className="current-price"
                          >
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
                            color="warning"
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
        )}

        {/*  SWIPER MOST POPULAR */}
        {isLoading ? (
          <Swiper>
            <SwiperSlide>
              <IonCard color={"tbhoneydew"} className="deal-card">
                <IonCardContent>
                  <IonSkeletonText animated style={{ width: "60%" }} />
                  <div className="card-content">
                    <IonSkeletonText
                      animated
                      style={{ width: "100%", height: "200px" }}
                    />
                    <div className="details">
                      <IonSkeletonText animated style={{ width: "80%" }} />
                      <div className="price-section">
                        <IonSkeletonText animated style={{ width: "30%" }} />
                        <IonSkeletonText animated style={{ width: "50%" }} />
                      </div>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
          </Swiper>
        ) : (
          <Swiper
            autoplay={{ delay: 1400, disableOnInteraction: false }}
            centeredSlides={true}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[Autoplay, Pagination]}
          >
            {mostPopularGames.map((game) => (
              <SwiperSlide key={game.id}>
                <IonCard color={"tbhoneydew"} className="deal-card">
                  <IonCardContent>
                    <IonText color="primary" className="section-title">
                      ⭐ MAIS POPULARES ⭐
                    </IonText>
                    <div className="card-content">
                      <IonImg
                        className="main-image"
                        src={game.image}
                        alt={`Boxart for ${game.title}`}
                      />
                      <div className="details">
                        <IonText color="primary" className="deal-title">
                          {game.title}
                        </IonText>
                        <div className="price-section">
                          <IonText className="discount">-{game.cut}%</IonText>
                          <IonText
                            color="tborchidpink"
                            className="current-price"
                          >
                            R$ {game.price}
                          </IonText>
                          <IonText className="original-price">
                            R$ {game.regular}
                          </IonText>
                          <IonText className="best-price">{game.shop}</IonText>
                          <IonButton
                            expand="block"
                            fill="outline"
                            color="warning"
                            onClick={() => handleLink(game.id)}
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
        )}

        {/*  SWIPER MOST COLLECTED */}
        {isLoading ? (
          <Swiper>
            <SwiperSlide>
              <IonCard color={"tbhoneydew"} className="deal-card">
                <IonCardContent>
                  <IonSkeletonText animated style={{ width: "60%" }} />
                  <div className="card-content">
                    <IonSkeletonText
                      animated
                      style={{ width: "100%", height: "200px" }}
                    />
                    <div className="details">
                      <IonSkeletonText animated style={{ width: "80%" }} />
                      <div className="price-section">
                        <IonSkeletonText animated style={{ width: "30%" }} />
                        <IonSkeletonText animated style={{ width: "50%" }} />
                      </div>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
          </Swiper>
        ) : (
          <Swiper
            autoplay={{ delay: 1400, disableOnInteraction: false }}
            centeredSlides={true}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[Autoplay, Pagination]}
          >
            {mostCollectedGames.map((game) => (
              <SwiperSlide key={game.id}>
                <IonCard color={"tbhoneydew"} className="deal-card">
                  <IonCardContent>
                    <IonText color="primary" className="section-title">
                      📚 MAIS COLETADOS 📚
                    </IonText>
                    <div className="card-content">
                      <IonImg
                        className="main-image"
                        src={game.image}
                        alt={`Boxart for ${game.title}`}
                      />
                      <div className="details">
                        <IonText color="primary" className="deal-title">
                          {game.title}
                        </IonText>
                        <div className="price-section">
                          <IonText className="discount">-{game.cut}%</IonText>
                          <IonText
                            color="tborchidpink"
                            className="current-price"
                          >
                            R$ {game.price}
                          </IonText>
                          <IonText className="original-price">
                            R$ {game.regular}
                          </IonText>
                          <IonText className="best-price">{game.shop}</IonText>
                          <IonButton
                            expand="block"
                            fill="outline"
                            color="warning"
                            onClick={() => handleLink(game.id)}
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
        )}

        {/*  SWIPER MOST WAITLISTED */}
        {isLoading ? (
          <Swiper>
            <SwiperSlide>
              <IonCard color={"tbhoneydew"} className="deal-card">
                <IonCardContent>
                  <IonSkeletonText animated style={{ width: "60%" }} />
                  <div className="card-content">
                    <IonSkeletonText
                      animated
                      style={{ width: "100%", height: "200px" }}
                    />
                    <div className="details">
                      <IonSkeletonText animated style={{ width: "80%" }} />
                      <div className="price-section">
                        <IonSkeletonText animated style={{ width: "30%" }} />
                        <IonSkeletonText animated style={{ width: "50%" }} />
                      </div>
                    </div>
                  </div>
                </IonCardContent>
              </IonCard>
            </SwiperSlide>
          </Swiper>
        ) : (
          <Swiper
            autoplay={{ delay: 1400, disableOnInteraction: false }}
            centeredSlides={true}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[Autoplay, Pagination]}
          >
            {mostWaitlistedGames.map((game) => (
              <SwiperSlide key={game.id}>
                <IonCard color={"tbhoneydew"} className="deal-card">
                  <IonCardContent>
                    <IonText color="primary" className="section-title">
                      🎁 MAIS <br />
                      AGUARDADOS 🎁
                    </IonText>
                    <div className="card-content">
                      <IonImg
                        className="main-image"
                        src={game.image}
                        alt={`Boxart for ${game.title}`}
                      />
                      <div className="details">
                        <IonText color="primary" className="deal-title">
                          {game.title}
                        </IonText>
                        <div className="price-section">
                          <IonText className="discount">-{game.cut}%</IonText>
                          <IonText
                            color="tborchidpink"
                            className="current-price"
                          >
                            R$ {game.price}
                          </IonText>
                          <IonText className="original-price">
                            R$ {game.regular}
                          </IonText>
                          <IonText className="best-price">{game.shop}</IonText>
                          <IonButton
                            expand="block"
                            fill="outline"
                            color="warning"
                            onClick={() => handleLink(game.id)}
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
        )}
        <IonToast
          color={"tborchidpink"}
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
        />
      </IonContent>
    </IonPage>
  );
};

export default Ofertas;
