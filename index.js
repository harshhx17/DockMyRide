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
app.get('/',(req,res) =>{
	res.render('userlogin');
});
app.post('/login_seller',(req, res) => {
    sellerModel.authenticate(req.body['email'], req.body['passwd'])
    .then((user) => {
        userData = user;
        res.render('addDocker',{'user':userData});
    })
})
app.post('/login_buyer',(req, res) => {
   	buyerModel.authenticate(req.body['email'], req.body['passwd'])
   	.then((user) => {
        userData = user;
        res.render('market',{'user':userData});
    })
});
app.get('/login_seller',(req, res) => {
    res.render('userlogin');
});
app.get('/login_buyer',(req, res) => {
    res.render('userlogin');
});
app.post('/sel',(req, res) => {
    sellerModel.insert(req, res);
});

app.post('/buy',(req, res) => {
    buyerModel.insert(req, res);
})

app.get('/register',(req, res) => {
    res.render('register');
})

app.get('/market_place', (req, res) => {
    res.render('marketPlace');
})

app.listen(port, () => console.log(`App listening on port ${port}!`))