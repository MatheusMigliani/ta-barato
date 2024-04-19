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
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import { checkboxOutline,  logoGoogle } from "ionicons/icons";
import React from "react";
import "./Register.css";

const Register: React.FC = () => {
  const [present, dismiss] = useIonLoading();

  const router = useIonRouter();

  const DoRegister = async (event: any) => {
    event.preventDefault();
    await present("Finalizando Registro...");
    setTimeout(async () => {
      dismiss();
      router.push("/menu", "root");
    }, 2);
    console.log("DoRegister");
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
        <form onSubmit={DoRegister}>
          <IonInput
            className="custom-input ion-margin-top"
            fill="outline"
            label="Usuario"
            labelPlacement="floating"
            placeholder="Usuario"
            type="text"
          />
          <IonInput
            className="custom-input ion-margin-top"
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

          <div color={"tbwhite"} className="ion-margin-top bordagen">
            <IonTitle className="ion-text-center ion-padding" color={"tbpink"}>
              Gênero
            </IonTitle>
            <IonRadioGroup value="custom-checked" className="radio-visible">
              <IonRadio
                slot="end"
                color="tbpink"
                value="Masculino"
                labelPlacement="fixed"
                justify="space-between"
                className="radio-container"
              >
                <IonText>Masculino</IonText>
              </IonRadio>
              <br />
              <IonRadio
                slot="end"
                color="tbpink"
                value="Feminino"
                labelPlacement="fixed"
                justify="space-between"
                aria-label="Custom checkbox"
                className="radio-container"
              >
                <IonText>Feminino</IonText>
              </IonRadio>
              <br />
              <IonRadio
                color="tbpink"
                value="Outros"
                labelPlacement="fixed"
                justify="space-between"
                className="radio-container"
              >
                <IonText>Outros</IonText>
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
            type="submit"
            className="ion-margin-bottom ion-margin-top"
          >
            <IonText color={"dark"}>Registrar</IonText>
            
            <IonIcon icon={checkboxOutline} color="dark" slot="end"></IonIcon>
          </IonButton>
        </form>
        <IonButton
          color={"light"}
          expand="block"
          fill="clear"
          routerLink="/"
          className="ion-margin-bottom ion-margin-top ion-text-center"
        >
          Retornar
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
