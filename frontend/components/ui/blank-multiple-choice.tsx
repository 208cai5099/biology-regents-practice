export default function BlankMultipleChoiceCard() {

    return (
        <div className="flex flex-col justify-center items-center rounded-2xl w-8/10 gap-y-5 p-5 border border-gray-500">
            <h1 className="text-xl text-center font-bold">Select a unit and question to get started</h1>

            <div                                                                                                                                        
                className="h-[100px] w-full bg-gray-200 rounded-xl"                                                                                                                                    
            />

            {Array.from({length: 4}).map((_, idx) => {
                return (
                    <div
                        className="self-start h-[20px] bg-gray-200 rounded-xl"
                        style={{
                            width: `${90 - 5 * idx}%`
                        }}
                        key={`line-${idx}`}
                    />
                )
            })}
        </div>
    )

}