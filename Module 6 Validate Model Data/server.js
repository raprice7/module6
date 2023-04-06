const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();
app.listen(3000, () => console.log("Server is running"));

mongoose.connect(
    'mongodb+srv://raprice7:PaSsWoRd@cluster1.qzuybrs.mongodb.net/?retryWrites=true&w=majority', //used to get value from environment variable
    {
        useNewUrlParser: true,
        useUnifiedTopology:true
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error(error));


