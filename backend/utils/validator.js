const zod = require('zod')


const signupSchema = zod.object({
    username : zod.string().min(3 , "Username Must Be At least 3 characters") ,
    firstname: zod.string().min(1, "Firstname is required"),
    lastname: zod.string().min(1, "Lastname is required"),
    email : zod.string().email("Invalid email address"),
    password : zod.string().min(6 , "Password must be at least 6 characters"),
   
})

const loginSchema = zod.object({
    email : zod.string().email("Invalid email address"), 
    password : zod.string().min(6 ,"Password must be at least 6 characters")
})

const passwordSchema = zod.object({
    firstname: zod.string().min(1, "Firstname is required"),
    lastname: zod.string().min(1, "Lastname is required"),
    newPassword: zod.string().min(6 ,"Password must be at least 6 characters")
})

module.exports = {signupSchema , loginSchema , passwordSchema}