import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import CheckIn from '../containers/CheckIn';
import Reservation from '../containers/Reservation'
import HotelRoom from '../containers/HotelRoom';

const DefaultRedirect = () => <Redirect to="/home" />;

// Here we can add routes to different pages (urls)
class RootRouter extends React.Component {
    render() {
        return (
  <BrowserRouter>
  
      <Switch>
        <Route exact path="/" component={DefaultRedirect} />
        <Route exact path="/home" component={Reservation} />
        <Route path="/checkin" component={CheckIn} />
        <Route path="/hotelroom" component={HotelRoom} />
      </Switch>
   
  </BrowserRouter>
        )
    }
}


export default RootRouter;