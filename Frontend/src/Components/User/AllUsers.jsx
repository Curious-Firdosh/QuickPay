

import React, { useEffect, useState } from 'react'
import UserCard from './UserCard'
import AlluserApi from '../../API/AlluserApi'
import AppBar from './AppBar'
import Balance from '../Account/Balance'


const AllUsers = () => {

    const [users , setUsers] = useState([])
    const[filter , setFilter] = useState('')
    const [loader ,setloader] = useState(true)

    useEffect(() => {

        const featchUsers = async () => {
            const data = await AlluserApi(filter);

            if(data){
                setUsers(data.users)
            }

            setloader(false)
        }

        featchUsers()
    },[filter])


  return (
    <>
        {
            loader ? (<div className='loader2'> </div>)
            : 
            (
                    <div className=' mt-4'>
                        <AppBar users = {users}/>
                        <Balance/>
                        <h2 className='font-semibold  text-4xl lg:ml-4 lg:mb-2'>Users</h2>
                        <div className='p-3'>
                            <input 
                                type = "text"
                                placeholder='Search For User'
                                onChange={(e) => {
                            setFilter( e.target.value);  
                                }}
                                className='w-full p-2 outline'
                            />

                        </div>
                        <div className=''>
                            {
                            users.map((user) => {
                                return <UserCard key={user._id} user = {user}/>
                            })
                        }
                        </div>
                    </div>
            )
        }
    </>
  )
}

export default AllUsers
