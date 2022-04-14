const express = require('express')
var router = express.Router();

const {User} = require('../model/User')
const ObjectId = require('mongoose').Types.ObjectId;



// retrieves all the records from database
router.get('/', (req, res) => {

    User.find((err, users) => {
        if (err) res.status(500).json({ errorMessage: "The users information could not be retrieved." })
        else res.send(users)
    })
})

// retrives user as per the matched user id 
router.get('/:id', (req, res) => {
    const id = req.params.id

    if (ObjectId.isValid(id)) {

        User.findById(id, (err, user) => {
            if (err) res.status(500).json({ errorMessage: "The users information could not be retrieved." })
            else {
                if (user) res.send(user)

                else res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })

    } else {
        res.status(400).json({ error: 'Please enter valid id' })
    }
})

// adds new document into database
router.post('/', (req, res) => {

    if (req.body.name && req.body.email) {

        // user details
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            prograd_id: req.body.prograd_id, //generates randon id of length 4
            squad: req.body.squad
        })

        //saving data into database
        user.save((err, user) => {
            if (err) {
                res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
            }
            else res.status(201).json({ Created_User: user })
        })
    } else {
        res.status(400).json({ error: 'Please provide name/email for the user' })
    }
})

// if the specified user id is found it will update the document with new data
router.put('/:id', (req, res) => {
    const id = req.params.id


    if (!ObjectId.isValid(id)) res.status(404).json({ error: 'Please enter valid id' })

    else if (req.body.name && req.body.email) {

        const user = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            prograd_id: req.body.prograd_id,
            squad: req.body.squad
        }

        User.updateOne({ '_id': id }, user, (err, user) => {
            if (err) res.status(500).json({ errorMessage: "The user information could not be modified." })
            else {
                res.redirect(`/users/${id}`)
            }
        })
    } else {
        res.status(400).json({ error: 'Please provide name/email for the user' })
    }
})


// deleted the user document if the specified user id is found 
router.delete('/:id', (req, res) => {
    const id = req.params.id

    if (ObjectId.isValid(id)) {

        User.findByIdAndRemove(id, (err, user) => {
            if (err) res.status(500).json({ errorMessage: "The users information could not be retrieved." })
            else {
                if (user) res.status(201).json({ message: "User was deleted Successfully" })

                else res.status(404).json({ message: "The user with the specified ID does not exist." })
            }
        })

    } else {
        res.status(400).json({ error: 'Please enter valid id' })
    }
})


module.exports = router;