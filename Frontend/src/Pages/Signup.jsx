import React from 'react'
import { Heading } from '../Components/CoreComponents/Heading'
import { Subheading } from '../Components/CoreComponents/Subheading'
import InputBox from '../Components/CoreComponents/InputBox'
import { Button } from '../Components/CoreComponents/Button'
import { BottomWarn } from '../Components/CoreComponents/BottomWarning'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import SignupApi from '../API/SignupApi'


const Signup = () => {

  const {
         register ,
         handleSubmit ,
         formState :{errors},
         reset,
        } = useForm()
      
  const navigate = useNavigate()
  
  const onSubmit = (data) => {
      
    console.log("From Data", data);
      
    SignupApi(data , navigate , reset)
      
  }
  
  return (
  <div className='bg-slate-300 h-screen flex justify-center'>
        <div className='flex flex-col justify-center gap-y-5 '>
            <div className='bg-white w-96 max-h-full text-center p-3 pb-4 rounded-lg '> 
                
                <div>
                    <Heading lable={"Sign up"}/>
                     <Subheading text={"Enter Your Information to Create Your Account"}/>
                </div>
               
               <form 
                className='flex justify-center flex-col gap-3'
                onSubmit={handleSubmit(onSubmit)}
              >
                  
                  <InputBox 
                    label={"First Name"} 
                    placeholder={"Jhon"} 
                    type={"text"}
                    registeration={register("firstname" , {required : "First Name Is Required"})}
                    error={errors.firstname?.message}
                    />
                  
                  <InputBox 
                    label={"Last Name"}
                    placeholder={"Doe"} 
                    type = {"text"}
                    registeration={register ("lastname" , {required : "Last Name Is Required"})}
                    error={errors.lastname?.message}
                  />
                  
                  <InputBox 
                  
                    label={"Username"} 
                    placeholder={"Jhon Doe"} 
                    type={"text"}
                    registeration={register("username" , {required : "Username is Required"})}
                    error={errors.username?.message}
                  />
                  
                  <InputBox 
                      label={"Email"}
                      placeholder={"example@gmail.com"}
                      type={"text"}
                      registeration={register("email", {required : "Email is Required"})}
                      error={errors.email?.message}
                    />

                     <InputBox 
                      label={"Password"}
                      placeholder={"122345#$"}
                      type={"text"}
                      registeration={register("password", {required : "Password is Required"})}
                      error={errors.password?.message}
                    />
                  
                  <div className='pt-4 mt-4'>
                      <Button text={"Signup"}/>
                  </div>
                 
               </form>

               
                 <BottomWarn btntext={"Login"} to={"/login"} warntext ={"Already Have an Account?"} />
            </div>
           
        </div>
    </div>
  )
}

export default Signup
