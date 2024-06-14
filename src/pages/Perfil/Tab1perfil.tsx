import {
  IonAvatar,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";

import Hamburguerbotao from "../../components/hamburguerbotao";
import { starOutline, star, personCircleOutline } from "ionicons/icons";
import {
  getMostPopularGames,
  getMostCollectedGames,
  getMostWaitlistedGames,
  getGameBoxart,
  getGameInfo,
} from "../../services/api";
import "./perfil.css";

import "../../components/tabs.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/pagination";
import SwiperCore from "swiper";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { auth } from "../../services/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import ImageUploader from "../../components/ImageUploader";

// Install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay]);

const Tab1perfil: React.FC = () => {
  // Obtenha o usuário autenticado do contexto de autenticação
  /* const [user] = useAuthState(auth); // Obtém o usuário autenticado do hook useAuthState */

  const [user, setUser] = useState<any>(null);
  const [registrationDate, setRegistrationDate] = useState<string>("");
  const [lastLoginDate, setLastLoginDate] = useState<string>("");
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
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  // Use a foto de perfil do usuário autenticado como imagem inicial

  useEffect(() => {
    const imageUrl = localStorage.getItem("profileImageUrl");
    if (imageUrl) {
      setProfileImageUrl(imageUrl);
    }
    fetchData();
    getUserInfo();
  }, []);

  const getUserInfo = () => {
    const user = auth.currentUser;
    if (user) {
      setUser(user);
      setRegistrationDate(user.metadata.creationTime);
      setLastLoginDate(user.metadata.lastSignInTime);
    }
  };
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
  const handleImageSelected = (imageUrl: string) => {
    localStorage.setItem("profileImageUrl", imageUrl); // Armazena a URL da imagem no armazenamento local
    setProfileImageUrl(imageUrl);
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
                {profileImageUrl ? (
                  <img src={profileImageUrl} alt="Profile" />
                ) : (
                  <IonIcon icon={personCircleOutline} />
                )}
              </IonAvatar>
              {!profileImageUrl && (
                <ImageUploader onImageSelected={handleImageSelected} />
              )}
              <div className="user-name">{user ? user.displayName : ""}</div>
              <div className="user-email">{user ? user.email : ""}</div>
              <div className="user-rating">
                {starRating.map((filled, index) => (
                  <IonIcon
                    key={index}
                    icon={filled ? star : starOutline}
                    onClick={() => handleStarClick(index)}
                  />
                ))}
              </div>
              <div className="user-email">
                <IonText>
                  Data de Registro
                  <br /> {registrationDate}
                </IonText>
                <br />
                <IonText>
                  Último Login <br />
                  {lastLoginDate}
                </IonText>
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="colunapop">
              <div className="list-title">MAIS POPULARES</div>
              <Swiper
                autoplay={{
                  delay: 1400,
                  disableOnInteraction: false, // Ensure autoplay does not stop on user
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
            <IonCol size="12" className="colunapop">
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
            <IonCol size="12" className="colunapop">
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
