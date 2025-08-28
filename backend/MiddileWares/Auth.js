const JWT = require('jsonwebtoken')
require('dotenv').config()

const JwtKey = process.env.JWT_KEY

exports.Auth = async(req , res , next) => {

    try{
        const token = req.cookies.token || req.body.token || req.header('Authorization')?.replace("Bearer" , " ").trim()
        

        if(!token) {
            return res.status(404).json({
                success : false ,
                massege : "Token Not Found"
            })
        }

        try{

            const decode = JWT.verify(token ,JwtKey )
            console.log("Decode ==>", decode);
            req.user = decode
            
        }
        catch(err) {
            return res.status(500).json({
                success : false,
                massege :"Token is InVlaid menas expired or somthing Happend "
            })
        }
    next()
    }
    catch (error) {
    console.error("Error  --->While Verifying Token", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
      message2: error.errors 
    });
  }
}