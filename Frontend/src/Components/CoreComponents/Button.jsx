
export function Button ({text , onclick , color}) {
    return (
        <button 
            onClick={onclick} 
            className={`" text-white px-5 py-2 rounded-md w-full ${color ? (color) : "bg-black"} "`}
        >
            {text}
        </button>
    )
}