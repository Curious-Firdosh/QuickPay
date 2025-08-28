import React from 'react'
import { Heading } from '../Components/CoreComponents/Heading'
import { Subheading } from '../Components/CoreComponents/Subheading'
import InputBox from '../Components/CoreComponents/InputBox'
import { Button } from '../Components/CoreComponents/Button'
import { BottomWarn } from '../Components/CoreComponents/BottomWarning'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import  LoginApi from '../API/LoginApi'


const Login = () => {

  const {
    register ,
    handleSubmit,
    reset,
    formState :{errors}
  }= useForm()
  
  const navigate = useNavigate()

const onsubmit = async (data) => {
  
  console.log("Form Data:", data);

  LoginApi(data, navigate , reset)

};


  return (
   <div className='bg-slate-300 h-screen flex justify-center'>
        
        <div className='flex flex-col justify-center gap-y-5 '>
            <div className='bg-white w-96 max-h-full text-center p-3 pb-4 rounded-lg '> 
                
                <div>
                    <Heading lable={"Sign In "}/>
                     <Subheading text={"Enter You Credrentials to Access Your Account"}/>
                </div>
               
              <form  onSubmit={handleSubmit(onsubmit)} className='flex flex-col justify-center gap-4'>

                <InputBox 
                  label={"Email"}
                  placeholder={"example@gmail.com"} 
                  type={"text"}
                  registeration={register("email" , {required : "Email is Required"})}
                  error={errors.email?.message}
                />
                <InputBox 
                  label={"Password"}
                  placeholder={"123456"} 
                  type = {"password"}
                  registeration={register("password" , {required : "Password is Required"})}
                  error={errors.password?.message}
                />
                
                <div className='pt-4 '>
                    <Button text={"Login"}/>
                </div>

              </form>


                 <BottomWarn btntext={"Signup"} to={"/signup"} warntext ={"Don't Have an Account?"} />
            </div>
           
        </div>
    </div>
  )
}

export default Login
