var express = require('express');
var app = express();

const cors = require('cors');

app.use(cors());

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to the db
var mongoose = require('mongoose').set('debug',true);

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1:27017/imgDb';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function () {
     console.log("DB Connected");  
});
//Define a schema
var Schema = mongoose.Schema;

var userDetailsSchema = new Schema({
  email: String,
  Password: String
});

var userDetailsModel = mongoose.model("userdetail", userDetailsSchema );


app.post('/login', function (req, res) {
    var query =  userDetailsModel.find({"email" : req.body.personEmail, "Password" : req.body.personPassword });
    console.log(" req.body.personEmail" ,  req.body.personEmail);
    console.log(" req.body.personEmail" ,  req.body.personPassword);
    query.exec(function (err, data) {
        if (err) {
            console.log("error", err);
             }
             else {
                console.log("data",data);
             } 
        res.send(data);
    });
    //    userDetailsModel.find(function(err,data){
    //     if(err){
    //         console.log("error in finding users");
    //     }else{
    //         console.log("user exists with name ", data);
    //         res.send(data);
    //     }
    // });
  
});

app.post('/saveLoginData', function (req, res) {

     console.log(" req.body.EmailId" ,  req.body.EmailId);
    var user = new userDetailsModel( {
        email : req.body.EmailId ,
        Password : req.body.newPassword
    });
    user.save(function(err,data){
        if(err){
            console.log("error in finding users");
        }else{
            console.log("user exists with name ", data);
            res.send(true);
        }
    });
  
});

var server = app.listen(5000, function () {
    console.log('Node server is running..');
});