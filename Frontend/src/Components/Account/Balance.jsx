
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const VITE_API_URL= import.meta.env.VITE_API_URL

const Balance = () => {

    console.log("Backend URL:", import.meta.env.VITE_API_URL);
    
    const [balance , setbalance] = useState(null)
    const [loading , setLoading] = useState(true)

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
        setLoading(false)
    }

    useEffect(() => {
        cheackBalance()
    } , [])
  return (
    <div>
            {
                loading ? (<div className='loader ml-4 pb-2 p-2'></div>)
                : balance !== null
                ? (
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
                ) :( <div className='font-mono text-red-700 text-3xl'>No balance found</div>)
            }
    </div>
  )
}

export default Balance
