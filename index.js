const express = require('express')
const app = express()
const port = 3001
// let sentimentController = require('./controller/sentimentController.js')
// let departmentController = require('./controller/departmentController.js')
let dockerModel = require('./models/dockerModel.js')
let sellerModel = require('./models/sellerModel.js')
let buyerModel = require('./models/buyerModel.js')
let transfer = require('./transfer.js')
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
        return dockerModel.fetchAll();
    })
    .then((data) => {
        res.render('addDocker',{'data':data, userData});
    })
});
app.post('/login_buyer',(req, res) => {
   	buyerModel.authenticate(req.body['email'], req.body['passwd'])
   	.then((user) => {
        userData = user;
        return dockerModel.fetchAll();
    })
    .then((data) => {
        res.render('marketPlace',{'data':data, 'user':userData});
    })
});
app.get('/login_seller',(req, res) => {
    res.render('userlogin');
});
app.get('/login_buyer',(req, res) => {
    res.render('userlogin');
});
app.get('/payment',(req, res) => {
	var id = req.query.id;
    res.render('payment',{'id': id});
});
app.post('/pay',(req,res) => {
	transfer.transact();
	res.render('completed');
})
app.post('/sel',(req, res) => {
    sellerModel.insert(req, res);
});

app.post('/buy',(req, res) => {
    buyerModel.insert(req, res);
});

app.get('/register',(req, res) => {
    res.render('register');
});

app.post('/submit',(req, res) => {
    dockerModel.insert(req, res);
});

app.get('/market_place', (req, res) => {
    dockerModel.fetchAll().then((data) => {
        console.log(data)
        res.render('marketPlace', {'data': data})
    })
})

app.get('/q',(req, res) => {
    dockerModel.fetchAll().then((data) => {
        console.log(data)
        res.render('addDocker', {'data': data})
    })
});
app.listen(port, () => console.log(`App listening on port ${port}!`))