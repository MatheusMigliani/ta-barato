import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonPage,
  IonText,
  IonInput,
  IonIcon,
  IonToast,
  useIonLoading,
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
      <IonContent className="background ion-padding"  fullscreen>
        <div className="login-container ion-text-center">
          <img
            src="assets/new pink.svg"
            width={119}
            height={139}
            alt="logo"
            className="logoimg"
          />
          <form onSubmit={DoLogin}>
            <IonInput
              className="input-field"
              fill="outline"
              label="Email"
              labelPlacement="floating"
              placeholder="E-mail..."
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            />
            <IonInput
              className="input-field"
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
              className="submit-button"
            >
              <IonText color={"dark"}>Entrar</IonText>
            </IonButton>
          </form>
          <IonButton
            
            expand="block"
            fill="clear"
            routerLink="/register"
            className="register-container"
          >
            Clique aqui para se Registrar
          </IonButton>
          <IonText color={"tborchidpink"} className="or-divider">
            Ou continue com o
          </IonText>
          <IonButton
            color={"tborchidpink"}
            expand="block"
            fill="outline"
            onClick={DoGoogleLogin}
            className="google-login-button"
          >
            <IonIcon slot="start" icon={logoGoogle} />
            Google
          </IonButton>
          <IonText color={"tborchidpink"} className="terms-text">
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
