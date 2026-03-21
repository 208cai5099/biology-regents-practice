const SKELETON_BACKGROUND_GRADIENT = "linear-gradient(90deg, #c8c8c8 25%, #ebebeb 50%, #c8c8c8 75%)"
const SKELETON_BACKGROUND_SIZE = "200% 100%"

export default function BlankMultipleChoiceCard() {

    return (
        <div className="flex flex-col justify-center items-center rounded-2xl w-8/10 gap-y-5 p-5 border border-gray-500">
            <h1 className="text-xl font-bold">Select a question to get started</h1>

            <div                                                                                                                                        
                className="h-[100px] w-full animate-shimmer rounded-xl"
                style={{                                                        
                    background: SKELETON_BACKGROUND_GRADIENT,                                                        
                    backgroundSize: SKELETON_BACKGROUND_SIZE                                              
                }}                                                                                                                                      
            />

            {Array.from({length: 4}).map((_, idx) => {
                return (
                    <div
                        className="self-start h-[20px] animate-shimmer rounded-xl"
                        style={{
                            background: SKELETON_BACKGROUND_GRADIENT,
                            backgroundSize: SKELETON_BACKGROUND_SIZE,
                            width: `${90 - 5 * idx}%`
                        }}
                        key={`line-${idx}`}
                    />
                )
            })}
        </div>
    )

}