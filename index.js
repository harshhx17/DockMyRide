const express = require('express')
const app = express()
const port = 3001
// let sentimentController = require('./controller/sentimentController.js')
// let departmentController = require('./controller/departmentController.js')
let dockerModel = require('./models/dockerModel.js')

const bodyParser = require('body-parser');
app.use(bodyParser());
app.set('view engine', 'ejs');
app.get('/',(req, res) => {
    res.render('home');
});

app.post('/submit',(req, res) => {
    dockerModel.insert(req, res);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))