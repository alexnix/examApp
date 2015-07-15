'use strict';

angular.module('quizPortalApp')
  .controller('MainCtrl', function ($scope, $http) {

   // $scope.tests = [
   //  	{
   //  		name: "Bussiness 1",
   //  		description: "Tests basic bussiniess process understanding.",
   //  	},

   //  	{
   //  		name: "Bussiness 2",
   //  		description: "Achives intermediate understanding of the business process.",
   //  	},

   //  	{
   //  		name: "Bussiness 3",
   //  		description: "Proves advanced undersanding of concepts involved in bussiness and negociation.",
   //  	},
    	
   //  	{
   //  		name: "Ruby",
   //  		description: "Ruby language concepts.",
   //  	},
   //  	{
   //  		name: "Ruby on Rails",
   //  		description: "Understanding og routing and API scaffolding.",
   //  	},
   //  	{
   //  		name: "Node.js",
   //  		description: "This test reqquires to know asyncronius tasks and working with npm.",
   //  	},
    	
  
   //  ];	

   //  $scope.tests2 = [{
   //  		name: "Negostiaiton 1",
   //  		description: "Alows basic negotiation practices.",
   //  	},
   //  	{
   //  		name: "Negostiaiton Advanced",
   //  		description: "Negotiation advanced skills.",
   //  	},];

   //  $scope.tests3 = [{
   //  		name: "HTML",
   //  		description: "HTML basic tags, doctypes and HTML5 DOOM structure.",
   //  	},
   //  	{
   //  		name: "CSS",
   //  		description: "Adcanced selectors and moast used properties.",
   //  	},
   //  	{
   //  		name: "CSS Adcanced",
   //  		description: "CSS frameworks like Bootstrap and Materializecss.",
   //  	},];

    $scope.categories = [];
    function loadExams() {
        $http.get('/api/exam').then(function(res){
            $scope.tests = res.data;
            res.data.forEach(function(test){
                if ( $scope.categories.indexOf(test.category) == -1 && test.category )
                    $scope.categories.push(test.category);
                //console.log(test);
            });
            $scope.filterinCateg = $scope.categories[0];
        });
    };
    loadExams();

    $scope.selectCateg = function(categ) {
        //alert(1);
        $scope.filterinCateg = categ;
    };

    $scope.tags = [];
    $scope.matchesTags = function(exam_tags) {
        if( $scope.tags == undefined || $scope.tags.length == 0){
            return true;
        }
        else{   
            var flag = true;
            $scope.tags.forEach(function(tag){
                if( exam_tags.indexOf(tag.toLowerCase()) == -1 )
                    flag = false;
            });
            return flag;
        }
    };

  });
