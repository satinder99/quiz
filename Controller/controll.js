var mongoose=require('mongoose');
var students=require('../Models/Student.js');
var session = require('express-session');
var question=require('../Models/questionbank.js');

var Users=[];
exports.list_all_students = function(req,res)
{
    students.find({},function(err,result)
    {
        if(err) throw err;
        res.json(result);
    });
};

exports.register = function(req,res)
{
    var new_request=new students(
        {   
            'name':req.body.myname,
            'password':req.body.mypassword,
            'dob':req.body.mydob,
            'semester':req.body.mysemester,
            'branch':req.body.mybranch,
            'uid':req.body.myuid,  
        });
       
    new_request.save(function(err,result)
	{
		if(err) throw err;
		res.redirect('/');
		
	});
};


exports.student_login=function(req,res)
{
	students.find({$and:[{'uid':req.body.mysuid},{'password':req.body.myspassword}]},function(err,result)
	{
		if(err) throw err
		if(result.length>=1)
        {
            user = {uid : req.body.mysuid,
                    password : req.body.myspassword
                    }
            console.log('USER IS >>>>>>>>>>>>>',user);
            res.json(user);
            res.redirect('/#!/quiz');
        }
		else
		{
			res.send('wrong');
		}
	});
};

exports.questionStoring = function(req,res)
{   console.log(req.body);
    var new_question=new question(
        {  
            'option1':req.body.myoption1,
            'option2':req.body.myoption2,
            'option3':req.body.myoption3,
            'option4':req.body.myoption4,
            'correct':req.body.mycorrect,  
            'qno':req.body.myqno,
            'questionName':req.body.myquestionName,
        });
       console.log(new_question);
    new_question.save(function(err,result)
	{
		if(err) throw err;
		res.send(new_question);
		
	});
}

exports.questionReading = function(req,res)
{
    question.find({},function(err,result)
    {
        if(err) throw err;
        console.log(result);
        res.json(result);
    });  
}

exports.resultShow = function(req,res)
{
    question.find({},function(err,result)
    {
        if(err) throw err;
        console.log(result);
        res.json(result);
    });  
}

