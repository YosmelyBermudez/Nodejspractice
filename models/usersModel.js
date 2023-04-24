const mongoose = require("../config/mongodb");
const bcrypt = require("bcrypt")

const usersSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
});
usersSchema.pre("save",function(next){
    this.password = bcrypt.hashSync(this.password,10)
    next()
})
module.exports = mongoose.model('users',usersSchema)