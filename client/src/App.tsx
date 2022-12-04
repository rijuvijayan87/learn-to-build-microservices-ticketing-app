import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './pages/header';
import Login from './pages/login';
import NewAccount from './pages/new-account';
import Tickets from './pages/tickets';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/create' element={<NewAccount />} />
        <Route path='/tickets' element={<Tickets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
