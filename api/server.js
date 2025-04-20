const express = require('express');
const app = express();
const mongoose = require('mongoose')
const cors = require('cors');
const PORT = 8080;
require('dotenv').config();
const User = require('./models/Register');
const authRoute = require('./routes/auth.route.js')
const projectRoute=require('./routes/project.route.js')
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// app.use(cors({
//     origin:'http://localhost:5174',
//     credentials: true,
// }))

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));



mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log("it will occuring the error"));



//it is for authentication
app.get('/', (req, res) => {
    res.cookie('hai', 'ajay')
    res.redirect('/api/auth/signin');
});

app.use('/api/auth', authRoute)
app.use('/api/project', projectRoute);
// server.js

app.listen(PORT, () => {
    console.log(`The port is running on ${PORT}`);
})