const mongoose=require('mongoose'), Schema=mongoose.Schema;
const UserDetail=new Schema({
    name: String,
    email: String,
    age: Number,
    Prograd_id: Number,
    squad: Number
})

const User=mongoose.model('User',UserDetail);
module.exports={User};