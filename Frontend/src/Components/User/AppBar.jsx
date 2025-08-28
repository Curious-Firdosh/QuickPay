
import { useNavigate } from 'react-router-dom'
import { LogOutApi } from '../../API/LogOutApi';


const AppBar = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  
  
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  return (
    <div className='flex justify-between p-3 w-full border-b-2'>
        <div className='w-[50%]'>
            <h1 className='font-bold text-3xl '>QuickPay</h1>
        </div>
        <div className='flex items-center w-[30%] justify-end mr-10 gap-x-5 relative'>
            <h3 className='text-center text-xl text-gray-600 font-bold'>{user?.username.toUpperCase()} </h3>
            <img 
              src='https://api.dicebear.com/9.x/pixel-art/svg'
             className='bg-slate-600 w-14 h-14 rounded-full'/>

             <div>
                  {
                    token && (
                      <button 
                        type="button" 
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        onClick={async () => {
                          await LogOutApi()
                          localStorage.removeItem("token");
                          localStorage.removeItem("user");
                          navigate("/login")
                          
                        }}
                      >
                        LogOut
                      </button>
                    )
                  }
              </div>
        </div>
        
    </div>
  )
}

export default AppBar
