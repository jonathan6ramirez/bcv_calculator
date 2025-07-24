import { useState } from "react"
// Types
import { InitialState } from "../types"

// Util Functions
import { addCommas, removeNonNumeric, calculateBCV } from "../util"

// Form
import Form from "react-bootstrap/Form";

export default function BCVCalculator() {
  const initialState: InitialState = { msrp: "0", lowestComp: "0", discount: "0" }
  const [form, setForm] = useState<InitialState>({ ...initialState })
  const [BCV, setBCV] = useState<number>(0)
  const [highesTargetPrice, setHighesTargetPrice] = useState<number>(0)

  const handleReset = (): void => {
    setForm({ ...initialState })
    setBCV(0)
    setHighesTargetPrice(0)
  }

  const handleChange = (e: any): void => {
    setForm({
      ...form,
      [e.target.name]: addCommas(removeNonNumeric(e.target.value)),
    })
  }

  const handleSubmit = (e: any): void => {
    // This is supposed to prevent the reloading of the page on submission
    e.preventDefault()

    let msrp = String(form.msrp).split(",").join("");
    let lowestComp = String(form.lowestComp).split(",").join("");
    let discount = String(form.discount).split(",").join("");

    let result = calculateBCV(
      parseInt(msrp),
      parseInt(lowestComp),
      parseInt(discount)
    )

    console.log(result, 'this is the result from the bcv calculation')
    setBCV(result.bcv)
    setHighesTargetPrice(result.highestTargetPrice)
  }

  return (
    <>
      <div className="px-10 mb-10">
        <Form onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-3 md:gap-10 md:text-xl">
            <Form.Group
              controlId="msrp"
              className="grid grid-cols-2"
            >
              <Form.Label className="text-lg">MSRP:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter MSRP."
                name="msrp"
                onChange={handleChange}
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
                Lowest Comp:
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Lowest Comp"
                name="lowestComp"
                onChange={handleChange}
                value={form.lowestComp}
                inputMode="numeric"
                className="border border-gray-600 dark:bg-slate-800 shadow rounded px-1"
              />
            </Form.Group>

            <Form.Group
              controlId="discount"
              className="grid grid-cols-2"
            >
              <Form.Label className="text-lg">
                Discount:
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Discount"
                name="discount"
                onChange={handleChange}
                value={form.discount}
                inputMode="numeric"
                className="border border-gray-600 dark:bg-slate-800 shadow rounded px-1"
              />
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

      {/* BCV & Highest Target Price Results */}
      <div className="grid gap-4 px-10 text-2xl">
        <div className="flex justify-between">
          <Form.Label className="mx-3 text">BCV:</Form.Label>
          <span>${BCV}</span>
        </div>
        <div className="flex justify-between">
          <Form.Label className="mx-3">High End:</Form.Label>
          <span>${highesTargetPrice}</span>
        </div>
      </div>

    </>
  )
}
