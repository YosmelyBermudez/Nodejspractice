const categoriesModel = require("../models/categoriesModel")

module.exports = {
    getAll: async function(req, res, next) {
        try{
            const documents = await categoriesModel.find()
            res.status(200).json(documents)

        }catch(e){
            console.log(e)
            res.status(400).json({message:e.message})
        }
        },
    create: async function(req, res, next) {
        try{
            console.log(req.body)
            const document = new categoriesModel({
                name : req.body.name
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