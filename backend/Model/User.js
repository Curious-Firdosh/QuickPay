const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String ,
        required : true,
        minLength : 3 ,
        maxLength :30 ,
        trim :true ,
        lowercase :true,
        unique : true
    },
    firstname : {
        type : String ,
        required : true,
        maxLength : 50 ,
        trim :true
    },
    lastname : {
        type : String ,
        required : true,
        maxLength : 50 ,
        trim :true
    },
    email : {
        type : String,
        required :true,
        trim :true
    },
    password :{
         type : String,
         required :true,
         minLength : 6 ,
    },
    token : {
        type : String
    }
})

module.exports = mongoose.model("User" , userSchema)

