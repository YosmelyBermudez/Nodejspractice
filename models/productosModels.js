const mongoose = require("../config/mongodb")
const productsSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Obligatory field"],
        minLength:3
    },
    price:{
        type:Number,
        required:[true,"Obligatory field"],
        min:[0,"Price must be greater than zero"],
        get:function(value){
            return value*1.21
        }
    },
    code:String,
    description:String,
    category:{
        type:mongoose.Schema.ObjectId,
        ref:"categories"
    },
    quantity:Number,
    destacado:Boolean
})

productsSchema.virtual("price_currency").get(function(){
    return `$ ${this.price}`
})

productsSchema.set("toJSON",{getters:true,setters:true,virtuals:true})

module.exports = mongoose.model("productos",productsSchema)