var express=require('express');
var nodemailer = require("nodemailer");
var bodyParser = require('body-parser')
var app = express();

/*
	Here we are configuring our SMTP Server details.
	STMP is mail server which is responsible for sending and recieving email.
*/

var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'csvishii@gmail.com',
        pass: 'Csvishii123#'
    },
    tls: {rejectUnauthorized: false},
    debug: true
});

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

app.post('/sendmail', function(req, res){
	console.log(req.body);
	var mailOptions={
		to : req.body.to,
		subject : req.body.subject,
		text : req.body.text
	}
	// console.log(mailOptions);
	smtpTransport.sendMail(mailOptions, function(error, response){
   	 if(error){
        	console.log(error);
		res.end("error");
	 }else{
        	console.log("Message sent: " + response.message);
		res.end("sent");
    	 }
	});
});

/*--------------------Routing Over----------------------------*/

app.listen(3000,function(){
	console.log("Express Started on Port 3000");
});
