import React from 'react';
import { Reset } from 'styled-reset';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { Home, Login, Cadastro, NotFound, BookLove, Profile, Search } from './pages';
import { ProvaiderAuth, PrivateRouter } from "./components"

const App = () => {

  return (
    <ProvaiderAuth>
      <Reset />
      <Router>
          <Routes>
            <Route path="/" index element={<Login />} />
            <Route path="/login" index element={<Login />} />
            {/* <Route path="/"  element={ <BookLove /> } /> */}
            <Route path="/signup" element={<Cadastro />} />
            <Route path="/home" element={<PrivateRouter pathRedirect="/login"> <Home /> </PrivateRouter> } />
            <Route path='/profile' element={ <PrivateRouter pathRedirect="/login"> <Profile title={"profile"}/> </PrivateRouter> } />
            <Route path='/search' element={ <PrivateRouter pathRedirect="/login"> <Search title={"search"} /> </PrivateRouter> } />
            <Route path="*" element={ <NotFound /> } />
          </Routes>
      </Router>
    </ProvaiderAuth>
  );

}

export default App;
