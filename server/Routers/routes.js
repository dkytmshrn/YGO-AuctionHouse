const express = require('express')
const Controller = require('../Controllers/controller')
const router = express.Router()
const authentification = require('../Middlewares/authentification')
const errorHandler = require('../Middlewares/errorHandler')
const authorization = require('../Middlewares/authorization')

router.post('/register', Controller.register)
router.post('/login', Controller.login)
router.post('/auth/google-sign-in', Controller.loginGOauth)

router.get('/cards', Controller.getAllCard)

router.use(authentification)

router.put('/password', Controller.changePassword)

router.get('/sells', Controller.allSellPost)
router.post('/sells', Controller.addSell)
router.delete('/sells', Controller.deleteSellPost)
router.get('/sells/myPost', Controller.mySellPost)
router.get('/sells/:id', Controller.findSellPost)

router.post('/bids', Controller.postBid)
router.get('/bids/myBids', Controller.getMyBid)
router.get('/bids/:id', Controller.getBid)

router.post('/payment', Controller.midtransToken)

router.post('/items', Controller.buyItem)
router.get('/items', Controller.getMyItem)

router.use(errorHandler)

module.exports = router