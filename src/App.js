import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "./App.css";

function calculateBCV(price, lowestComp, discount) {
  if (lowestComp < 2000) {
    return { bcv: 0, highestTargetPrice: 0 };
  }
  let bcv = Math.round(price * (1 - discount / 100));
  let highestTargetPrice;
  if (lowestComp - 2000 <= bcv) {
    highestTargetPrice = Math.round(lowestComp * (80 / 100));
  } else {
    highestTargetPrice = Math.round(lowestComp - 2000);
  }
  return { bcv, highestTargetPrice };
}

function App() {
  const initialState = { msrp: 0, lowestComp: 0, discount: 0 };
  const [form, setForm] = useState({ ...initialState });
  const [BCV, setBCV] = useState(0);
  const [highesTargetPrice, setHighesTargetPrice] = useState(0);

  //* Helper Functions
  const handleReset = () => {
    setForm({ ...initialState });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let result = calculateBCV(form.msrp, form.lowestComp, form.discount);
    console.log(result, "this is the result from the bcv calculation");
    setBCV(result.bcv);
    setHighesTargetPrice(result.highestTargetPrice);
  };

  return (
    <main className="h-screen dark:bg-slate-900 dark text-slate-300">
      <nav className="w-full m-auto text-center py-5 mb-10">
        <h1 className="text-base md:text-3xl">
          BCV & Highest Target Price Calculator
        </h1>
      </nav>
      {/* Form Container */}
      <div className="px-10 mb-10">
        <Form onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-3 md:gap-10 md:text-xl">
            <Form.Group controlId="msrp" className="grid grid-cols-2">
              <Form.Label>MSRP:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter MSRP."
                name="msrp"
                onChange={handleChange}
                className="bg-slate-800 rounded px-1"
              />
            </Form.Group>

            <Form.Group controlId="lowest_comp" className="grid grid-cols-2">
              <Form.Label>Lowest Comp:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Lowest Comp"
                name="lowestComp"
                onChange={handleChange}
                className="bg-slate-800 rounded px-1"
              />
            </Form.Group>

            <Form.Group controlId="discount" className="grid grid-cols-2">
              <Form.Label>Discount:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Discount"
                name="discount"
                onChange={handleChange}
                className="bg-slate-800 rounded px-1"
              />
            </Form.Group>
          </div>

          <div className="flex justify-around mt-10 md:text-lg lg:text-xl">
            <button
              type="reset"
              className="bg-gray-700 rounded-2xl w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/12 m-auto"
              onClick={() => handleReset()}
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-green-600 rounded-2xl w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/12 m-auto"
            >
              Calculate
            </button>
          </div>
        </Form>
      </div>
      {/* BCV & Highest Target Price Results */}
      <div className="flex justify-around px-10 md:text-lg lg:text-xl">
        <div>
          <Form.Label className="mx-3 text">BCV:</Form.Label>
          <span>${BCV}</span>
        </div>
        <div>
          <Form.Label className="mx-3">High End:</Form.Label>
          <span>${highesTargetPrice}</span>
        </div>
      </div>
    </main>
  );
}

export default App;
