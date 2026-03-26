import { ClusterFigure } from "@/app/types";
import { BarChart, Bar, CartesianGrid, Legend, XAxis, YAxis, ResponsiveContainer } from "recharts";

const BAR_GRAPH_COLORS = [
    "#000",
    "#AAAAAA",
    "#CCCCCC"
]

const TICK_FONT_SIZE = 15

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
            <XAxis dataKey={xDataKey} label={{value: xDataKey, fill: "#000", position: "insideBottom", offset: -5, fontSize: TICK_FONT_SIZE, fontWeight: "bold"}} tick={{fill: "#000", fontSize: TICK_FONT_SIZE}}/>
            <YAxis width="auto" label={{value: yDataKeys[0], fill: "#000", position: "insideLeft", angle: -90, offset: 5, dy: 100, fontSize: TICK_FONT_SIZE, fontWeight: "bold"}} tick={{fill: "#000", fontSize: TICK_FONT_SIZE}} />
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
    const figureNumber = figureSection["figureNumber"]
    const figureTitle = figureSection["figureTitle"]

    return (
        <div className="flex flex-col md:items-center w-full overflow-x-auto">
            {figureNumber && figureTitle ?
            <h1
                className="self-start text-lg font-semibold text-left"
            >
                Figure {figureNumber}: {figureTitle}
            </h1> : <></>
            }

            {xDataKey && yDataKeys && rowData ? 
            <ResponsiveContainer
                height={350}
                aspect={2}
            >
                {createBarGraph(xDataKey, yDataKeys, rowData)}
            </ResponsiveContainer> : <></>}
        </div>
    )
}