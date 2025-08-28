const express = require('express')
const { cheackBalance, TransferMoney } = require('../Controller/AccountController')
const { Auth } = require('../MiddileWares/Auth')

const router = express.Router()

router.get('/balance' ,Auth , cheackBalance)
router.post('/transfer' , Auth , TransferMoney)

module.exports = router