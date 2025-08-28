


const InputBox = ({placeholder , label , type , registeration , error , ...props }) => {

    return(
        <>
          <div className="flex flex-col justify-center text-sm ">
              <label className="text-black font-semibold text-left mt-1">
                {label}
              </label>
                <input
                    type = {type}
                    placeholder={placeholder}
                    {...registeration}
                    {...props}
                    className = {`
                      w-full rounded-md  border border-gray-300 bg-white px-3 py-2 
                       text-gray-900 placeholder:text-gray-400 outline-none
                      focus:border-b-4 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60 
                        ${error ? "border-red-600" : "border-gray-300"} `}
                     />
                     {error && <p  className="text-red-500 text-sm mt-1 text-left">{error}</p>}
          </div>
        </>
    )
}
export default InputBox