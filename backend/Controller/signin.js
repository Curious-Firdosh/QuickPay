const Account = require("../Model/Account");
const User  = require("../Model/User");
const { signupSchema, loginSchema, passwordSchema } = require("../utils/validator");
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
require("dotenv").config
const jwtSecret = process.env.JWT_KEY



exports.signup = async (req, res) => {
  try {

    // Validate the request body
    const validationSchema = signupSchema.parse(req.body)
     // This ensures all fields are correct and throws error if not

    // Object destructuring (safe after validation)
    const {username , password , firstname , lastname , email} = validationSchema

    console.log("Validated data:", validationSchema);

    // FInd The User WitH Email 
    const userData = await User.findOne({email})

    if(userData) {
        return res.status(400).json({
            success: false,
            message: " User Already Exist"
        });
    }


    // Hash The Password 
    const hashedPassword = await bcrypt.hash(password , 10)

    const newUser = await User.create({
        firstname : firstname ,
        lastname : lastname ,
        username : username ,
        email :email ,
        password :hashedPassword ,
    
    })
    const userId = newUser._id

    //-------------------Create new Account ------------------
    const AccountData = await Account.create({
        userId,
        accountBalance : 1 + Math.round(Math.random() * 10000)
    })

    
    // success response
    return res.status(201).json({
      success: true,
      data :newUser ,
      accountBalance : AccountData.accountBalance,
      message: "User Created SuccessFully 🚀"
    });

  } 
catch (error) {
    console.error("Error in Signup --->", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
      message2: error.errors 
    });
  }
};


exports.login = async(req,res) => {
     
    try{
        //  Generate JWT token
        const {email , username , password}= loginSchema.parse(req.body)

        const userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({
                success: false,
                message: "Email not registered. Please signup first."
            });
        }

       const isMatch = await bcrypt.compare(password , userData.password)
       

        if(isMatch){
           
            const payload = {
                id : userData._id,
                email : userData.email
            }

            const Token = JWT.sign(payload , jwtSecret ,{expiresIn : "24h"} );
            userData.token = Token;

            const options = {
                expires : new Date(Date.now() + 3*24*60*60*10000),
                httpOnly : true,
                secure: true, // only if using HTTPS
                sameSite: "lax" // optional for cross-site
            }

            res.cookie("token" ,Token ,options ).status(200).json({
                success : true ,
                data : userData,
                massege : "Logged In SuccessFully"
            })

        }
        else {
            console.error(error.errors);
            return res.status(401).json({
                success :false,
                massege :"Incorrect Paasword Try Again"
            })
        }


    }
    catch(error) {
        console.log("Error in Login" , error);

        if(error.errors){ // errro in Zod Vlaidation 
                    return res.status(400).json({
                    message: "Validation failed",
                    errors: error.errors
                })
        }

         return res.status(500).json({
            success: false,
            message: "Error while login",
            error: error.message
         });
    }
}


exports.ChangePaasword = async(req,res) => {

    try{
        // TakE The data from the Body 

        const {firstname ,lastname, newPassword } = passwordSchema.parse(req.body)
        console.log("req.body ===>", req.body);

        const UserId = req.user.id;

        const UserDetails = await User.findById(UserId)
        console.log("userDeatls" , UserDetails);
        

        if(!UserDetails) {
             return res.status(400).json({
                success: false,
                message: "User Not Found"
            });
        }
        console.log("NEW pASSWORD" ,newPassword);

       const isPasswordMatch = await bcrypt.compare(
            newPassword ,
            UserDetails.password
        )
        
        

        if(!isPasswordMatch){
            
            const hashedPassword = await bcrypt.hash(newPassword , 10)
            const updatedUser = await User.findByIdAndUpdate(
                UserId ,
                {
                    password : hashedPassword,
                    firstname : firstname ,
                    lastname : lastname
                },
                {new : true}
            )

            return res.status(200).json({
                success :true,
                massege : "Paaasword Updated SuccessFully",
                data : updatedUser
            })
        }
        else {
            console.error("Please use a different password from the old one" ,)
            return res.status(500).json({
                success :false,
                massege : "try diffrent Password",
                data : updatedUser
            })
        }


    }
    catch(error) {
        console.log("Error in Chnaging Password" , error);
       console.error("ERROR --->",error);
        
        return res.status(500).json({
            success : false,
            massege : `errro While Chnaging Paasword  ` + error
        })
    }
}

exports.SerchUserFirstLastName = async(req,res) => {
    try{
        
        //Reads filter from the query string (like /bulk?filter=abc).
        const filter = req.query.filter || ""

        const users = await User.find({
            //$or → means "match if either condition is true".
            $or : [
                // Does firstName/lastname match the filter text?
                { firstname: { "$regex": filter, "$options": "i" } },
                { lastname: { "$regex": filter, "$options": "i" } }
            ]
        })

        return res.status(200).json({
            success : true,
            users  : users.map((user) => ({
                username : user.username,
                firstname : user.firstname,
                lastname : user.lastname,
                email : user.email ,
                 _id: user._id
            }) )

        })

    }
   catch(error) {
        console.log("Error in Searching User" , error);
       console.error("ERROR --->",error);
        
        return res.status(500).json({
            success : false,
            massege : `Search UserBy Their First and Last Name  ` + error
        })
    }
}

exports.logout = async (req, res) => {
  try {
    // Clear cookie by setting token to empty and expiry to immediate
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,  // keep same as you used in login
      sameSite: "lax"
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while logging out",
      error: error.message
    });
  }
};