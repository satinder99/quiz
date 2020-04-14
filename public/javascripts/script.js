
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
		.when('/test',
		{
			templateUrl : 'templates/test.html',
			controller : 'testController'
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


myapp.controller('quizController',function($scope,$http,$interval)
{ 
	$scope.score = 0;  
	$scope.cq ={};
	$scope.time = 30;
	
	//setInterval($scope.timechange,1000);
	stop = $interval(function() 
	{
		if(i<l1)
		{
			if ($scope.time >= 0) 
			{
				$scope.time -=1;
				console.log('time decreased');
			} 
			else 
			{
				$interval.cancel(stop);
				setTimeout($scope.nextques,30000);
			}
		}
		else
		{
		/*	$http(
				{
					method:'GET',
					url:'http://localhost:3000/result'
				}).then(successCall1,errorCall1);
		*/	
		}
	  }, 1000);
	var successCall=function(response)
	{
		
		i=-1;
		mydata =response.data;
		l1 = mydata.length;
		i++;
		$scope.cq=mydata[i];

		setTimeout($scope.nextques,30000);
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
	
	$scope.nextq=function(val)
	{
		l = $scope.answer;
		if(l == mydata[i].correct)
		{
			$scope.score+=1;
			console.log('right');
		}
		else
		{
			console.log('wrong');
			console.log('correct is : ',mydata[i].correct)
		}
		
	}

	$scope.nextques=function()
	{
		$scope.time = 6;
		i++;

		$scope.cq=mydata[i];
		console.log('I = ',i);
		console.log('l1 = ',l1);
	}

	$scope.timechange = function()
	{
		$scope.time -=1;
		console.log('time decreased');
	}
	/*if($scope.time>0)
			{
				console.log('time decreased outside');
				t1=setTimeout($scope.timechange,500);
			}
			else
			{
				console.log('next question outside');
				setTimeout($scope.nextques,3000);
			}
			*/
	
		/*	var successCall1=function(response)
			{
				console.log(response.data);
				$scope.members=response.data;
				console.log($scope.message);
			}
			var errorCall1=function(reason)
			{
				$scope.error=reason.statusText;
			}
*/
		});
