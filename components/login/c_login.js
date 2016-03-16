(function(){
	'use strict';

	angular
		.module('app')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
	function LoginController($location, AuthenticationService, FlashService){
		var self = this;

		self.login = login;

		(function initController(){
			// reset login
			AuthenticationService.ClearCredentials();
		})();

		function login(){
			self.dataLoading = true;
			AuthenticationService.Login(self.username, self.password, function(response){
				if(response.success){console.log(response);
					AuthenticationService.SetCredentials(self.username, self.password);
					$location.path('/');
				}else{console.log(response);
					FlashService.Error(response.message);
					self.dataLoading = false;
				}
			});
		}
	}
})();