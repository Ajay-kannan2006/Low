const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');
const PORT = 8080;
require('dotenv').config();
const User = require('./models/Register');
const authRoute = require('./routes/auth.route.js')
const featureRoute = require('./routes/features.route.js')
const canvasRoute = require('./routes/canvas.route.js');
const projectRoute=require('./routes/project.route.js')
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary');

app.use(cookieParser());

app.use(cors({
    origin: 'https://low-two.vercel.app',
    credentials: true,
}))

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
cloudinary.config({
    cloud_name: 'your_cloud_name',
    api_key: 'your_api_key',
    api_secret: 'your_api_secret',
});


//DB connectivity
mongoose.connect('mongodb://localhost:27017/NoCodeLowCode')
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log("it will occuring the error"));



//it is for authentication
app.get('/', (req, res) => {
    res.cookie('hai', 'ajay')
    res.redirect('/api/auth/signin');
});

app.use('/api/auth', authRoute)
app.use('/api/features', featureRoute);
app.use('/api/canvas', canvasRoute);
app.use('/api/project', projectRoute);


// app.get('/user', async (req, res)=>{
//     try {
//         const users = await User.find();
//         res.json(users);
//         console.log("User");

//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// })

app.listen(PORT, () => {
    console.log(`The port is running on ${PORT}`);
})