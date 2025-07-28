"use client"
// Components
import EbayPriceCalculator from "./components/EbayPriceCalculator";
import BCVCalculator from "./components/bcvCalculator/BCVCalculator";
import CalculateMarkers from "./components/CalculateMarkers";
import Link from "next/link";

export default function Home() {
  return (
    <main className=" dark:bg-slate-900 dark:text-slate-300 p-5 h-full gap-2 flex flex-col">
      {/* Form Container */}
      <BCVCalculator />
      <div className="shadow-md p-5 bg-slate-100 rounded-md m-5 border
        dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 flex flex-col gap-2
        hover:cursor-pointer"
      >
        <Link href="/dealermargins">Dealer Margins</Link>
      </div>
      {/* Markers Component */}
      <CalculateMarkers />
      {/* Ebay Calculator */}
      <EbayPriceCalculator />
    </main>
  );
}
