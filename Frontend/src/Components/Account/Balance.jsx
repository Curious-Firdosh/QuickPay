
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const VITE_API_URL= import.meta.env.VITE_API_URL

const Balance = () => {

    console.log("Backend URL:", import.meta.env.VITE_API_URL);
    
    const [balance , setbalance] = useState(null)

    const cheackBalance = async () => {

         const token = localStorage.getItem("token");

        const response = await axios.get(
            `${VITE_API_URL}api/v1/account/balance`,
             {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                 }
            }
        )
        console.log("Backend Resposne",response.data.accountBalance);
        setbalance(response.data.accountBalance)
    }

    useEffect(() => {
        cheackBalance()
    } , [])
  return (
    <div>
            {
                balance  &&  (
                    <div className='font-semibold text-md text-gray-600 mt-4 p-5'>
                        <h1 className="text-2xl font-bold text-gray-800">
                                Your Account Balance
                        </h1>
                        <div className="flex items-baseline gap-2 mt-2">
                            <span className="text-4xl font-extrabold text-green-600">
                                ₹{balance}
                            </span>
                            <span className="text-lg text-gray-500">INR</span>
                        </div>
                    </div>
                ) 
            }
    </div>
  )
}

export default Balance
