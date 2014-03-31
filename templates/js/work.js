var myApp = angular.module('search',['ngResource'])

 myApp.controller('searchCtrl', function($scope,$http,$interval) {
    
    var a = 15 //refresh time in seconds
    
    $scope.refreshTime = a   
    $scope.clicked = false;
    
    $scope.stop = function() {
        $interval.cancel(loopSearch);
        $interval.cancel(timerGo);
        $scope.clicked = false;
        $scope.refreshTime = a   
    }
    

    var timerGo
    
    function startTimer() {
        if ( $scope.refreshTime == 0 ) {
            $scope.refreshTime = a
        }
        $scope.refreshTime-- 
    }
    
    
    $scope.timer = function() {
        timerGo =  $interval(startTimer,1000)
    }
    
    var loopSearch
    $scope.tweets = [];
    
    
    function perfomsearch(){
            var text = $scope.search_string;
            $http.get('/search_string',
                {  params: {'q' : text}
                }).success(function(response){
                    angular.forEach(response.statuses, function(key,value) {
                    $scope.tweets.push({text:response.statuses[value].text , name:response.statuses[value].user.name , img:response.statuses[value].user.profile_image_url_https, url: response.statuses[value].user.screen_name} )
                    })
                }).error(function(response){
                    console.log(response)
            })
    
    }; 
     
    $scope.search = function() {
        if (  $scope.tweets.length > 0 ) {
                $scope.tweets.length = 0
        }
        perfomsearch();
        $scope.clicked = true;
    }
    
    $scope.repeatSearch = function(){
        loopSearch =  $interval(perfomsearch, $scope.refreshTime*1000)
       
    }
    
    
    
    
    
    
    
    
});
