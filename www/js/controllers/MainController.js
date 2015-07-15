app.controller('MainController',['$scope','bus',function($scope,bus){
        // bus.then(function(info){
        	bus.success(function(info){
        	//alert(info);
            $scope.busInfo = info[0];
        })
    }]
);