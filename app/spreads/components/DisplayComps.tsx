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

  const handleClick = (id: string) => {
    setToBeDeleted({ id });
    setDeleteModal((prev) => !prev);
  }

  return (
    <div className="flex flex-col gap-2">
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
