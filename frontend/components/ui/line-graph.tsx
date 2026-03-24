import { ClusterFigure } from "@/app/types";
import { ResponsiveContainer, CartesianGrid, LineChart, Line, XAxis, YAxis, Legend } from "recharts";

const LINE_GRAPH_COLORS = [
    "#000",
    "#AAAAAA",
    "#CCCCCC"
]
interface LineGraphProps {
    figureSection: ClusterFigure
}

function createLineGraph(xDataKey: string, yDataKeys: string[], rowData: Record<string, Record<string, string | number>>) {

    const graphData = Object.entries(rowData).map(([_, rowValues]) => {

        const rows = {...rowValues}
        for (const key of yDataKeys) {
            rows[key] = Number(rows[key])
        }

        return rows
    })

    return (
        <LineChart
            margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 5,
            }}
            data={graphData}
        >
          <CartesianGrid strokeDasharray="10 10" />
            <XAxis dataKey={xDataKey} tick={{fill: "#000", fontSize: 20}}/>
            <YAxis width="auto" tick={{fill: "#000", fontSize: 20}} />
            {yDataKeys.length > 1 ? <Legend verticalAlign="top" align="left" /> : <></>}
            {
                yDataKeys.map((key, idx) => 
                <Line key={`line ${key} ${idx}`} type="linear" dataKey={key} stroke={LINE_GRAPH_COLORS[idx]} dot={{fill: LINE_GRAPH_COLORS[idx], r: 4}} />
                )
            }
        </LineChart>
    )


}

export default function LineGraph({figureSection}: LineGraphProps) {

    const xDataKey = figureSection["xDataName"]
    const yDataKeys = figureSection["yDataNames"]
    const rowData = figureSection["figureRowData"]

    return (
        <div className="flex flex-col md:items-center w-full overflow-x-auto">
            {xDataKey && yDataKeys && rowData ? 
            <ResponsiveContainer
                height={300}
                aspect={2}
            >
                {createLineGraph(xDataKey, yDataKeys, rowData)}
            </ResponsiveContainer> : <></>}
        </div>
    )
}