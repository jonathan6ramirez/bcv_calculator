"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Components
import AddCompModal from "./components/Modal";
import DeleteCompModal from "./components/DeleteModal";
import DisplayComps from "./components/DisplayComps";

interface Comp {
  price: number,
  id: string,
};

export default function DealerMargins() {
  const router = useRouter();

  const [comps, setComps] = useState<Comp[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  // Helper Function
  const handleSubmit = (price: number) => {
    setComps(prev => [...prev, { price, id: crypto.randomUUID() }]);
  }

  const handleDeleteComp = () => {
    // TODO: Add ability to delete comp
  }

  const handleRemoveComp = (id: string) => {
    setComps(prev => prev.filter(comp => comp.id !== id));
  }

  return (
    <>
      <div className="dark:bg-slate-900 dark:text-slate-300 p-5 h-full gap-2 flex flex-col">

        <div className="md:p-4 m-4 flex flex-col gap-2 justify-start">
          <div
            className="shadow-md bg-slate-100 dark:bg-slate-800 border-slate-600 dark:text-slate-300
            border rounded p-2 w-fit hover:cursor-pointer
            active:scale-95 transition-transform duration-100"
            onClick={() => router.back()}
          >
            <button
              className="underline text-sm md:text-lg flex flex-row items-center m-auto"
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
          <h2 className="text-2xl">
            Add the Bottom 3 Comps:
          </h2>
        </div>

        <div className="m-4 p-4 border border-slate-800 rounded" id="comps">
          {/*Display the comps*/}
          <DisplayComps comps={comps} />

          <button className="border border-dashed border-emerald-500 hover:border-emerald-300 hover:cursor-pointer
            text-emerald-500 hover:text-emerald-300 active:scale-95 transition-transform duration-100
            rounded p-2 flex flex-row justify-center items-center w-1/2 m-auto gap-2"
            onClick={() => setIsOpen(true)}
          >
            <div className="flex justify-center items-center p-1
            hover:border-emerald-300 border-emerald-500 border border-dashed rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="mediumaquamarine"
                viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </div>
            <h3 className="md:text-xl">Add Comp</h3>
          </button>
        </div>

        <div>
          <DeleteCompModal
            isOpen={deleteModal}
            onClose={() => setDeleteModal(false)}
            onSubmit={handleSubmit}
            title="Are you sure that you want to delete this modal?"
          >
            <p className="text-slate-300"></p>
          </DeleteCompModal>
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
    </>
  );
};
