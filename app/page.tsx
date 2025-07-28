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
      <div className="border rounded bg-slate-900 text-white m-5 p-4">
        <Link href="/dealermargins">Dealer Margins</Link>
      </div>
      {/* Markers Component */}
      <CalculateMarkers />
      {/* Ebay Calculator */}
      <EbayPriceCalculator />
    </main>
  );
}
