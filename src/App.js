import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Manage from './Components/Home/Manage';
import { CartProvider } from 'react-use-cart';

function App() {
  return (
    <CartProvider>
    <BrowserRouter>
        <Routes>
          {/* <Route exact path="/" Component={SignIn} /> */}
          <Route exact path="/" Component={Manage} />
          {/* <Route exact path="/login" Component={Login} /> */}
          <Route exact path="/manage" Component={Home} />
        </Routes>
    </BrowserRouter>
    </CartProvider>

  );
}

export default App;
