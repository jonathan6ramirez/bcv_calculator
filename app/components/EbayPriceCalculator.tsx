import Form from "react-bootstrap/Form";
import { useState } from "react";
import { calculateCost, addCommas, removeNonNumeric } from "../util";

export default function EbayPriceCalculator() {
  const [ebayPrice, setEbayPrice] = useState<string | number>("0")
  const [finalEbayPrice, setFinalEbayPrice] = useState<string | number>("0")

  const handleEbayChange = (e: any): void => {
    const res = calculateCost(e.target.value.split(',').join(''))
    setEbayPrice(addCommas(removeNonNumeric(e.target.value)))

    const finalPrice = parseFloat(e.target.value.split(',').join('')) - res;
    setFinalEbayPrice(finalPrice.toFixed(2))
    // console.log(finalPrice.toFixed(2), 'this is the final price')
  }

  return (
    <div className="shadow-md p-5 bg-slate-100 rounded-md m-5 border dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300">
      <h2 className="text-2xl md:text-3xl text-center">
        Ebay Price Calculator
      </h2>
      <div className="p-5 ">
        <p className="my-5">Based on this statement: </p>
        <p className="my-5">
          {' '}
          <i>
            15% on total amount of the sale up to $1,000
            calculated per item 6.5% on the portion of the sale
            over $1,000 up to $7,500 calculated per item 3% on
            the portion of the sale over $7,500 $0.30 per order
          </i>
        </p>
        <p className="my-5">
          Is how the final selling price is calculated.
        </p>
      </div>
      <div className="px-10 mb-10">
        <Form>
          <div className="grid gap-4 md:grid-cols-3 md:gap-10 md:text-xl">
            <Form.Group
              controlId="msrp"
              className="grid grid-cols-2"
            >
              <Form.Label className="text-lg">
                Price:
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter MSRP."
                name="msrp"
                onChange={handleEbayChange}
                value={ebayPrice}
                inputMode="numeric"
                className="border border-gray-600 dark:bg-slate-800 shadow rounded px-1"
              />
            </Form.Group>
          </div>
          <div className="flex justify-between my-5">
            <Form.Label className="text">
              Final Price:
            </Form.Label>
            <span>${finalEbayPrice}</span>
          </div>
        </Form>
      </div>
    </div>
  )
}
