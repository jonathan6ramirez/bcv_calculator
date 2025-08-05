"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Components
import AddCompModal from "./components/Modal";
import DeleteCompModal from "./components/DeleteModal";
import DisplayComps from "./components/DisplayComps";

// Util
import { CalculatedSpreads } from "../types";
import { addCommas, calculateSpreads, removeNonNumeric } from "../util";
import { Form } from "react-bootstrap";

// Types
interface Comp {
  price: number,
  id: string,
};
interface ToBeDeleted {
  id: string
}
interface TargetBuy {
  targetBuy: string,
  cents: string,
  msrp: string
}

export default function Spreads() {
  const router = useRouter();

  const [comps, setComps] = useState<Comp[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [toBeDeleted, setToBeDeleted] = useState<ToBeDeleted>({ id: "" });
  const [buttonsDisabled, setButtonsDisabled] = useState<boolean>(true);

  const [form, setForm] = useState<TargetBuy>({ targetBuy: "", cents: "", msrp: "" });

  const initialSpreads: CalculatedSpreads = {
    avg: 0,
    lowRetail: 0,
    avgTradeIn: 0,
    bcv: 0,
    upside: {
      amount: 0,
      percentage: "0"
    },
    downside: {
      amount: 0,
      percentage: "0"
    },
  };
  const [calculatedSpreads, setCalculatedSpreads] = useState<CalculatedSpreads>(initialSpreads);

  // Helper Function
  function CheckFormValues(type: string) {
    switch (type) {
      case "msrp":
        return (form.cents != "" && form.targetBuy != "" && comps.length > 0);
      case "targetBuy":
        return (form.cents != "" && form.msrp != "" && comps.length > 0);
      case "cents":
        return (form.targetBuy != "" && form.msrp != "" && comps.length > 0);
      case "comp":
        return (form.targetBuy != "" && form.msrp != "" && form.cents);
    }

    return (form.msrp != "" && form.cents != "" && form.targetBuy != "" && comps.length > 0)
  }

  const handleChange = (e: any): void => {
    setForm({
      ...form,
      [e.target.name]: addCommas(removeNonNumeric(e.target.value)),
    });

    if (e.target.value == "" || e.target.value == "0") return setButtonsDisabled(true);
    if (CheckFormValues(e.target.name)) setButtonsDisabled(false);
  }

  const handleCentsDollarChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    if (e.target.value == "") return setButtonsDisabled(true);
    if (CheckFormValues(e.target.name)) setButtonsDisabled(false);
  }

  const handleSubmit = (price: number): void => {
    setComps(prev => [...prev, { price, id: crypto.randomUUID() }]);
    if (form.targetBuy != "" && form.cents != "")
      setButtonsDisabled(false);
  }

  const handleReset = (): void => {
    setButtonsDisabled(true);
    setComps([]);
    setCalculatedSpreads(initialSpreads);
  }

  const handleRemoveComp = (id: string): void => {
    setComps(prev => prev.filter(comp => comp.id !== id));
    if (comps.length == 1) setButtonsDisabled(true);
    setDeleteModal(!deleteModal);
  }

  const handleCalculateMarkers = (): void => {
    let msrp = String(form.msrp).split(",").join("");
    let cents = parseFloat(form.cents);

    const results: CalculatedSpreads = calculateSpreads(parseInt(msrp), cents, form.targetBuy, comps);
    console.log(results, 'These are the results');

    setCalculatedSpreads(results);
  }

  return (
    <div className=" dark:bg-slate-900 dark:text-slate-300 md:p-5 pb-10 h-full gap-2 flex flex-col">
      <div className="shadow-md md:p-5 p-2 py-4 bg-slate-100 rounded-md m-5 mb-10 border
        dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 flex flex-col gap-4">

        <div className="md:m-4 mb-1 p-4 flex flex-col gap-2 justify-start">
          <div
            className="shadow-md bg-slate-100 dark:bg-slate-800 border-slate-600 dark:text-slate-300
            border rounded p-1 md:p-2 w-fit hover:cursor-pointer
            active:scale-95 transition-transform duration-100"
            onClick={() => router.back()}
          >
            <button
              className="underline text-xs md:text-lg flex flex-row items-center"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
                  />
                </svg>
              </div>
              <h3 className="">Go Back</h3>
            </button>
          </div>
          <h2 className="text-lg md:text-2xl text-center">
            Spreads
          </h2>
          <p>
            The purpose of this page is to visualize the spreads between different markers. This includes markers like BCV,
            Low Retail, High Retail, Wholsale, Trade In.
          </p>
        </div>

        <div className="md:m-4 md:mt-1 p-4 grid gap-4 md:grid-cols-2 md:gap-10 md:text-2xl"
          id="targetBuy-form"
        >
          <Form.Group
            controlId="msrp"
            className="grid grid-cols-2"
          >
            <Form.Label className="md:text-lg">MSRP:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter MSRP."
              name="msrp"
              required
              onChange={handleChange}
              value={form.msrp}
              inputMode="numeric"
              className="border border-gray-600 dark:bg-slate-800 shadow rounded px-1"
            />
          </Form.Group>
          <Form.Group
            controlId="targetBuy"
            className="grid grid-cols-2"
          >
            <Form.Label className="md:text-lg">Target Buy:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter price."
              name="targetBuy"
              required
              onChange={handleChange}
              value={form.targetBuy}
              inputMode="numeric"
              className="border border-gray-600 dark:bg-slate-800 shadow rounded px-1"
            />
          </Form.Group>

          <Form.Group
            controlId="lowest_comp"
            className="grid grid-cols-2"
          >
            <Form.Label className="md:text-lg">
              Cents/Dollar:
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="cents"
              required
              onChange={handleCentsDollarChange}
              value={String(form.cents)}
              className="dark:bg-slate-800 border-gray-600 border rounded"
            >
              <option value="">Select</option>
              <option value=".1">10 Cents</option>
              <option value=".15">15 Cents</option>
              <option value=".2">20 Cents</option>
              <option value=".25">25 Cents</option>
              <option value=".3">30 Cents</option>
              <option value=".35">35 Cents</option>
              <option value=".4">40 Cents</option>
              <option value=".45">45 Cents</option>
              <option value=".5">50 Cents</option>
              <option value=".55">55 Cents</option>
              <option value=".6">60 Cents</option>
              <option value=".65">65 Cents</option>
              <option value=".7">70 Cents</option>
              <option value=".75">75 Cents</option>
              <option value=".8">80 Cents</option>
              <option value=".85">85 Cents</option>
              <option value=".9">90 Cents</option>
            </Form.Select>
          </Form.Group>
        </div>

        <div className="md:m-4 p-4 border border-slate-800 rounded flex flex-col gap-2 md:gap-8" id="comps">
          {/*Display the comps*/}
          <DisplayComps
            comps={comps}
            setDeleteModal={setDeleteModal}
            setToBeDeleted={setToBeDeleted}
          />

          <button className="border border-dashed border-emerald-500 hover:border-emerald-300 hover:cursor-pointer
            text-emerald-500 hover:text-emerald-300 active:scale-95 transition-transform duration-100
            rounded p-1 md:p-2 flex flex-row justify-center items-center w-full gap-2"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex justify-center items-center md:p-1
            hover:border-emerald-300 border-emerald-500 border border-dashed rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5 md:w-4 md:h-4"
                fill="mediumaquamarine"
                viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </div>
            <h3 className="text-sm md:text-xl">Add Comp</h3>
          </button>
        </div>

        <div className="flex justify-around p-4 md:mt-8 md:text-lg lg:text-xl text-white">
          <button
            type="reset"
            className="bg-gray-700 shadow-lg hover:scale-110 transition ease-in-out
              rounded-2xl w-2/5 md:w-1/4 lg:w-1/5 xl:w-1/12 m-auto
              disabled:opacity-75 disabled:bg-gray-500 active:scale-90"
            disabled={buttonsDisabled}
            onClick={() => handleReset()}
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-green-600 shadow-lg hover:scale-110 transition ease-in-out
              rounded-2xl w-2/5 md:w-1/4 lg:w-1/5 xl:w-1/12 m-auto
              disabled:opacity-75 disabled:bg-gray-500 active:scale-90"
            disabled={buttonsDisabled}
            onClick={handleCalculateMarkers}
          >
            Calculate
          </button>
        </div>

        <div className="border border-solid h-[1px] border-slate-700 mx-5 mb-2" />

        {/* BCV & Highest Target Price Results */}
        <div className="grid gap-2 px-4 py-1 md:text-2xl">
          <div className="flex justify-between">
            <Form.Label className="mx-3 text">Average Price:</Form.Label>
            <span>${calculatedSpreads.avg}</span>
          </div>
          <div className="flex justify-between">
            <Form.Label className="mx-3 text">Low Retail:</Form.Label>
            <span>${calculatedSpreads.lowRetail}</span>
          </div>
          <div className="flex justify-between">
            <Form.Label className="mx-3 text">Average Trade In:</Form.Label>
            <span>${calculatedSpreads.avgTradeIn}</span>
          </div>
          <div className="flex justify-between">
            <Form.Label className="mx-3 text">BCV:</Form.Label>
            <span>${calculatedSpreads.bcv}</span>
          </div>

          <div className="flex justify-between">
            <Form.Label className="mx-3 text">Target Buy:</Form.Label>
            <span>${form.targetBuy}</span>
          </div>
        </div>

        <div className="border border-dashed h-[1px] border-slate-700 mx-5" />

        {/* Upside and Downside */}
        <div className="grid gap-2 px-4 py-1 md:text-2xl">
          <div className="flex justify-between">
            <Form.Label className="mx-3 text">Upside Percentage:</Form.Label>
            <span>${calculatedSpreads.upside.percentage}</span>
          </div>
          <div className="flex justify-between">
            <Form.Label className="mx-3 text">Upside Amount:</Form.Label>
            <span>${calculatedSpreads.upside.amount}</span>
          </div>
          <div className="flex justify-between">
            <Form.Label className="mx-3 text">Downside Percentage:</Form.Label>
            <span>${calculatedSpreads.downside.percentage}</span>
          </div>
          <div className="flex justify-between">
            <Form.Label className="mx-3 text">Downside Amount:</Form.Label>
            <span>${calculatedSpreads.downside.amount}</span>
          </div>
        </div>

        <div>
          <DeleteCompModal
            isOpen={deleteModal}
            onClose={() => setDeleteModal(false)}
            onSubmit={() => handleRemoveComp(toBeDeleted.id)}
            title="Are you sure that you want to delete this comp?"
          />
        </div>

        <div className="">
          <AddCompModal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSubmit={handleSubmit}
            title="Add Comp"
          >
            <p className="text-slate-300">Enter the price of the comp.</p>
          </AddCompModal>
        </div>
      </div>
    </div>
  )
}
