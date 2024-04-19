import {
  IonButton,
  IonCard,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import "./Login.css";
import { logoGoogle } from "ionicons/icons";
import { logInOutline } from "ionicons/icons";

const Login: React.FC = () => {
  const [present, dismiss] = useIonLoading();

  const router = useIonRouter();

  const DoLogin = async (event: any) => {
    event.preventDefault();
    await present("Fazendo Login...");
    setTimeout(async () => {
      dismiss();
      router.push("/menu", "root");
    }, 200);
    console.log("DoLogin");
  };

  return (
    <IonPage className="">
      <IonContent className="background ion-padding" color={"dark"} fullscreen>
        <div className="ion-padding ion-text-center ">
          <img
            src="assets/TA BARATO no name.svg"
            width={119}
            height={139}
            alt="logo"
            className="logoimg"
          />
        </div>
        <div className="ion-padding ion-text-center ">
          <IonText color="tbpurple">Login</IonText>
        </div>
        <form onSubmit={DoLogin}>
          <IonInput
            className="ion-margin-top"
            fill="outline"
            label="Email"
            labelPlacement="floating"
            placeholder="E-mail..."
            type="email"
          />

          <IonInput
            className="ion-margin-top"
            fill="outline"
            label="Senha"
            labelPlacement="floating"
            placeholder="Senha..."
            type="password"
          />
          <IonButton
            color={"tbpink"}
            expand="block"
            type="submit"
            className="ion-margin-bottom ion-margin-top"
          >
            <IonText color={"dark"}>Entrar</IonText>

            <IonIcon icon={logInOutline} color="dark" slot="end"></IonIcon>
          </IonButton>
        </form>
        <IonButton
          color={"light"}
          expand="block"
          fill="clear"
          routerLink="/register"
          className="ion-margin-bottom ion-margin-top ion-text-center"
        >
          Clique aqui para se Registrar
        </IonButton>
        <div className="ion-text-center ion-justify-content-center ion-margin-bottom">
          <IonText
            color={"tbpink"}
            className="ion-text-center ion-justify-content-center"
          >
            Ou continue com o
          </IonText>
        </div>

        <IonButton color={"tbpink"} expand="block" fill="outline">
          <IonIcon slot="start" icon={logoGoogle} />
          Google
        </IonButton>
        <div className="ion-text-center ion-justify-content-center ion-margin-top">
          <IonText className="" color={"tbpink"}>
            Ao clicar em continuar, você aceita nossos Termos de serviço e
            Privacidade.
          </IonText>
        </div>
      </IonContent>
      <IonFooter color="tbpink">@M1gliani</IonFooter>
    </IonPage>
  );
};

export default Login;