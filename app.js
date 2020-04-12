var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var engine=require('consolidate');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var controllStudent=require('./Controller/controll.js');
//database
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/QUESTIONBANK',{useNewUrlParser:true, useUnifiedTopology: true});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public/')));
app.engine('html',engine.swig);
app.set('view engine','html');

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req,res,next)
{
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Method','*');
	res.header('Access-Control-Allow-Headers','*');
//	res.header('X-Content-Type-Options: nosniff');
	next();
});

app.route('/register')
					.post(controllStudent.register);
app.route('/viewall').get(controllStudent.list_all_students);
app.route('/login').post(controllStudent.student_login);
app.route('/questionbank').post(controllStudent.questionStoring);
app.route('/quiz').get(controllStudent.questionReading);

module.exports = app;
