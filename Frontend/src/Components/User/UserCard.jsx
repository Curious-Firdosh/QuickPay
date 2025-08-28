import React from 'react'
import { Button } from '../CoreComponents/Button'
import { useNavigate } from 'react-router-dom'

const UserCard = ({user}) => {
    const navigate = useNavigate()
  return (
    <div className='flex justify-between  lg:m-3 lg:p-3'>
        <div className='flex justify-center items-center gap-x-2'>
            <img
                className='bg-slate-600 w-14 h-14 rounded-full'
                src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${user.firstname}`}
                alt="avatar"
            />

            <p className='font-mono text-lg'>{user?.username}</p>
        </div>

        <div>
            <Button text={"Send Money"} onclick={() => {
                navigate("/send?id=" + user._id + "&name=" + user.firstname )
            }} />
        </div>
    </div>
  )
}

export default UserCard
