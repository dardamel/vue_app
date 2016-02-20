cmsApp.controller('ArticlesController', function ($scope, $location, $routeParams, ArticlesService, apiPrefix) {
    
    if($routeParams.category){
        ArticlesService.getCategory($routeParams.category).then(function(response){ 
            $scope.data = response; 
        });
        
    }else if($routeParams.article) {
        ArticlesService.getArticle($routeParams.article).then(function(response){ 
            $scope.data = response.data; 
        });
    }
     
});