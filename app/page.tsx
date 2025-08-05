"use client"
// Components
import EbayPriceCalculator from "./components/EbayPriceCalculator";
import BCVCalculator from "./components/bcvCalculator/BCVCalculator";
import CalculateMarkers from "./components/CalculateMarkers";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleGoTo = (url: string): void => {
    console.log(url, 'this it the url boi');

    router.push(url);
  };

  return (
    <main className=" dark:bg-slate-900 dark:text-slate-300 md:p-5 pb-10
         gap-2 flex flex-col">
      {/* Form Container */}
      <BCVCalculator />
      <div className="shadow-md p-5 bg-slate-100 rounded-md m-5 border
        dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 flex flex-col md:flex-row md:justify-around gap-2"
      >
        <button className="border border-slate-500 bg-slate-700
            dark:border-slate-600 dark:bg-slate-800
            rounded p-2 hover:cursor-pointer hover:bg-slate-600 hover:scale-105
            active:scale-90 transition-transform duration-100"
          onClick={() => handleGoTo("/dealermargins")}
        >
          <span>Dealer Margins</span>
        </button>

        <button className="border border-slate-500 bg-slate-700
            dark:border-slate-600 dark:bg-slate-800
            rounded p-2 hover:cursor-pointer hover:bg-slate-600 hover:scale-105
            active:scale-90 transition-transform duration-100"
          onClick={() => handleGoTo("/spreads")}
        >
          <span>Spreads</span>
        </button>
      </div>
      {/* Markers Component */}
      <CalculateMarkers />
      {/* Ebay Calculator */}
      <EbayPriceCalculator />
    </main>
  );
}
