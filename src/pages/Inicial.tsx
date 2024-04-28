import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonToolbar,
  IonTitle
} from "@ionic/react";
import Hamburguerbotao from "../components/hamburguerbotao";
import { getDeals } from "../services/api";

const Inicial: React.FC = () => {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchDeals = async () => {
      const data = await getDeals();
      console.log("Fetched data:", data);
      if (data) {
        setDeals(data);
      }
    };

    fetchDeals();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <Hamburguerbotao />
        </IonToolbar>
      </IonHeader>
      <IonContent color={"dark"} className="ion-padding">
        {deals.map((deal) => (
          <IonCard key={deal.id} color={"success"} className="ion-padding">
            <IonText color={'dark'}>
              <h2>{deal.title}</h2>
              <p>{deal.deal.historyLow.amount}</p>
              <p>Price: ${deal.deal.price.amount} (Regular: ${deal.deal.regular.amount})</p>
              <p>Store: {deal.deal.shop.name}</p>
            </IonText>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Inicial;
