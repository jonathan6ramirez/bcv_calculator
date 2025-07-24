"use client"
// Components
import EbayPriceCalculator from "./components/EbayPriceCalculator";
import BCVCalculator from "./components/BCVCalculator";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className=" dark:bg-slate-900 dark:text-slate-300 p-5 h-screen">
      {/*Navbar*/}
      <Navbar />
      {/* Form Container */}
      <BCVCalculator />
      {/* Ebay Calculator */}
      <EbayPriceCalculator />
    </main>
  );
}
