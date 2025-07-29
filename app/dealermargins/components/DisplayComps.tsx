"use client"

import DisplayComp from "./DisplayComp"

type Comp = {
  price: number,
  id: string,
}

interface CompsProps {
  comps: Comp[]
}

export default function DisplayComps({ comps }: CompsProps) {
  console.log(comps, 'these are the comps inside the DisplayComps')

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
            //id={comp.price}
            />
          </div>
        )
      )}
    </div>
  )
}
