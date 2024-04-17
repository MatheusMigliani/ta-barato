import {
  IonButton,
  IonCard,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { logInOutline, logoGoogle } from "ionicons/icons";
import React from "react";

const Register: React.FC = () => {
  const DoLogin = (event: any) => {
    event.preventDefault();
    console.log("DoLogin");
  };

  return (
    <IonPage className="">
      <IonContent className="background ion-padding" color={"dark"} fullscreen>
        <div className="ion-padding ion-text-center">
          <img
            src="assets/TA BARATO no name.svg"
            width={119}
            height={139}
            alt="logo"
            className="logoimg"
          />
        </div>
        <div className="ion-padding ion-text-center ">
          <IonText color="tbpurple">Registro</IonText>
        </div>
        <form onSubmit={DoLogin}>
          <IonInput
            className="ion-margin-top"
            fill="outline"
            label="Usuario"
            labelPlacement="floating"
            placeholder="Usuario"
            type="text"
          />
          <IonInput
            className="ion-margin-top"
            fill="outline"
            label="Nome Completo"
            labelPlacement="floating"
            placeholder="Nome Completo"
            type="text"
          />
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
          <IonInput
            className="ion-margin-top"
            fill="outline"
            label="Confirme a senha"
            labelPlacement="floating"
            placeholder="Senha..."
            type="password"
          />
          <IonInput
            className="ion-margin-top"
            fill="outline"
            label="CPF"
            labelPlacement="floating"
            placeholder="CPF"
            type="number"
          />
          <IonInput
            className="ion-margin-top"
            fill="outline"
            label="Data de nascimento"
            labelPlacement="floating"
            placeholder="Data de nascimento"
            type="date"
          />

          <div color={"tbwhite"} className="ion-margin-top">
            <IonTitle className="ion-text-center" color={"tbpink"}>
              Gênero
            </IonTitle>
            <IonRadioGroup value="custom-checked">
              <IonRadio
                slot="start"
                color={"tbpink"}
                className="ion-padding ion-toggle"
                value="Masculino"
                labelPlacement="fixed"
                justify="space-between"
              >
                <IonText>Masculino</IonText>
              </IonRadio>
              <br />
              <IonRadio
                slot="en"
                color={"tbpink"}
                className="ion-padding"
                value="Feminino"
                labelPlacement="fixed"
                justify="space-between"
                aria-label="Custom checkbox"
              >
                Feminino
              </IonRadio>
              <br />
              <IonRadio
                color={"tbpink"}
                className="ion-padding"
                value="Outros"
                labelPlacement="fixed"
                justify="space-between"
              >
                Outros
              </IonRadio>
              <br />
            </IonRadioGroup>
          </div>
          <div color={"tbwhite"} className="ion-margin-top">
            <IonTitle className="ion-text-center" color={"tbpink"}>
              Endereço
            </IonTitle>
            <IonInput
              className="ion-margin-top"
              fill="outline"
              label="CEP"
              labelPlacement="floating"
              placeholder="CEP"
              type="text"
            />
            <IonInput
              className="ion-margin-top"
              fill="outline"
              label="Estado"
              labelPlacement="floating"
              placeholder="Estado"
              type="text"
            />
            <IonInput
              className="ion-margin-top"
              fill="outline"
              label="Cidade"
              labelPlacement="floating"
              placeholder="Cidade"
              type="text"
            />
            <IonInput
              className="ion-margin-top"
              fill="outline"
              label="Bairro"
              labelPlacement="floating"
              placeholder="Bairro"
              type="text"
            />
            <IonInput
              className="ion-margin-top"
              fill="outline"
              label="Rua"
              labelPlacement="floating"
              placeholder="Rua"
              type="text"
            />
            <IonInput
              className="ion-margin-top"
              fill="outline"
              label="N°"
              labelPlacement="floating"
              placeholder="N°"
              type="text"
            />
          </div>

          <IonButton
            color={"tbpink"}
            expand="block"
            routerLink="/home"
            type="submit"
            className="ion-margin-bottom ion-margin-top"
          >
            Entrar
            <IonIcon icon={logInOutline} slot="end"></IonIcon>
          </IonButton>
        </form>
        <IonButton
          color={"light"}
          expand="block"
          fill="clear"
          routerLink="/login"
          className="ion-margin-bottom ion-margin-top ion-text-center"
        >
          Login
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

export default Register;
