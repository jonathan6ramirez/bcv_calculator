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

function App() {
    const initialState = { msrp: 0, lowestComp: 0, discount: 0 }
    const [form, setForm] = useState({ ...initialState })
    const [BCV, setBCV] = useState(0)
    const [highesTargetPrice, setHighesTargetPrice] = useState(0)
    console.log(form)

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

    return (
        <main className="h-screen dark:bg-slate-900 dark:text-slate-300">
            <nav className="w-full m-auto text-center py-5 mb-10">
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
        </main>
    )
}

export default App
