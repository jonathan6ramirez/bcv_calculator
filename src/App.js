import React, { useState, useEffect } from "react";
import { Form, Col, Row } from "react-bootstrap";
import "./App.css";

function handleSubmit(e) {
  // e.preventDefault;
  console.log(e, "submitted");
}

function handleChange(e) {
  console.log(e, "form changed");
}

function App() {
  return (
    <main className="h-screen dark:bg-slate-900 dark text-slate-300">
      <nav className="w-full m-auto text-center py-5 mb-10">
        <h1 className="text-base md:text-3xl">
          BCV & Highest Target Price Calculator
        </h1>
      </nav>
      <div className="px-10 mb-10">
        <Form
          onSubmit={handleSubmit}
          className="grid gap-4 md:grid-cols-3 md:gap-10"
        >
          <Form.Group controlId="msrp" className="grid grid-cols-2">
            <Form.Label>MSRP:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter MSRP."
              name="msrp"
              onChange={handleChange}
              className="bg-slate-800 rounded px-1"
            />
          </Form.Group>

          <Form.Group controlId="lowest_comp" className="grid grid-cols-2">
            <Form.Label>Lowest Comp:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Lowest Comp"
              name="lowestComp"
              onChange={handleChange}
              className="bg-slate-800 rounded px-1"
            />
          </Form.Group>

          <Form.Group controlId="discount" className="grid grid-cols-2">
            <Form.Label>Discount:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Discount"
              name="discount"
              onChange={handleChange}
              className="bg-slate-800 rounded px-1"
            />
          </Form.Group>
        </Form>
      </div>
    </main>
  );
}

export default App;
