
import { addCommas, removeNonNumeric } from "@/app/util"

interface DisplayCompProps {
  price: string
  index: number
}

export default function DisplayComp({ price, index }: DisplayCompProps) {

  return (
    <div className="p-2 flex flex-row justify-between items-center border border-slate-600 bg-slate-800 text-slate-300 rounded w-full">
      <span>Comp {index + 1}:</span>
      <div className="flex flex-row items-center gap-2">
        <span>${addCommas(removeNonNumeric(price))}</span>
        <div className="border border-slate-600 bg-slate-800 rounded p-1 hover:cursor-pointer hover:bg-slate-600
            active:scale-90 transition-transform duration-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="salmon"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
