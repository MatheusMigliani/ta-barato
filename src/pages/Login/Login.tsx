import React, {  useState } from "react";
import {
  IonButton,
  IonContent,
  IonPage,
  IonText,
  IonInput,
  IonIcon,
  useIonLoading,
  IonToast,
  useIonRouter,
} from "@ionic/react";
import { logoGoogle } from "ionicons/icons";
import { auth } from "../../services/FirebaseConfig";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import "./Login.css";

// Crie um contexto para o hook useAuth


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const router = useIonRouter();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [present, dismiss] = useIonLoading();

  const DoLogin = async (event: any) => {
    event.preventDefault();

    const password = event.target.password.value;

    console.log("Email:", email);
    console.log("Senha:", password);

    present("Fazendo Login...");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      dismiss();
      showToastMessage("Login realizado com sucesso.");
      router.push("/menu", "root");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      dismiss();
      showToastMessage(
        "Erro ao fazer login. Verifique suas credenciais e tente novamente."
      );
    }
  };

  const DoGoogleLogin = async () => {
    present("Fazendo Login com Google...");
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      dismiss();
      router.push("/menu", "root");
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
      dismiss();
      showToastMessage("Erro ao fazer login com o Google.");
    }
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  return (
    <IonPage className="">
      <IonContent className="background ion-padding" color={"dark"} fullscreen>
        <div className="login-container ion-text-center ion-align-items-center ion-align-self-center ion">
          <img
            src="assets/new pink.svg"
            width={119}
            height={139}
            alt="logo"
            className="logoimg"
          />
          <form onSubmit={DoLogin}>
            <IonInput
              className="login-container ion-text-center"
              fill="outline"
              label="Email"
              labelPlacement="floating"
              placeholder="E-mail..."
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            />
            <IonInput
              className="ion-margin-top"
              fill="outline"
              label="Senha"
              labelPlacement="floating"
              placeholder="Senha..."
              type="password"
              name="password"
            />
            <IonButton
              color={"tborchidpink"}
              expand="block"
              type="submit"
              className="ion-margin-bottom ion-margin-top"
            >
              <IonText color={"dark"}>Entrar</IonText>
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
          <IonText color={"tborchidpink"} className="ion-margin-bottom">
            Ou continue com o
          </IonText>
          <IonButton
            color={"tborchidpink"}
            expand="block"
            fill="outline"
            onClick={DoGoogleLogin}
          >
            <IonIcon slot="start" icon={logoGoogle} />
            Google
          </IonButton>
          <IonText color={"tborchidpink"} className="ion-margin-top">
            Ao clicar em continuar, você aceita nossos Termos de serviço e
            Privacidade.
          </IonText>
        </div>

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

export default Login;
