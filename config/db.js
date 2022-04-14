const mongoose= require('mongoose')
mongoose.connect('mongodb+srv://System:root@cluster0.xexia.mongodb.net/Program?retryWrites=true&w=majority',
{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(ok =>console.log("Connected to mongodb"))
.catch(err =>console.log("mongodb connection error",err))

module.exports = mongoose;