const express = require('express');
const app = express();
const cors = require('cors');

//Middleware
app.use(express.json());
app.use(cors());

//Routes


app.listen(5000, () => {
    console.log('server currently running on port 5000!');
});