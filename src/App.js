import React from 'react';
import { Reset } from 'styled-reset';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { Home, Login, Cadastro, NotFound, BookLove } from './pages';
import { ProvaiderAuth,PrivateRouter } from "./components"

const App = () => {

  return (
    <ProvaiderAuth>
      <Reset />
      <Router>
          <Routes>
            <Route path="/" index element={ <BookLove /> } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Cadastro />} />
            <Route path="/home" element={<PrivateRouter pathRedirect="/login"> <Home /> </PrivateRouter> } />
            <Route path="*" element={ <NotFound /> } />
          </Routes>
      </Router>
    </ProvaiderAuth>
  );

}

export default App;
