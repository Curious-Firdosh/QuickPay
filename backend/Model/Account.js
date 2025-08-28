const mongoose= require('mongoose')

const AccountSchema = new mongoose.Schema({

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    accountBalance :{
        type : Number,
        required : true
    }
})

module.exports =mongoose.model("Account" , AccountSchema)