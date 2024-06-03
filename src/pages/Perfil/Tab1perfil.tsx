import {
  IonAvatar,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";

import Hamburguerbotao from "../../components/hamburguerbotao";
import { starOutline, star } from "ionicons/icons";
import {
  getMostPopularGames,
  getMostCollectedGames,
  getMostWaitlistedGames,
  getGameBoxart,
  getGameInfo,
} from "../../services/api";
import "./perfil.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import SwiperCore from "swiper";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

// Install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay]);

const Tab1perfil: React.FC = () => {
  const [starRating, setStarRating] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [mostPopularGames, setMostPopularGames] = useState([]);
  const [mostCollectedGames, setMostCollectedGames] = useState([]);
  const [mostWaitlistedGames, setMostWaitlistedGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);

    const mostPopularGamesData = await getMostPopularGames();
    const mostPopularGameInfos = await Promise.all(
      mostPopularGamesData.map((game) => getGameInfo(game.id))
    );
    const mostPopularBoxartInfos = await Promise.all(
      mostPopularGamesData.map((game) => getGameBoxart(game.id))
    );
   

    const mostPopularGamesWithImages = mostPopularGamesData.map(
      (game, index) => ({
        ...game,
        image: mostPopularGameInfos[index],
        boxart: mostPopularBoxartInfos[index],
      })
    );
    setMostPopularGames(mostPopularGamesWithImages);

    const mostCollectedGamesData = await getMostCollectedGames();
    const mostCollectedGameInfos = await Promise.all(
      mostCollectedGamesData.map((game) => getGameInfo(game.id))
    );
    const mostCollectedBoxartInfos = await Promise.all(
      mostCollectedGamesData.map((game) => getGameBoxart(game.id))
    );
   

    const mostCollectedGamesWithImages = mostCollectedGamesData.map(
      (game, index) => ({
        ...game,
        image: mostCollectedGameInfos[index],
        boxart: mostCollectedBoxartInfos[index],
      })
    );
    setMostCollectedGames(mostCollectedGamesWithImages);

    const mostWaitlistedGamesData = await getMostWaitlistedGames();
    const mostWaitlistedGameInfos = await Promise.all(
      mostWaitlistedGamesData.map((game) => getGameInfo(game.id))
    );
    const mostWaitlistedBoxartInfos = await Promise.all(
      mostWaitlistedGamesData.map((game) => getGameBoxart(game.id))
    );


    const mostWaitlistedGamesWithImages = mostWaitlistedGamesData.map(
      (game, index) => ({
        ...game,
        image: mostWaitlistedGameInfos[index],
        boxart: mostWaitlistedBoxartInfos[index],
      })
    );
    setMostWaitlistedGames(mostWaitlistedGamesWithImages);

    setIsLoading(false);
  };

  const handleStarClick = (index: number) => {
    const newRating = starRating.map((filled, i) =>
      i <= index ? true : false
    );
    setStarRating(newRating);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Hamburguerbotao />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="tborchidpink">
        <IonGrid>
          <IonRow>
            <IonCol className="profile-header" size="12">
              <IonAvatar className="profile-avatar">
                <img
                  alt="Silhouette of a person's head"
                  src="https://ionicframework.com/docs/img/demos/avatar.svg"
                />
              </IonAvatar>
              <div className="user-name">USUARIO</div>
              <div className="user-rating">
                {starRating.map((filled, index) => (
                  <IonIcon
                    key={index}
                    icon={filled ? star : starOutline}
                    onClick={() => handleStarClick(index)}
                  />
                ))}
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <div className="list-title">MAIS POPULARES</div>
              <Swiper
                autoplay={{
                  delay: 1400,
                  disableOnInteraction: false, // Ensure autoplay does not stop on user interaction
                }}
                centeredSlides={true}
                spaceBetween={30}
                slidesPerView={2}
                pagination={{ clickable: true, dynamicBullets: true }}
                modules={[Autoplay, Pagination]}
              >
                {mostPopularGames.map((game) => (
                  <SwiperSlide key={game.id}>
                    <div className="swiper-slide-content">
                      <img src={game.boxart} alt={game.title} />
                      <p>{game.title}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <div className="list-title">MAIS COLETADOS</div>
              <Swiper
                autoplay={{
                  delay: 1400,
                  disableOnInteraction: false, // Ensure autoplay does not stop on user interaction
                }}
                centeredSlides={true}
                spaceBetween={30}
                slidesPerView={2}
                pagination={{ clickable: true, dynamicBullets: true }}
                modules={[Autoplay, Pagination]}
              >
                {mostCollectedGames.map((game) => (
                  <SwiperSlide key={game.id}>
                    <div className="swiper-slide-content">
                      <img src={game.boxart} alt={game.title} />
                      <p>{game.title}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12">
              <div className="list-title">MAIS AGUARDADOS</div>
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
                    <div className="swiper-slide-content">
                      <img src={game.boxart} alt={game.title} />
                      <p>{game.title}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1perfil;
