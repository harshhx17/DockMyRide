const express = require('express')
const app = express()
const port = 3001
// let sentimentController = require('./controller/sentimentController.js')
// let departmentController = require('./controller/departmentController.js')
let dockerModel = require('./models/dockerModel.js')
let sellerModel = require('./models/sellerModel.js')
let buyerModel = require('./models/buyerModel.js')

const bodyParser = require('body-parser');
app.use(bodyParser());
app.set('view engine', 'ejs');
app.get('/',(req, res) => {
    res.render('home');
});

app.post('/submit',(req, res) => {
    dockerModel.insert(req, res);
})
app.get('/seller',(req, res) => {
    res.render('seller');
});

app.post('/sel',(req, res) => {
    sellerModel.insert(req, res);
})
app.get('/buyer',(req, res) => {
    res.render('buyer');
});

app.post('/buy',(req, res) => {
    buyerModel.insert(req, res);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))