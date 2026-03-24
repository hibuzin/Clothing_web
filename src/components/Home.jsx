import React, { useState } from "react";
import TabsBar from "./TabsBar";
import Banner from "./Banner";
import BestItems from "./BestItems";
import TrendingSection from "./TrendingSection";
import AllProductsSection from "./AllProductsSection";
import SearchBar from "./SearchBar";
import BottomNav from "./BottomNav";

function HomePage() {

  return (
    <>
      <SearchBar />
      <TabsBar />
      <Banner />
      <BestItems/>
      <TrendingSection/>
      <AllProductsSection  />
      <BottomNav/>
    </>
  );
}

export default HomePage;