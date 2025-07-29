"use client"

import DisplayComp from "./DisplayComp"

type Comp = {
  price: number,
  id: string,
}

interface ToBeDeleted {
  id: string
}

interface CompsProps {
  comps: Comp[]
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
  setToBeDeleted: React.Dispatch<React.SetStateAction<ToBeDeleted>>,
}

export default function DisplayComps({ comps, setDeleteModal, setToBeDeleted }: CompsProps) {
  console.log(comps, 'these are the comps inside the DisplayComps')
  // INFO: This is where I need to abstract away the setting of the id and the boolean state.
  //
  const handleClick = (id: string) => {
    setToBeDeleted({ id });
    setDeleteModal((prev) => !prev);
  }

  return (
    <div className="mb-6 flex flex-col gap-2">
      <h2>Add at least 1 comp to calculate.</h2>
      {comps && comps.length > 0 && (
        comps.map((comp, index) =>
          <div
            className="flex flex-row gap-2 justify-center items-center"
            id={comp.id}
            key={comp.id}
          >
            <DisplayComp
              price={String(comp.price)}
              index={index}
              onClick={() => handleClick(comp.id)}
            />
          </div>
        )
      )}
    </div>
  )
}
