import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

function BreakdownDoughnut({ data }) {
    return <h5>Doughnut</h5>
}

export default BreakdownDoughnut
