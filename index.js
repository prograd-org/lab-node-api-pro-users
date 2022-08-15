var express = require('express')
var cors = require('cors')
var app = express()
var mongoose = require('mongoose')
var firstSchema = require('./schema.js')
app.use(express.json())
app.use(cors())

let dbUrl = 'mongodb+srv://actuallyroy:Pzha5qkdxQTgnyQH@cluster0.hrmerlo.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(dbUrl)
.then(res => console.log("Connection established"))
.catch(err => console.log(">>", err))

app.get('/api/users', async (req, res) => {
    try{
        let list = await firstSchema.find();
        res.send(list)
    }catch(err){
        res.statusCode = 500
        res.json({ errorMessage: "The users information could not be retrieved." })
    }
})

app.get('/api/users/:id', async(req, res) => {
    try{
        let list = await firstSchema.find({prograd_id: req.params.id});
        if(list.length == 0){
            statusCode = 404
            res.json({ message: "The user with the specified ID does not exist." })
        }else{
            res.send(list)
        }
    }catch(err){
        res.statusCode = 500
        res.json({ errorMessage: "The users information could not be retrieved." })
    }
})


app.post('/api/users', async(req, res) => {
    if(Object.keys(req.body).length == 0){
        res.statusCode = 400;
        res.json({errorMessage: "Please provide a name and bio for the user."})
    }else{
        res.statusCode = 201;
        try {
            let data = await firstSchema.find({}, {prograd_id: 1, _id: 0}, {sort: {prograd_id: -1}});
            let list = await new firstSchema(req.body)
            list.prograd_id = data[0].prograd_id + 1;
            await list.save()
            res.json(list)
        } catch (error) {
            res.statusCode = 500;
            res.json({ errorMessage: "There was an error while saving the user to the database" })
        }
    }
})

app.delete('/api/users/:id', async (req, res) => {
    try {
        let list = await firstSchema.deleteOne({prograd_id: req.params.id})
        if(list.deletedCount == 0){
            res.statusCode = 404;
            res.json({ errorMessage: "The user with the specified ID does not exist." })
        }else{
            res.json({
                message: 'user deleted successfully'
            })
        }
    } catch (error) {
        res.statusCode = 500
        res.json({ errorMessage: "The user could not be removed" })
    }
})

app.put('/api/users/:id', async (req, res) => {
    if(Object.keys(req.body).length == 0){
        res.statusCode = 400;
        res.json({errorMessage: "Please provide a name and bio for the user."})
    }else{
        try {
            let list = firstSchema.findOneAndUpdate({prograd_id: req.params.id}, req.body, {}, async function(res1, doc){
                if(!doc){
                    res.statusCode = 404;
                    res.json({ message: "The user with the specified ID does not exist." })
                }else{
                    res.statusCode = 200;
                    let updated = await firstSchema.find({prograd_id: req.params.id})
                    res.json({updated})
                }
            })
        } catch (error) {
            res.statusCode = 500
            res.json({ errorMessage: "The user information could not be modified." })
        }
    }
})


app.listen(process.env.PORT || 3000, () => console.log('listening on port 3000'));
