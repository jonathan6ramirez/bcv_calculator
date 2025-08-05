"use client"

// Frameworks
import { useState, Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Input,
  Label,
  Transition,
  TransitionChild,
  Field
} from '@headlessui/react';

// Util Functions
import { addCommas, removeNonNumeric } from '@/app/util';


interface ModalProps {
  isOpen: boolean,
  onClose: () => void,
  onSubmit: (price: number) => void,
  title: string,
  children: React.ReactNode,
}

interface FormType {
  price: string,
}

function AddCompModal({ isOpen, onClose, onSubmit, title, children }: ModalProps) {
  const [form, setForm] = useState<FormType>({ price: "" });

  // Handler functions
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: addCommas(removeNonNumeric(value)),
    })
  }

  const handleSubmit = () => {
    const cleaned = Number(removeNonNumeric(form.price));

    if (!isNaN(cleaned)) {
      onSubmit(cleaned); // pass number back to the parent.
      setForm({ price: "" });
      onClose();
    }
  }

  return (
    <>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25 backdrop-blur-xs" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel
                  className="w-full max-w-md transform rounded-2xl
                    bg-slate-100 dark:bg-slate-800 border dark:border-slate-600 dark:text-slate-300
                    p-6 shadow-xl transition-all gap-2 flex flex-col "
                >
                  <DialogTitle className="text-2xl font-medium dark:text-slate-300">
                    {title}
                  </DialogTitle>
                  <Field className="mt-2 flex flex-col gap-2">
                    <Label className="dark:opacity-75">{children}</Label>
                    <Input
                      autoFocus={true}
                      type="text"
                      placeholder="Enter price"
                      name="price"
                      onChange={handleChange}
                      value={form.price}
                      inputMode="numeric"
                      className="border border-gray-600 dark:bg-slate-800 shadow rounded px-1"
                    />
                  </Field>
                  <div className="mt-4 text-right flex flex-row justify-center gap-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-slate-600 bg-slate-700 px-4 py-2 text-sm text-white hover:bg-blue-700 transition"
                      onClick={onClose}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-blue-400 bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 transition"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default AddCompModal;
