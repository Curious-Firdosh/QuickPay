const express = require('express')
const { signup, login, ChangePaasword, SerchUserFirstLastName, logout } = require('../Controller/signin')
const { Auth } = require('../MiddileWares/Auth')
const router = express.Router()

router.post('/signup' , signup)
router.post('/login', login)
router.put('/changepassword',Auth , ChangePaasword)
router.get('/search' , SerchUserFirstLastName )
router.post('/logout' , logout)

module.exports = router