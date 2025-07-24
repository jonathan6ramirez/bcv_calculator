"use client"
// Components
import EbayPriceCalculator from "./components/EbayPriceCalculator";
import BCVCalculator from "./components/BCVCalculator";
import Navbar from "./components/Navbar";
import CalculateMarkers from "./components/CalculateMarkers";
import MyChart from "./components/Chart";

export default function Home() {
  return (
    <main className=" dark:bg-slate-900 dark:text-slate-300 p-5 h-full gap-2 flex flex-col">
      {/* Form Container */}
      <BCVCalculator />
      {/* Markers Component */}
      <CalculateMarkers />
      {/* Ebay Calculator */}
      <EbayPriceCalculator />
    </main>
  );
}
