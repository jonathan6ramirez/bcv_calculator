"use client"

// Frameworks
import { Fragment } from 'react';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';


interface ModalProps {
  isOpen: boolean,
  onClose: () => void,
  onSubmit: () => void,
  title: string,
}

function DeleteCompModal({ isOpen, onClose, onSubmit, title }: ModalProps) {
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
                  <div className="mt-4 text-right flex flex-row justify-center gap-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border
                        border-slate-600 bg-slate-700 px-4 py-2 text-sm text-white
                        hover:scale-105 hover:cursor-pointer
                        active:scale-90 transition-transform duration-100"
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-red-400 bg-red-600
                        px-4 py-2 text-sm text-white
                        hover:cursor-pointer hover:scale-105
                        active:scale-90 transition-transform duration-100"
                      onClick={onSubmit}
                    >
                      Yes
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

export default DeleteCompModal;
