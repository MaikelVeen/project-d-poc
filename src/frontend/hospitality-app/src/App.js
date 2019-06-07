import React from 'react';
import {Route} from 'react-router-dom';
import {MainLayout} from './MainLayout.js';
import {Layout} from './Layout.js';

// Online reservation
import {Home} from './pages/home/Home.js';
import {Reservation} from './components/Reservation.js';
import {ConfirmRegistration} from './components/ConfirmRegistration.js';

// Check in
import {Lobby} from './components/Lobby.js';
import {Checkin} from './components/Checkin.js';
import {RegisterFace} from './components/RegisterFace.js';
// import {Online} from './components/Online.js';

// Hotel room
import {Hotelroom} from './pages/room/Hotelroom.js';

function App() {
  return (
    <MainLayout>
      <Route path='/' exact component={Home}/>
      
      <Route path='/lobby' component={Lobby}/>
      <Route path='/check-in' component={Checkin}/>
      <Route path='/reservation' component={Reservation}/>
      <Route path='/register-face' component={RegisterFace}/>
      <Route path='/confirm-registration' component={ConfirmRegistration}/>

      <Route path='/hotelroom' component={Hotelroom}/>
    </MainLayout>
  );
}

export default App;
