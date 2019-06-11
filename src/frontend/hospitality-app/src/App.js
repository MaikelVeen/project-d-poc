import React from "react";
import { Route } from "react-router-dom";
import { MainLayout } from "./MainLayout.js";

// Pages
import { Home } from "./pages/home/Home.js";
import { Lobby } from "./pages/lobby/Lobby.js";
import { Hotelroom } from "./pages/room/Hotelroom.js";
import { Online } from "./pages/online/Online.js";

// Components
import { Reservation } from "./components/Reservation.js";
import { ConfirmRegistration } from "./components/ConfirmRegistration.js";
import { Checkin } from "./components/Checkin.js";
import { RegisterFace } from "./components/RegisterFace.js";

function App() {
  return (
    <MainLayout>
      <Route path="/" exact component={Home} />

      <Route path="/online" component={Online} />
      <Route path="/lobby" component={Lobby} />
      <Route path="/hotelroom" component={Hotelroom} />

      <Route path="/check-in" component={Checkin} />
      <Route path="/reservation" component={Reservation} />
      <Route path="/register-face" component={RegisterFace} />
      <Route path="/confirm-registration" component={ConfirmRegistration} />
    </MainLayout>
  );
}

export default App;
