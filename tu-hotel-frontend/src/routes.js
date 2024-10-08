// src/routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import HotelList from './components/Hotels/HotelList';
import HotelDetail from './components/Hotels/HotelDetail';
import MyReservations from './components/Reservations/MyReservations';
import Navbar from './components/Navbar';

function Routes() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/hotels" component={HotelList} />
        <Route path="/hotel/:id" component={HotelDetail} />
        <Route path="/reservations" component={MyReservations} />
      </Switch>
    </Router>
  );
}

export default Routes;
