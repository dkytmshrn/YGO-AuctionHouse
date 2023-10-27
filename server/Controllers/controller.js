const {User, Sell, Item, Bid} = require('../models')
const { comparePassword } = require('../Helpers/bcrypt')
const { signToken } = require('../Helpers/jwt')
const { makeItLow } = require('../Helpers/toLower')
const {OAuth2Client} = require('google-auth-library');
const axios = require ('axios')
const client = new OAuth2Client();
const midtransClient = require('midtrans-client')
const nodemailer = require('nodemailer')

class Controller {

    static async register (req, res, next) {
        try {
            const role = "Basic"
            const cash = 0
            const {username, email, password} = req.body
            await User.create({
                username, email, password, role, cash
            })
            res.status(201).json({message: "Register success"})
        } catch (error) {
            next(error)
        }
    }

    static async login (req, res, next) {
        try {
            const {email, password} = req.body
            if (!email || !password) {
                throw {name : "empty input field"}
            }
            
            const user = await User.findOne({where:{
                email: makeItLow(email)
            }})
            if (!user) {
                throw {name : "user not registered"}
            }
            const passwordValidation = comparePassword(password, user.password)
            if (!passwordValidation) {
                throw {name : "user not registered"}
            }
            const token = signToken({id:user.id, email:user.email})
            res.status(200).json({access_token: token, username : user.username, userId : user.id,  role : user.role})
        } catch (error) {
            next(error)
        }
    }

    static async changePassword (req, res, next) {
        try {
            const {password} = req.body
            if (!password) {
                throw {name : "empty input field"}
            }
            await User.update(req.body, {
                where : {
                    id : req.user.id
                },
                individualHooks : true
            })
            res.status(200).json({message : "Succesfull change password!"})
        } catch (error) {
            next(error)
        }
    }

    static async loginGOauth (req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.headers.google_token,
                audience: process.env.G_CLIENT
            });
            const payload = ticket.getPayload();
            
            let user = await User.findOne({
                where : {email : payload.email}
            })

            if (!user) {
                user = await User.create({
                    email : payload.email,
                    username : payload.email,
                    password : Math.random(),
                    role : "Basic",
                    cash : 0
                }, {
                    hooks : false
                })
            }

            let registeredUser = await User.findOne({
                where : {email : payload.email}
            })

            const token = signToken({id: registeredUser.dataValues.id, email: registeredUser.dataValues.email})
            res.status(200).json({access_token: token, email : registeredUser.dataValues.email, userId : registeredUser.dataValues.id, role : registeredUser.dataValues.role})
        } catch (error) {
            next(error)
        }
    }

    static async getAllCard(req, res, next) {
        try {
            const result = await axios ({
                url: `https://db.ygoprodeck.com/api/v7/cardinfo.php`,
            })

            const cardData = result.data
            res.status(201).json(cardData)
        } catch (error) {
            next(error)
        }
    }

    static async addSell(req, res, next) {
        try {
            const {name, price} = req.body
            const result = await axios ({
                url: `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=` + name,
            })
            
            const newPost = await Sell.create ({
                UserId : req.user.id,
                cardId : result.data.data[0].id,
                name : result.data.data[0].name,
                image : result.data.data[0].card_images[0].image_url,
                price : price,
                time : price
            })

            const transporter = nodemailer.createTransport({
                service: 'hotmail',
                auth: {
                    user: process.env.OUTLOOK_EMAIL,
                    pass: process.env.OUTLOOK_PASSWORD
                }
            })

            const {email} = req.user
            
            const options = {
                from: 'ygo_auction_dkytmshrn@outlook.com',
                to: email,
                subject: 'YGO - AUCTION HOUSE - POST NOTIFICATION',
                text: 'Your item has been posted. please be patience and wait until you got an offer.'
            }

            transporter.sendMail(options, function(err, info) {
            if(err){
                console.log(err)
                return
            }
                console.log('email sent')
            })

            res.status(201).json(newPost)
        } catch (error) {
            next(error)
        }
    }

    static async allSellPost (req, res, next) {
        try {
            const post = await Sell.findAll({
                order: [['id', 'ASC']]
            })
            res.status(200).json(post)
        } catch (error) {
            next(error)
        }
    }

    static async mySellPost (req, res, next) {
        try {
            const post = await Sell.findAll({
                where : {
                    UserId : req.user.id
                }
            })
            res.status(200).json(post)
        } catch (error) {
            next(error)
        }
    }

    static async findSellPost (req, res, next) {
        try {
            const {id} = req.params
            const post = await Sell.findByPk(id, {
                include: [
                    { model : User }
                ],
            })

            res.status(200).json(post)
        } catch (error) {
            next(error)
        }
    }

    static async deleteSellPost (req, res, next) {
        try {
            const {id} = req.body
            const post = await Sell.findByPk(id)

            if (!post) {
                throw {name : "Data not found"}
            }

            await Sell.destroy({
            where: {
                id : id
            }})
            res.status(200).json({message: "You post success to delete"})
        } catch (error) {
            next(error)
        }
    }

    static async postBid(req, res, next) {
        try {
            const {price, sellId} = req.body

            const sellPost = await Sell.findByPk(sellId)

            console.log(sellPost.dataValues.time);
            if (sellPost.dataValues.time >= price) {
                throw {name : "CanNotOffer"}
            }

            await Sell.update ({
                time : price
            }, {
                where : {
                    id : sellId
                }
            })

            await Bid.destroy ({
                where : {
                    SellId : sellId
                }
            })
            
            const newBid = await Bid.create ({
                UserId : req.user.id,
                SellId : sellId,
                price : price,
            })

            res.status(201).json(newBid)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getMyBid (req, res, next) {
        try {
            const post = await Bid.findAll({
                where : {
                    UserId : req.user.id
                },
                include: [
                    { model : Sell }
                ]
            })
            res.status(200).json(post)
        } catch (error) {
            next(error)
        }
    }

    static async getBid (req, res, next) {
        try {
            const {id} = req.params
            const post = await Bid.findAll({
                where : {
                    SellId : id
                },
                include: [
                    { model : User }
                ],
                order: [['price', 'DESC']]
            })
            res.status(200).json(post)
        } catch (error) {
            next(error)
        }
    }

    static async midtransToken(req, res, next){
        try {
            const {sellId, buyerId} = req.body

            const post = await Sell.findByPk(sellId)
            const user = await User.findByPk(buyerId) 

            let snap = new midtransClient.Snap({
                isProduction : false,
                serverKey : 'SB-Mid-server-llYhInWz5wzp4qwbMGevo1ng'
            });

            let parameter = {
                transaction_details: {
                    order_id: "ORDER_" + Math.floor(1000 + Math.random() * 230595),
                    gross_amount: post.dataValues.time
                },
                credit_card:{
                    secure : true
                },
                customer_details: {
                    name: user.username,
                    email: user.email,
                }
            };

            const token = await snap.createTransaction(parameter)
            res.status(201).json(token)
        } catch (error) {
            console.log(error)
        }
    }

    static async buyItem(req, res, next) {
        try {
            const {id} = req.body
            console.log(id);
            const soldCard = await Sell.findByPk(id)

            const newItem = await Item.create ({
                UserId : req.user.id,
                cardId : soldCard.cardId,
                name : soldCard.name,
                image : soldCard.image,
            })

            await Bid.destroy({
                where: {
                    SellId : id
            }})

            await Sell.destroy({
                where: {
                    id : id
            }})

            res.status(201).json(newItem)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async getMyItem (req, res, next) {
        try {
            const post = await Item.findAll({
                where : {
                    UserId : req.user.id
                }
            })
            res.status(200).json(post)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller