var cmsApp = angular.module('cmsApp', ['ngRoute', 'ngResource','ngSanitize']);

cmsApp.constant('apiPrefix', 'web');

cmsApp.config(function($routeProvider) {
    $routeProvider
            .when('/', {
                templateUrl:'public/views/home.html',
                controller:'MainController'
            })
            .when('/article/:article*', {
                templateUrl: 'public/views/article_detail.html',
                controller: 'ArticlesController'
            })
            .when('/category/:category*', {
                templateUrl: 'public/views/category.html',
                controller: 'ArticlesController'
            })
            .when('/about', {
                templateUrl: 'public/views/about.html'
            })
            .when('/contact', {
                templateUrl: 'public/views/contact.html',
                controller: 'ContactController'
            })
            .otherwise('/');
});

cmsApp.controller('MainController', function ($scope, $location, $routeParams, ArticlesService, apiPrefix) {
   
    ArticlesService.getHome().then(function (result) {
        $scope.articles = result;
    });
});

cmsApp.controller('ContactController', function ($scope, $http, apiPrefix, ArticlesService, apiPrefix) {
   
    $scope.contact = {};
    
    $scope.submitForm = function () {
        // Posting data to php file
        $http({
            method: 'POST',
            url: apiPrefix + '/contact_form',
            data: $scope.contact, //forms user object
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        })
                .success(function (data) {
                    if (data.errors) {
                        // Showing errors.
                        $scope.errors = data.errors;
                        $scope.errorName = data.errors.name;
                        $scope.errorEmail = data.errors.email;
                        $scope.errorContent = data.errors.content;
                    } else {
                        $scope.message = data.message;
                    }
                });
    };
});

cmsApp.directive("cmsAppMenu", function(ArticlesService) {
    
    return {
        restrict: 'E',
        templateUrl: 'public/constant/menu.html',
        link: function(scope, elem, attrs){
          ArticlesService.getMenu().then(function(result){
            scope.menu = result;
            
          });
        }
    };
});
