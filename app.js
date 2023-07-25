const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser');
require('dotenv').config()

const PORT = process.env.PORT || 5000



//require database models
const User = require('./models/users')
const Post = require('./models/posts')


//middlewears
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

//database
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
let dbUrl = 'mongodb+srv://halaswamyn2000:0IqxSchH32DPl1kJ@cluster0.stqarem.mongodb.net/practice'
mongoose.connect(dbUrl).then(() => {
    console.log('dataBase connected')
})


app.post('/signup', async (req, res) => {


    let UserData = await User.findOne({ email: req.body.email })

    try {
        if (UserData) {
            res.send({ message: 'already use in this Email' })
        } else {
            const userdata = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            await userdata.save();
            res.send({ message: 'user created' })

        }
    } catch (err) {
        res.send(err)
    }



})

app.post('/login', async (req, res) => {

    let UserData = await User.findOne({ email: req.body.email })

    try {


        if (UserData) {
            if (req.body.password == UserData.password) {

                res.send({ message: 'login successfully' })

            } else {
                res.send({ message: 'login failed' })
            }
        } else {
            res.send({ message: 'no account seems to this email' })
        }

    } catch (error) {
        res.send(error)
    }

})

app.post('/add-post', async (req, res) => {

    const PostData = new Post({
        _id: req.body._id,
        name: req.body.name,
        photo: req.body.photo,
        photo2: req.body.photo2,
        contact: req.body.contact,
        email: req.body.email,
        address: req.body.address,
        Business: req.body.Business,
        location: req.body.location,
        time: req.body.time

    })

    try {

        await PostData.save()
        res.send({ message: 'data saved' })

    } catch (error) {
        res.send(error)
    }

})

app.get('/list', async (req, res) => {
    try {
        let data = await Post.find()
        res.json(data)
    } catch (error) {
        res.send(error)
    }

})
app.get('/list/:id', async (req, res) => {
    try {
        const singlePost = await Post.findById(req.params.id)
        res.send(singlePost)
    } catch (error) {
        res.send(error)
    }

})

app.delete('/list/:id', async (req, res) => {
    try {
        let deleteData = await Post.findByIdAndDelete(req.params.id)
        res.send(deleteData)
    } catch (error) {
        res.send(error)
    }
})


app.put('/list/:id', async (req, res) => {
    try {

        const updatedData = req.body;

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, updatedData);

        if (updatedPost) {
            res.json({ message: 'Post updated successfully', post: updatedPost });
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});


app.listen(PORT, () => {
    console.log('listenig localhost 5000')
})