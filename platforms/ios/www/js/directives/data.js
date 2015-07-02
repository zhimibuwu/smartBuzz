app.directive('data',function(){
	return {

		restrict: 'E',
		scope: {

			data: '='
		},
		templateUrl:
		'js/directives/data.html'
	};
});