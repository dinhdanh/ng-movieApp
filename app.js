(function(){
	'use strict';

	angular
		.module('app', ['ngRoute', 'ngCookies'])
		.config(config)
		.run(run);

	config.$inject = ['$routeProvider', '$locationProvider'];
	function config($routeProvider, $locationProvider){
		$routeProvider
			.when('/', {
				controller: 'HomeController',
				controllerAs: 'self',
				templateUrl: 'components/home/v_home.html'
			})
			.when('/login', {
				controller: 'LoginController',
				controllerAs: 'self',
				templateUrl: 'components/login/v_login.html'
			})
			.when('/register', {
				controller: 'RegisterController',
				controllerAs: 'self',
				templateUrl: 'components/register/v_register.html'
			})
			.otherwise({redirectTo: '/login'});
	}

	run.in$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
	function run($rootScope, $location, $cookieStore, $http){
		// keep user logged after page refresh
		$rootScope.globals = $cookieStore.get('globals') || {};
		if($rootScope.globals.currentUser){
			$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
		}

		$rootScope.$on('$locationChangeStart', function(event, next, current){
			// redirect to login page if not logged in and trying to access a restricted page.
			var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
			var loggedIn = $rootScope.globals.currentUser;
			if(restrictedPage && !loggedIn){
				$location.path('/login');
			}
		});
	}
})();