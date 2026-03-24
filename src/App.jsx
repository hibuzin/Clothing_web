import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Men from "./pages/Men";
import Women from "./pages/Women";
import Boys from "./pages/Boys";
import Girls from "./pages/Girls";
import ProductDetail from "./pages/ProductDetail";
import MyAccount from "./pages/MyAccount";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import SearchPage from "./pages/SearchPage";
import HomePage from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/men" element={<Men />} />
        <Route path="/women" element={<Women />} />
        <Route path="/boys" element={<Boys />} />
        <Route path="/girls" element={<Girls />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;