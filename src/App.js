import React from 'react';
import { Reset } from 'styled-reset';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Home, Login, Cadastro } from './pages';

const App = () => {

  return (
    <Router>
      <Reset />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Cadastro />} />
      </Routes>
    </Router>
  );

}

export default App;
