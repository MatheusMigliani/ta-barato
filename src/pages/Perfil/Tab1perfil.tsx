import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSkeletonText,
  IonText,
  IonToast,
  IonToolbar,
  useIonLoading,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import Hamburguerbotao from "../../components/hamburguerbotao";
import {
  starOutline,
  star,
  personCircleOutline,
  arrowDownCircleOutline,
} from "ionicons/icons";
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

const Skeleton: React.FC = () => (
  <>
    <IonSkeletonText animated style={{ width: "100%", height: "100%" }} />
  </>
);

const Tab1perfil: React.FC = () => {
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
  const [present, dismiss] = useIonLoading();
  const [showChangeButton, setShowChangeButton] = useState<boolean>(false);

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
    present("Carregando Dados");

    try {
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
      dismiss();
      showToastMessage("Página carregada com sucesso.");
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setIsLoading(false);
      dismiss();
      showToastMessage("Erro ao carregar página. Tente novamente mais tarde.");
    }
  };

  const handleRefresh = (event: CustomEvent) => {
    fetchData();
    setTimeout(() => {
      event.detail.complete();
    }, 2000); // Simula um atraso de 1 segundo para demonstração
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
    setShowChangeButton(true); // Mostra o botão de troca
  };

  const handleRemoveImage = () => {
    localStorage.removeItem("profileImageUrl");
    setProfileImageUrl(null);
    setShowChangeButton(false); // Esconde o botão de troca
  };
  const handleShowChangeButton = () => {
    setShowChangeButton(true); // Mostra o botão de troca
  };
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Hamburguerbotao />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen color="tborchidpink">
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
              refreshingSpinner="lines"
              refreshingText="Atualizando..."
            />
          </IonRefresher>
        </div>
        <IonGrid>
          <IonRow>
            <IonCol className="profile-header" size="12">
              <IonAvatar className="profile-avatar">
                {isLoading ? (
                  <Skeleton />
                ) : profileImageUrl ? (
                  <img src={profileImageUrl} alt="Profile" />
                ) : (
                  <IonIcon icon={personCircleOutline} />
                )}
              </IonAvatar>
              {showChangeButton && (
                <ImageUploader onImageSelected={handleImageSelected} />
              )}
              {!profileImageUrl && !showChangeButton && (
                <IonButton onClick={handleShowChangeButton}>
                  Trocar Foto
                </IonButton>
              )}
              <div className="user-name">
                {isLoading ? <Skeleton /> : user ? user.displayName : ""}
              </div>
              <div className="user-email">
                {isLoading ? <Skeleton /> : user ? user.email : ""}
              </div>
              <div className="user-rating">
                {starRating.map((filled, index) => (
                  <IonIcon
                    key={index}
                    icon={isLoading ? starOutline : filled ? star : starOutline}
                    onClick={() => handleStarClick(index)}
                  />
                ))}
              </div>
              <div className="user-dates">
                <IonText>
                  Data de Registro: <br />
                  {isLoading ? <Skeleton /> : registrationDate}
                </IonText>
                <br />
                Último Login: <br />
                {isLoading ? <Skeleton /> : lastLoginDate}
              </div>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="colunapop">
              <div className="list-title">MAIS POPULARES</div>
              <Swiper
                autoplay={{ delay: 1400, disableOnInteraction: false }}
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
                autoplay={{ delay: 1400, disableOnInteraction: false }}
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
                autoplay={{ delay: 1400, disableOnInteraction: false }}
                centeredSlides={true}
                spaceBetween={30}
                slidesPerView={2}
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

export default Tab1perfil;
