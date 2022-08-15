var mongoose = require('mongoose')
var validate = require('validator')

let firstSchema = new mongoose.Schema(
    {
        name: {type:String, required:true},
        bio: {type:String, required:true},
        email: {type:String, validate:(value)=>{
            return validate.isEmail(value)
        }},
        age: {type:Number},
        prograd_id: {
            type: Number,
        },
        squad: {type:Number},
    }
)

const firstSchem = mongoose.model('firstModel', firstSchema)
module.exports = firstSchem

