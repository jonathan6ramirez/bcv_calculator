import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import './App.css'

function calculateBCV(price, lowestComp, discount) {
    if (lowestComp < 2000) {
        return { bcv: 0, highestTargetPrice: 0 }
    }
    let bcv = Math.round(price * (1 - discount / 100))
    let highestTargetPrice
    if (lowestComp - 2000 <= bcv) {
        highestTargetPrice = Math.round(lowestComp * (80 / 100))
    } else {
        highestTargetPrice = Math.round(lowestComp - 2000)
    }
    return { bcv, highestTargetPrice }
}

function calculateCost(salePrice) {
    let cost = 0
    let itemFee = 0

    if (salePrice <= 1000) {
        itemFee = salePrice * 0.15
    } else if (salePrice > 1000 && salePrice <= 7500) {
        itemFee = 1000 * 0.15 + (salePrice - 1000) * 0.065
    } else {
        itemFee = 1000 * 0.15 + 6500 * 0.065 + (salePrice - 7500) * 0.03
    }

    cost = itemFee + 0.3

    return cost.toFixed(2)
}

function App() {
    const initialState = { msrp: 0, lowestComp: 0, discount: 0 }
    const [form, setForm] = useState({ ...initialState })
    const [BCV, setBCV] = useState(0)
    const [highesTargetPrice, setHighesTargetPrice] = useState(0)

    const [ebayPrice, setEbayPrice] = useState(0)
    const [finalEbayPrice, setFinalEbayPrice] = useState(0)

    //* Helper Functions
    const addCommas = (num) =>
        num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, '')
    const handleReset = () => {
        setForm({ ...initialState })
        setBCV(0)
        setHighesTargetPrice(0)
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: addCommas(removeNonNumeric(e.target.value)),
        })
    }

    const handleEbayChange = (e) => {
        const res = calculateCost(e.target.value.split(',').join(''))
        setEbayPrice(addCommas(removeNonNumeric(e.target.value)))
        const finalPrice = e.target.value.split(',').join('') - res
        setFinalEbayPrice(finalPrice.toFixed(2))
        // console.log(finalPrice.toFixed(2), 'this is the final price')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let result = calculateBCV(
            form.msrp.split(',').join(''),
            form.lowestComp.split(',').join(''),
            form.discount.split(',').join('')
        )
        console.log(result, 'this is the result from the bcv calculation')
        setBCV(result.bcv)
        setHighesTargetPrice(result.highestTargetPrice)
    }

    const handleEbaySubmit = (e) => {}

    return (
        <main className="h-screen dark:bg-slate-900 dark:text-slate-300 p-5">
            <nav className="w-full m-auto text-center p-5 mb-10">
                <h1 className="text-2xl md:text-3xl">
                    BCV & Highest Target Price Calculator
                </h1>
            </nav>
            {/* Form Container */}
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
                                inputmode="numeric"
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
                                inputmode="numeric"
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
                                inputmode="numeric"
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
            <div className="grid gap-4 px-10 text-2xl ">
                <div className="flex justify-between">
                    <Form.Label className="mx-3 text">BCV:</Form.Label>
                    <span>${BCV}</span>
                </div>
                <div className="flex justify-between">
                    <Form.Label className="mx-3">High End:</Form.Label>
                    <span>${highesTargetPrice}</span>
                </div>
            </div>
            <br></br>
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
                                    inputmode="numeric"
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
        </main>
    )
}

export default App
