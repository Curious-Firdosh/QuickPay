
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import InputBox from '../Components/CoreComponents/InputBox'
import { Button } from '../Components/CoreComponents/Button'
import TransferApi from '../API/TransferApi'
import SuccessMessage from '../Components/CoreComponents/SuccessMessage'

const SendMoney = () => {
  
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")
  const name = searchParams.get("name")

  const[amount , setAmount] = useState('')
  const [success , setSuccess] = useState(false)

  const handleClick = async() => {
      
    try {
      const data = await TransferApi(amount, id); // wait for API response

      console.log("data", data);

      if (data) {
        setSuccess(true);
      }
    } catch (error) {
      console.error("Transfer failed:", error);
    }
  }
  

  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
        
        <div className='flex justify-center items-center'>

            <div className='bg-white w-96 max-h-full text-center p-4 pb-4 rounded-lg flex flex-col justify-center gap-3 '>
                 
                <h1 className='font-bold text-3xl p-4 text-center'>Send Money</h1>
 
                  <div className='flex items-center gap-7'>
                      <img 
                        src={`https://api.dicebear.com/9.x/initials/svg?seed=${name}`}
                        className=' w-24 h-24 rounded-full'/>
                      <h3 className=' font-extrabold text-gray-800 text-2xl  '>{name}</h3>
                  </div>

                  <div className="flex flex-col justify-center text-sm ">
                        <label className="text-black font-semibold text-left mt-1">
                          Amount (in RS)
                        </label>
                          <input
                              type = "text"
                              placeholder="Enter Amount"
                              className = {`
                                  w-full rounded-lg  border border-gray-300  bg-white px-3 py-2 
                                 text-gray-900 placeholder:text-gray-400 outline-none
                                 focus:border-b-4 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60 `}
                                onChange={(e) => {
                                  setAmount(e.target.value)
                                }}     
                            />
                    </div>

                    <div className='lg:mb-8'>
                        <Button 
                            text={"Send"}
                            color = {'bg-green-600'}
                            onclick={handleClick}
                          />
                    </div>
            </div>

            
            {/* Show success message */}
            {
              success && (
                <SuccessMessage
                    amount={amount}
                    name={name}
                    onClose={() => setSuccess(false)}
                />
              )
            }

        </div>



    </div>
  )
}


export default SendMoney

