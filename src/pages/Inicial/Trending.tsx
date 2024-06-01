import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonText,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import Hamburguerbotao from "../../components/hamburguerbotao";
import "./trending.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../../components/swiper.css";
import "../../components/swiperbig.css";

// Your custom styles for the carousel

import SwiperCore from "swiper";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import {
  getDeals,
  getGameBoxart,
  getGameInfo,
  getGamePrices,
  getMostPopularGames,
  getMostCollectedGames,
  getMostWaitlistedGames,
} from "../../services/api";
import {
  cartOutline,
  pricetagOutline,
} from "ionicons/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

// Install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay]);

const Trending: React.FC = () => {
  const [deals, setDeals] = useState([]);
  const [mostPopularGames, setMostPopularGames] = useState([]);
  const [mostCollectedGames, setMostCollectedGames] = useState([]);
  const [mostWaitlistedGames, setMostWaitlistedGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);

    const dealsData = await getDeals();
    console.log("dealsData:", dealsData);

    const gameInfos = await Promise.all(
      dealsData.map((deal) => getGameInfo(deal.id))
    );

    const boxartInfos = await Promise.all(
      dealsData.map((deal) => getGameBoxart(deal.id))
    );

    const priceInfos = await Promise.all(
      dealsData.map((deal) => getGamePrices(deal.id))
    );

    const dealsWithImages = dealsData.map((deal, index) => ({
      ...deal,
      image: gameInfos[index],
      boxart: boxartInfos[index],
      price: priceInfos[index],
    }));

    const filteredDeals = dealsWithImages.filter(
      (deal) =>
        deal.type === "package" || deal.type === "game" || deal.type === "dlc"
    );
    setDeals(filteredDeals);

    // Fetch most popular games
    const mostPopularGamesData = await getMostPopularGames();
    console.log("mostPopularGamesData:", mostPopularGamesData);

    const mostPopularGameInfos = await Promise.all(
      mostPopularGamesData.map((game) => getGameInfo(game.id))
    );
    const mostPopularBoxartInfos = await Promise.all(
      mostPopularGamesData.map((game) => getGameBoxart(game.id))
    );
    const mostPopularPriceInfos = await Promise.all(
      mostPopularGamesData.map((game) => getGamePrices(game.id))
    );

    const mostPopularGamesWithImages = mostPopularGamesData.map(
      (game, index) => ({
        ...game,
        image: mostPopularGameInfos[index],
        boxart: mostPopularBoxartInfos[index],
        price: mostPopularPriceInfos[index],
      })
    );
    setMostPopularGames(mostPopularGamesWithImages);

    // Fetch most collected games
    const mostCollectedGamesData = await getMostCollectedGames();
    console.log("mostCollectedGamesData:", mostCollectedGamesData);

    const mostCollectedGameInfos = await Promise.all(
      mostCollectedGamesData.map((game) => getGameInfo(game.id))
    );
    const mostCollectedBoxartInfos = await Promise.all(
      mostCollectedGamesData.map((game) => getGameBoxart(game.id))
    );
    const mostCollectedPriceInfos = await Promise.all(
      mostCollectedGamesData.map((game) => getGamePrices(game.id))
    );

    const mostCollectedGamesWithImages = mostCollectedGamesData.map(
      (game, index) => ({
        ...game,
        image: mostCollectedGameInfos[index],
        boxart: mostCollectedBoxartInfos[index],
        price: mostCollectedPriceInfos[index],
      })
    );
    setMostCollectedGames(mostCollectedGamesWithImages);

    // Fetch most waitlisted games
    const mostWaitlistedGamesData = await getMostWaitlistedGames();
    console.log("mostWaitlistedGamesData:", mostWaitlistedGamesData);

    const mostWaitlistedGameInfos = await Promise.all(
      mostWaitlistedGamesData.map((game) => getGameInfo(game.id))
    );
    const mostWaitlistedBoxartInfos = await Promise.all(
      mostWaitlistedGamesData.map((game) => getGameBoxart(game.id))
    );
    const mostWaitlistedPriceInfos = await Promise.all(
      mostWaitlistedGamesData.map((game) => getGamePrices(game.id))
    );

    const mostWaitlistedGamesWithImages = mostWaitlistedGamesData.map(
      (game, index) => ({
        ...game,
        image: mostWaitlistedGameInfos[index],
        boxart: mostWaitlistedBoxartInfos[index],
        price: mostWaitlistedPriceInfos[index],
      })
    );
    setMostWaitlistedGames(mostWaitlistedGamesWithImages);

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
      <IonContent color="tborchidpink">
        <Swiper
          className="large-image-swiper" // Unique class name for this Swiper
          autoplay={{
            delay: 1800,
            disableOnInteraction: false, // Ensure autoplay does not stop on user interaction
          }}
          centeredSlides={true}
          spaceBetween={30}
          slidesPerView={"auto"}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {mostPopularGames.map((game) => (
            <SwiperSlide key={game.id}>
              <div
                className="swiper-slide"
                style={{
                  backgroundImage: `url(${game.boxart})`,
                  backgroundSize: "cover", // Maintain aspect ratio
                  backgroundPosition: "center", // Center the image
                }}
              >
                <div className="slide-text">
                  <h1>{game.title}</h1>
                  <br />
                  <p>Clássicos & Atemporais</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          autoplay={{
            delay: 1500,
            disableOnInteraction: false, // Ensure autoplay does not stop on user interaction
          }}
          centeredSlides={true}
          spaceBetween={30}
          slidesPerView={"auto"}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[Autoplay, Pagination]}
        >
          {deals.map((deal) => (
            <SwiperSlide key={deal.id}>
              <IonCard color={"tbhoneydew"} className="deal-card">
                <IonCardContent>
                  <IonText color="primary" className="section-title">
                    🔥POPULARES🔥
                  </IonText>
                  <div className="card-content">
                    <IonImg
                      className="main-image"
                      src={deal.image}
                      alt={`Main image for ${deal.title}`}
                    />
                    <div className="details">
                      <IonText color="primary" className="deal-title">
                        {deal.title}
                      </IonText>
                      <div className="price-section">
                        <IonText className="discount">
                          -{deal.price?.cut}%
                        </IonText>
                        <IonText color="tborchidpink" className="current-price">
                          R$ {deal.price?.amount}
                        </IonText>
                        <IonText className="original-price">
                          R$ {deal.price?.regular}
                        </IonText>
                        <IonText className="best-price">
                          Melhor R$ {deal.price?.historyLow}
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

        {/*  SWIPER MOST POPULAR */}
        <Swiper
          autoplay={{
            delay: 1400,
            disableOnInteraction: false, // Ensure autoplay does not stop on user interaction
          }}
          centeredSlides={true}
          spaceBetween={30}
          slidesPerView={"auto"}
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
                        <IonText className="discount">
                          -{game.price?.cut}%
                        </IonText>
                        <IonText color="tborchidpink" className="current-price">
                          R$ {game.price?.amount}
                        </IonText>
                        <IonText className="original-price">
                          R$ {game.price?.regular}
                        </IonText>
                        <IonText className="best-price">
                          Melhor R$ {game.price?.historyLow}
                        </IonText>
                        <IonButton
                          expand="block"
                          fill="outline"
                          color="primary"
                          onClick={() => handleLinkClick(game.urls.game)}
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

        {/*  SWIPER MOST COLLECTED */}
        <Swiper
          autoplay={{
            delay: 1400,
            disableOnInteraction: false, // Ensure autoplay does not stop on user interaction
          }}
          centeredSlides={true}
          spaceBetween={30}
          slidesPerView={"auto"}
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
                        <IonText className="discount">
                          -{game.price?.cut}%
                        </IonText>
                        <IonText color="tborchidpink" className="current-price">
                          R$ {game.price?.amount}
                        </IonText>
                        <IonText className="original-price">
                          R$ {game.price?.regular}
                        </IonText>
                        <IonText className="best-price">
                          Melhor R$ {game.price?.historyLow}
                        </IonText>
                        <IonButton
                          expand="block"
                          fill="outline"
                          color="primary"
                          onClick={() => handleLinkClick(game.urls.game)}
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

        {/*  SWIPER MOST WAITLISTED */}
        <Swiper
          autoplay={{
            delay: 1400,
            disableOnInteraction: false, // Ensure autoplay does not stop on user interaction
          }}
          centeredSlides={true}
          spaceBetween={30}
          slidesPerView={"auto"}
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[Autoplay, Pagination]}
        >
          {mostWaitlistedGames.map((game) => (
            <SwiperSlide key={game.id}>
              <IonCard color={"tbhoneydew"} className="deal-card">
                <IonCardContent>
                  <IonText color="primary" className="section-title">
                    🎁 MAIS AGUARDADOS 🎁
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
                        <IonText className="discount">
                          -{game.price?.cut}%
                        </IonText>
                        <IonText color="tborchidpink" className="current-price">
                          R$ {game.price?.amount}
                        </IonText>
                        <IonText className="original-price">
                          R$ {game.price?.regular}
                        </IonText>
                        <IonText className="best-price">
                          Melhor R$ {game.price?.historyLow}
                        </IonText>
                        <IonButton
                          expand="block"
                          fill="outline"
                          color="primary"
                          onClick={() => handleLinkClick(game.urls.game)}
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
