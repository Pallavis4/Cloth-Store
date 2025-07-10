import React, { useState , useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "./WishlistContext";
import Header from './Header';
import HomePage from "./HomePage";
import AboutPage from './AboutPage';
import MenPage from './MenPage';
import WomenPage from './WomenPage';
import Signup from './Signup';
import Login from './Login';
import CartPage from './CartPage';
import BodyconDressesPage from './BodyconDressesPage';
import CorsetPage from "./CorsetPage";

import WishlistPage from "./WishlistPage";
import KurtiPage from "./KurtiPage";
import SareePage from "./SareePage";
import OffShoulderTopPage from './OffShoulderTopPage';
import JeansPage from './JeansPage';
import PantsPage from './PantsPage';
import GymPage from './GymPage';

function App() {
  const [cart, setCart] = useState(()=> {
    const savedCart = sessionStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);


  const handleRemoveFromCart = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
  };
  

  return (
    <WishlistProvider>
      <Router>
        <Header cart={cart} />
        <Routes>
          <Route path="/" element={<HomePage cart={cart} setCart={setCart} />} />
          <Route path="/homepage" element={<HomePage cart={cart} setCart={setCart} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/men" element={<MenPage cart={cart} setCart={setCart} />} />
          <Route path="/women" element={<WomenPage cart={cart} setCart={setCart} />} />
         

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />

          <Route path="/bodycon-dresses" element={<BodyconDressesPage cart={cart} setCart={setCart}  />} />
          <Route path="/corset" element={<CorsetPage cart={cart} setCart={setCart} />} />
         
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/kurti" element={<KurtiPage cart={cart} setCart={setCart}   />} />
          <Route path="/saree" element={<SareePage cart={cart} setCart={setCart}   />} />
          <Route path="/off-shoulder-tops" element={<OffShoulderTopPage cart={cart} setCart={setCart}   />} />
          <Route path="/jeans" element={<JeansPage cart={cart} setCart={setCart}   />} />
          <Route path="/pants" element={<PantsPage cart={cart} setCart={setCart}   />} />
         
          <Route path="/gymwear" element={<GymPage cart={cart} setCart={setCart}   />} />


        </Routes>
      </Router>
    </WishlistProvider>
  );
}

export default App;
