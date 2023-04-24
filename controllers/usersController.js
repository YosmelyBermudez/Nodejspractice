const usersModel = require("../models/usersModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = {
    getAll: async function(req, res, next) {
        try{
            const documents = await usersModel.find()
            res.status(200).json(documents)

        }catch(e){
            console.log(e)
            res.status(400).json({message:e.message})
        }
        },
    validate:async function(req, res, next) {
        try{
            const users = await usersModel.findOne({email:req.body.email})
            if(!users){
                res.json({message:"Wrong email or password"})
                return
            }
            if(bcrypt.compareSync(req.body.password,users.password)){
                const token = jwt.sign({userId:users._id},req.app.get("secretKey"),{expiresIn:'1h'})
                res.json({token})
                
            }else{
                res.json({message:"Wrong email or password"})
                return
            }
            

        }catch(e){
            next(e)
        }
        },
    create: async function(req, res, next) {
        try{
            console.log(req.body)
            const document = new usersModel({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password
        })
            const product = await document.save()
            res.status(201).json(product)

        }catch(e){
            console.log(e)
            //res.status(400).json({message:e.message})
            e.status=400
            next(e)
        }
        
        }
}