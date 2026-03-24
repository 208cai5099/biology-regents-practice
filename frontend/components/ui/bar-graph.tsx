import { ClusterFigure } from "@/app/types";
import { BarChart, Bar, CartesianGrid, Legend, XAxis, YAxis, ResponsiveContainer } from "recharts";

const BAR_GRAPH_COLORS = [
    "#000",
    "#AAAAAA",
    "#CCCCCC"
]
interface BarGraphProps {
    figureSection: ClusterFigure
}

function createBarGraph(xDataKey: string, yDataKeys: string[], rowData: Record<string, Record<string, string | number>>) {

    const graphData = Object.entries(rowData).map(([_, rowValues]) => {

        const rows = {...rowValues}
        for (const key of yDataKeys) {
            rows[key] = Number(rows[key])
        }

        return rows
    })

    return (
        <BarChart
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
                <Bar key={`bar ${key} ${idx}`} dataKey={key} fill={BAR_GRAPH_COLORS[idx]} radius={[10, 10, 0, 0]} />
                )
            }
        </BarChart>
    )


}

export default function BarGraph({figureSection}: BarGraphProps) {

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
                {createBarGraph(xDataKey, yDataKeys, rowData)}
            </ResponsiveContainer> : <></>}
        </div>
    )
}