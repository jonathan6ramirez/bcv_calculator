import React from 'react';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Form from "react-bootstrap/Form";

// Types
import { MarkersType, MarkersDataType, CalculatedMarkers } from '../types';

// Components
import FirstMarkerGraph from './calculatemarkers/FirstMarkerGraph';

// Util functions
import { calculateMarkers, addCommas, removeNonNumeric } from '../util';

// TODO: Calculate the BCV (inputed), 50%, and the 75% lines for the total msrp of the watch.
// maybe add an option to add target buy and target sell????????
// the way to show the date is to have 2 graphs with one showing the breakdown of the potential profit
// vs. the potential loss. The first graph would show how the bcv, 50, 75
//
// INFO: how do you calculate the bcv? take the input and multiply it by how many cents
// on the dollar it is. ex. $10000 msrp and its 30 cents on the dollar.
// 10000 * .3 = $3000

export default function CalculateMarkers() {
  const initialState: MarkersType = { msrp: 0, cents: "" }
  const [form, setForm] = useState<MarkersType>({ ...initialState })
  const [data, setData] = useState<MarkersDataType[]>([
    { name: 'Markers', msrp: 0, bcv: 0, fifty: 0, seventyFive: 0 },
  ]);
  const [markers, setMarkers] = useState<CalculatedMarkers>({
    bcv: "",
    fiftyPercent: "",
    seventyFivePercent: "",
  });

  const handleReset = (): void => {
    setData([
      { name: 'Markers', msrp: 0, bcv: 0, fifty: 0, seventyFive: 0 },
    ])
  }

  const handleMsrpChange = (e: any): void => {
    setForm({
      ...form,
      [e.target.name]: addCommas(removeNonNumeric(e.target.value)),
    })
  }

  const handleCentsDollarChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    console.log("this is the value of the select", e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e: any): void => {
    // This is supposed to prevent the reloading of the page on submission
    e.preventDefault();

    let msrp = String(form.msrp).split(",").join("");
    let cents = parseFloat(String(form.cents));

    let result = calculateMarkers(
      cents,
      parseInt(msrp)
    );

    let bcv = result.bcv;
    let fifty = result.bcv + result.fifty;
    let seventyFive = result.seventyFive + fifty;

    console.log(result, 'this is the result from the marker calculation');
    //setBCV(result.bcv)
    //setHighesTargetPrice(result.highestTargetPrice)
    setData([result])
    setMarkers({
      bcv: bcv,
      fiftyPercent: fifty,
      seventyFivePercent: seventyFive
    })
  }

  return (
    <div className="shadow-md p-5 bg-slate-100 rounded-md m-5 border
      dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 flex flex-col gap-4">
      <div className="w-full text-center p-5 mb-4">
        <h1 className="text-2xl md:text-3xl">
          Calculate BCV, 50%, 75%
        </h1>
      </div>
      {/* Form */}
      <div className="flex justify-center">
        <Form onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2 md:gap-10 md:text-xl">
            <Form.Group
              controlId="msrp"
              className="grid grid-cols-2"
            >
              <Form.Label className="text-lg">MSRP:</Form.Label>
              <Form.Control
                type="text"
                placeholder="MSRP"
                name="msrp"
                onChange={handleMsrpChange}
                value={form.msrp}
                inputMode="numeric"
                className="border border-gray-600 dark:bg-slate-800 shadow rounded px-1"
              />
            </Form.Group>

            <Form.Group
              controlId="lowest_comp"
              className="grid grid-cols-2"
            >
              <Form.Label className="text-lg">
                Cents/Dollar:
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                name='cents'
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

          <div className="flex justify-around mt-10 md:text-lg lg:text-xl text-white">
            <button
              type="reset"
              className="bg-gray-700 shadow-lg hover:scale-110 transition ease-in-out rounded-2xl w-2/5 md:w-1/4 lg:w-1/5 xl:w-1/12 m-auto"
              onClick={() => handleReset()}
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-green-600 shadow-lg hover:scale-110 transition ease-in-out rounded-2xl w-2/5 md:w-1/4 lg:w-1/5 xl:w-1/12 m-auto"
            >
              Calculate
            </button>
          </div>
        </Form>
      </div>

      {/* BCV, 50%, 75% */}
      <div className="grid gap-4 px-10 text-2xl">
        <div className="flex justify-between">
          <Form.Label className="mx-3 text">BCV:</Form.Label>
          <span>${markers.bcv}</span>
        </div>
        <div className="flex justify-between">
          <Form.Label className="mx-3">50%:</Form.Label>
          <span>${markers.fiftyPercent}</span>
        </div>
        <div className="flex justify-between">
          <Form.Label className="mx-3">75%:</Form.Label>
          <span>${markers.seventyFivePercent}</span>
        </div>
      </div>

      {/* First Graph */}
      <div className="w-full rounded md:flex md:flex-col md:items-center">
        <FirstMarkerGraph data={data} />
      </div>
    </div>
  )
}
