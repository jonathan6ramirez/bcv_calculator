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
    <div className="mb-4 flex flex-col gap-2">
      <h2>These are the comps.</h2>
      {comps && comps.length > 0 && (
        comps.map((comp, index) =>
          <div
            className="flex flex-row gap-2 justify-center items-center"
            id={comp.id}
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
