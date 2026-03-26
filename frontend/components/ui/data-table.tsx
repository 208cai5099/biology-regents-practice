import { ClusterFigure } from "@/app/types"

interface DataTableProps {
    figureSection: ClusterFigure
}

function createTable(columnNames: string[], rowData: Record<string, Record<string, string | number>>) {

    return (
        <div className="self-center w-8/10 overflow-x-auto rounded-lg border border-gray-300">
            <table className="text-center w-full">
                <thead>
                    <tr className="border-b border-gray-300">
                        {columnNames.map(col => <td key={`column ${col}`} className="px-5">{col}</td>)}
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(rowData).map(([rowNum, cellValues]) => {
                        return (
                            <tr
                                key={`row_${rowNum}`}
                                className="border-b border-gray-300 last:border-b-0"
                            >
                                {columnNames.map((col, idx) => <td key={`row_${rowNum}, cell ${idx}`}>{cellValues[col]}</td>)}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default function DataTable({figureSection}: DataTableProps) {

    const columnNames = figureSection["figureColumnNames"]
    const rowData = figureSection["figureRowData"]
    const figureNumber = figureSection["figureNumber"]
    const figureTitle = figureSection["figureTitle"]

    return (
        <div className="w-full flex flex-col">
            {figureTitle && figureNumber ?
            <h1
                className="text-lg font-semibold text-left"
            >
                Figure {figureNumber}: {figureTitle}
            </h1> : <></>
            }
            {columnNames && rowData ? createTable(columnNames, rowData) : <></>}
        </div>
    )
}