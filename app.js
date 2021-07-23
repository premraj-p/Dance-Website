const express = require("express");
const path = require("path");
var mongoose=require('mongoose');
const bodyparser=require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser:true});
const app = express();
const port = 8000;

//define mongoose schema
var contactSchema= new mongoose.Schema({
      name:String,
      email:String,
      desc:String,
      phone:String,
      address:String
});

var Contact = mongoose.model('Contact', contactSchema);





//serving static files
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//for pug
app.set('view engine', 'pug')   //set template engine as pug
app.set('views', path.join(__dirname, 'views'))   //set view directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
    res.send("Data saved")
    }).catch(()=>{
    res.status(400).send("Data not saved")
});
})



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});