import { ClusterFigure } from "@/app/types";
import { ResponsiveContainer, CartesianGrid, LineChart, Line, XAxis, YAxis, Legend } from "recharts";

const LINE_GRAPH_COLORS = [
    "#000",
    "#AAAAAA",
    "#CCCCCC"
]

const TICK_FONT_SIZE = 15

interface LineGraphProps {
    figureSection: ClusterFigure
}

function createLineGraph(xAxisTitle: string, yAxisTitle: string, xDataKey: string, yDataKeys: string[], rowData: Record<string, Record<string, string | number>>) {

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
            <XAxis dataKey={xDataKey} label={{value: xAxisTitle, fill: "#000", position: "insideBottom", offset: -5, fontSize: TICK_FONT_SIZE, fontWeight: "bold"}} tick={{fill: "#000", fontSize: TICK_FONT_SIZE}}/>
            <YAxis width="auto" domain={["auto", "auto"]} label={{value: yAxisTitle, fill: "#000", position: "insideLeft", angle: -90, offset: 5, dy: 100, fontSize: TICK_FONT_SIZE, fontWeight: "bold"}} tick={{fill: "#000", fontSize: TICK_FONT_SIZE}} />
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
    const xAxisTitle = figureSection["xAxisTitle"]
    const yAxisTitle = figureSection["yAxisTitle"]
    const rowData = figureSection["figureRowData"]
    const figureTitle = figureSection["figureTitle"]
    const figureNumber = figureSection["figureNumber"]

    return (
        <div className="flex flex-col md:items-center w-full overflow-x-auto">
            {figureNumber && figureTitle ?
            <h1
                className="self-start text-lg font-semibold text-left"
            >
                Figure {figureNumber}: {figureTitle}
            </h1> : <></>
            }
            {xAxisTitle && yAxisTitle && xDataKey && yDataKeys && rowData ? 
            <ResponsiveContainer
                height={350}
                aspect={2}
            >
                {createLineGraph(xAxisTitle, yAxisTitle, xDataKey, yDataKeys, rowData)}
            </ResponsiveContainer> : <></>}
        </div>
    )
}