import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Types
import { MarkersDataType } from '@/app/types';

type FirstMarkerGraphProps = {
  data: MarkersDataType[]
}

export default function FirstMarkerGraph({ data }: FirstMarkerGraphProps) {
  return (
    <>
      {/* Bar Chart */}
      <div className="text-white rounded-md h-100 md:w-1/2 md:h-150 bg-slate-600 w-full 
          p-4 pb-8 flex justify-center flex-col">
        <div className="w-full text-center">
          <span className="text-white md:text-2xl">Markers</span>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 10,
              right: 15,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="white" />
            <XAxis dataKey="name" stroke='white' />
            <YAxis stroke="white" />
            <Tooltip />
            <Legend />
            <Bar dataKey="bcv" stackId="a" fill="#f4a261" />
            <Bar dataKey="fifty" stackId="a" fill="#e9c46a" />
            <Bar dataKey="seventyFive" stackId="a" fill="#a8dadc" />
            <Bar dataKey="msrp" stackId="a" fill="#90be6d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}
