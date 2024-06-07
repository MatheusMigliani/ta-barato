import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  useIonRouter,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Login from "./pages/Login/Login";
import Register from "./pages/Registro/Register";
import Home from "./pages/Menu/Menu";
import Inicial from "./pages/Inicial/Inicial";
import Settings from "./pages/Settings/Settings";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Menu from "./pages/Menu/Menu";
import Trending from "./pages/Inicial/Trending";
import Ofertas from "./pages/Inicial/Ofertas";
import { getRedirectResult } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "./services/FirebaseConfig";
import { DarkModeProvider } from "./components/darkmodecontext";

setupIonicReact();

const App: React.FC = () => (
  <DarkModeProvider>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/">
            <Login />
          </Route>
          <Route component={Register} path="/register" exact />
          <Route path="/login">
            <Login />
          </Route>
          <Route component={Menu} path="/menu" />
          <Route component={Trending} path="/Trending" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </DarkModeProvider>
);

export default App;
