cmsApp.factory('ArticlesService', function($http, apiPrefix) {
    
    return {
        getHome: function(){
            return $http.get(apiPrefix + '/home').success(function(response){
                return response;
            });
            
        },
        getMenu: function(){
            return $http.get(apiPrefix + '/menu').success(function(response){
                return response;
            });
            
        },
        getCategory: function(category) {
            return $http.get(apiPrefix + '/category/' +category).success(function(response){
                return response;
            });
            
        },
        getArticle: function(path) {
            return $http.get(apiPrefix + '/article/'+path).success(function(response){
                return response;
            });
            
        }
    }
});

cmsApp.factory('getMenuService', function(ArticlesService){
    return ArticlesService.getMenu();
});

