
var i=0;
var myapp=angular.module('mymodule',['ngRoute']);
myapp.config(function($routeProvider)
{
	$routeProvider
		.when('/',
		{
			templateUrl:'templates/home.html',
		})
		.when('/register',
		{
			templateUrl:'templates/register.html',
			//controller : 'registerController'
		})
		.when('/login',
		{
			templateUrl:'templates/login.html',
			//controller : 'loginController'
		})
		.when('/viewall',
		{
			templateUrl : 'templates/viewall.html',
			controller : 'display_all'
		})
		.when('/quiz',
		{
			templateUrl : 'templates/quiz.html',
			controller : 'quizController'
		})
		.otherwise(
			{
				templateUrl:'templates/otherWise.html',
			}
		);
});

myapp.controller('display_all',function($scope,$http)
{
	var successCall=function(response)
	{
		$scope.members=response.data;
	}
	var errorCall=function(reason)
	{
		$scope.error=reason.statusText;
	}
	$http(
        {
            method:'GET',
            url:'http://localhost:3000/viewall'
        }).then(successCall,errorCall);
});

myapp.controller('loginController',function($scope,$http)
{console.log('inside login');
	
	var successCall=function(response)
	{
		console.log(response.data);
		$scope.members=response.data;
		console.log($scope.message);
	}
	var errorCall=function(reason)
	{
		$scope.error=reason.statusText;
	}

	$http(
        {
            method:'POST',
            url:'http://localhost:3000/login'
        }).then(successCall,errorCall);
});	

myapp.controller('quizController',function($scope,$http)
{   
	var successCall=function(response)
	{	
		console.log(response.data);
		var i=0;
		$scope.answer={};
		$scope.score = 0;
		$scope.questions=response.data;
		$scope.cq=$scope.questions[0];
		$scope.nextq=function()
		{	console.log($scope.answer.op);
			console.log(response.data[i].correct);
			if($scope.answer.op == response.data[i].correct)
			{
				$scope.score +=1;
			}
			i+=1;
			$scope.cq=$scope.questions[i];
		}
	}
	var errorCall=function(reason)
	{
		$scope.error=reason.statusText;
	}
	
	$http(
        {
            method:'GET',
            url:'http://localhost:3000/quiz'
		}).then(successCall,errorCall);
		
});