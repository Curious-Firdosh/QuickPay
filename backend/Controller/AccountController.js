const { default: mongoose } = require("mongoose");
const Account = require("../Model/Account");

exports.cheackBalance = async (req, res) => {

    try{

        const userId = req.user.id 

        const account  = await Account.findOne({userId})

        return res.status(200).json({
            accountBalance: account.accountBalance ,
            massege : "That is Your Account Balance"
        })
    }
    catch(error) {
        console.log("Error in Cheacking Balance" , error);
       console.error("ERROR --->",error);
        
        return res.status(500).json({
            success : false,
            massege : `errro While Cheacking Balance  ` + error
        })
    }
}

exports.TransferMoney = async(req,res) => {

    try{
        const {amount , to } = req.body
        // Start a new session 
        const session = await mongoose.startSession()
        
        // Begin a new transaction 
        session.startTransaction()

        // The app checks your account inside this session.
        const account = await Account.findOne({userId : req.user.id}).session(session);

        //If your balance is less than ₹100, the app aborts the transaction:
        if(!account || account.accountBalance < amount ){
            await session.abortTransaction()
            return res.status(400).json({ message: "Insufficient balance" });
        }

        //If your balance is okay, the app now checks your friend’s account:
        const toAccount = await Account.findOne({userId : to}).session(session)

        // If the recipient account does not exist,
        if(!toAccount){
            await session.abortTransaction();
            return res.status(400).json({ message: "Invalid account" });
        }

        //Now we update both accounts inside the same transaction:

        await Account.updateOne(
            {userId : req.user.id},
            {'$inc' : {accountBalance : -amount}}
        ).session(session)

        await Account.updateOne(
            {userId : to},
            {"$inc" : {accountBalance : amount}}
        )

        //Everything worked. Time to seal the envelope and submit it.
        await session.commitTransaction()

    
        return res.json({
             massege : `Transfer SuccessFull of Amount : ${amount}`
        })


    }
     catch(error) {
        console.log("Error in Transfer Money" , error);
        console.error("ERROR --->",error);
        
        return res.status(500).json({
            success : false,
            massege : `errro While Transfer Money  ` + error
        })
    }
    
}