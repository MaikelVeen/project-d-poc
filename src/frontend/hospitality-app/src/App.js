import React from 'react';
import {Route} from 'react-router-dom';
import {MainLayout} from './MainLayout.js';

// Online reservation
import {Home} from './Components/Home.js';
import {Reservation} from './Components/Reservation.js';
import {ConfirmRegistration} from './Components/ConfirmRegistration.js';

// Check in
import {Lobby} from './Components/Lobby.js';
import {Checkin} from './Components/Checkin.js';
import {RegisterFace} from './Components/RegisterFace.js';
// import {Online} from './Components/Online.js';

// Hotel room
import {Hotelroom} from './Components/Hotelroom.js';

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
