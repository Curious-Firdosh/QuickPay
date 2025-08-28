import { Link, NavLink } from "react-router-dom";


export function BottomWarn ({warntext, btntext , to}) {

    return (
        <>
           <div className="flex justify-center text-sm py-2 mb-4 gap-2">
                 <p>{warntext}</p>
                 <Link className="cursor-pointer underline font-medium " to={to}>
                    {btntext}
                 </Link>
           </div>

        </>
    )
}