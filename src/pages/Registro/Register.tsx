// src/pages/Register.js
import React, { useState } from "react";
import {
  IonButton,
  IonContent,
  IonFooter,
  IonIcon,
  IonInput,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonText,
  IonTitle,
  IonToast,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import { checkboxOutline, logoGoogle } from "ionicons/icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/FirebaseConfig";
import "./Register.css";

import { isValidCEP, formatCEP } from "@brazilian-utils/brazilian-utils";

import { isValidCPF, formatCPF } from "@brazilian-utils/brazilian-utils";
import { isBefore, parse } from "date-fns";
const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const [present, dismiss] = useIonLoading();
  const router = useIonRouter();

  const DoRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    console.log("Email:", email);
    console.log("Senha:", password);
    console.log("Confirmação de senha:", confirmPassword);

    if (password !== confirmPassword) {
      showToastMessage("As senhas não coincidem");
      return;
    }

    if (!isValidCPF(cpf)) {
      showToastMessage("CPF inválido");
      return;
    }

    if (!isValidCEP(cep)) {
      showToastMessage("CEP inválido");
      return;
    }

    const today = new Date();
    const birthdateDate = new Date(birthdate);
    let age = today.getFullYear() - birthdateDate.getFullYear();

    if (today < new Date(today.setFullYear(today.getFullYear() - age))) {
      age--;
    }

    if (age < 18) {
      showToastMessage("Você deve ter mais de 18 anos para se registrar");
      return;
    }

    await present("Finalizando Registro...");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      dismiss();
      showToastMessage("Registro realizado com sucesso.");
      router.push("/menu", "root");
    } catch (error) {
      console.error("Erro ao registrar:", error);
      showToastMessage("Erro ao registrar.");
      dismiss();
    }
  };

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleCPFInput = (event: React.FormEvent<HTMLIonInputElement>) => {
    const target = event.target as HTMLIonInputElement;
    let cpfValue = target.value as string;

    // Removendo todos os caracteres não numéricos
    cpfValue = cpfValue.replace(/\D/g, "");

    // Validando e formatando o CPF
    if (isValidCPF(cpfValue)) {
      const formattedCPF = formatCPF(cpfValue);
      setCpf(formattedCPF);
      showToastMessage("CPF válido");
    } else {
      setCpf(cpfValue);
      showToastMessage("CPF inválido");
    }
  };

  const handleCEPInput = (event: React.FormEvent<HTMLIonInputElement>) => {
    const target = event.target as HTMLIonInputElement;
    let cepValue = target.value as string;

    // Removendo todos os caracteres não numéricos
    cepValue = cepValue.replace(/\D/g, "");

    setCep(cepValue);

    if (isValidCEP(cepValue)) {
      const formattedCEP = formatCEP(cepValue);
      setCep(formattedCEP);
      showToastMessage("CEP válido");
    } else {
      setCep(cepValue);
      showToastMessage("CEP inválido");
    }
  };

  return (
    <IonPage>
      <IonContent className="background ion-padding"  fullscreen>
        <div className="ion-padding ion-text-center">
          <img
            src="assets/new pink.svg"
            width={119}
            height={139}
            alt="logo"
            className="logoimg"
          />
        </div>
        <div className="ion-padding ion-text-center">
          <IonText color="tbpurple">Registro</IonText>
        </div>
        <form onSubmit={DoRegister}>
          <IonInput
            className="ion-margin-top"
            fill="outline"
            label="Email"
            labelPlacement="floating"
            placeholder="E-mail..."
            required
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
            minlength={6}
            maxlength={6}
            required
            type="password"
            name="password"
            value={password} // Adicionando value ao campo de senha
            onIonChange={(e) => setPassword(e.detail.value!)} // Atualizando o estado password
          />

          <IonInput
            className="ion-margin-top"
            fill="outline"
            label="Confirme a senha"
            labelPlacement="floating"
            placeholder="Senha..."
            minlength={6}
            maxlength={6}
            required
            type="password"
            name="confirmPassword"
            value={confirmPassword} // Adicionando value ao campo de confirmação de senha
            onIonChange={(e) => setConfirmPassword(e.detail.value!)} // Atualizando o estado confirmPassword
          />
          <IonInput
            className="ion-margin-top"
            fill="outline"
            label="CPF"
            id="cpf"
            name="cpf"
            minlength={14}
            maxlength={14}
            labelPlacement="floating"
            placeholder="CPF"
            value={cpf} // Adicionando value ao campo de CPF
            onInput={handleCPFInput} // Usando onIonInput para manipular a entrada de CPF
            type="text" // Mudando para type="text" para permitir a formatação
            required
          />
          <IonInput
            className="ion-margin-top"
            fill="outline"
            label="Data de nascimento"
            labelPlacement="floating"
            placeholder="Data de nascimento"
            type="date"
            required
          />

          <div color={"tbwhite"} className="ion-margin-top bordagen">
            <IonTitle
              className="ion-text-center ion-padding"
              color={"tborchidpink"}
            >
              Gênero
            </IonTitle>
            <IonRadioGroup value="custom-checked" className="radio-visible">
              <IonRadio
                slot="end"
                color="tborchidpink"
                value="Masculino"
                labelPlacement="fixed"
                justify="space-between"
                className="radio-container"
              >
                <IonText color={"primary"}>Masculino</IonText>
              </IonRadio>
              <br />
              <IonRadio
                slot="end"
                color="tborchidpink"
                value="Feminino"
                labelPlacement="fixed"
                justify="space-between"
                aria-label="Custom checkbox"
                className="radio-container"
              >
                <IonText color={"primary"}> Feminino</IonText>
              </IonRadio>
              <br />
              <IonRadio
                color="tborchidpink"
                value="Outros"
                labelPlacement="fixed"
                justify="space-between"
                className="radio-container"
              >
                <IonText color={"primary"}>Outros</IonText>
              </IonRadio>
              <br />
            </IonRadioGroup>
          </div>
          <div color={"tbwhite"} className="ion-margin-top">
            <IonTitle className="ion-text-center" color={"tborchidpink"}>
              Endereço
            </IonTitle>
            <IonInput
              className="ion-margin-top"
              fill="outline"
              label="CEP"
              value={cep}
              onInput={handleCEPInput}
              labelPlacement="floating"
              placeholder="CEP"
              type="text"
              minlength={8}
              maxlength={8}
            />
          </div>

          <IonButton
            color={"tborchidpink"}
            expand="block"
            type="submit"
            className="ion-margin-bottom ion-margin-top"
          >
            <IonText color={"dark"}>Registrar</IonText>
            <IonIcon icon={checkboxOutline} color="dark" slot="end"></IonIcon>
          </IonButton>
        </form>
        <IonButton
          color={"primary"}
          expand="block"
          fill="clear"
          routerLink="/"
          className="ion-margin-bottom ion-margin-top ion-text-center"
        >
          Retornar
        </IonButton>

        <div className="ion-text-center ion-justify-content-center ion-margin-top">
          <IonText className="" color={"tborchidpink"}>
            Ao clicar em registrar, você aceita nossos Termos de serviço e
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

export default Register;
