(function(){
	'use strict';

	angular
		.module('app')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
	function RegisterController(UserService, $location, $rootScope, FlashService){
		var self = this;

		self.register = register;
		function register(){
			self.dataLoading = true;
			UserService.Create(self.user)
				.then(function(response){
					if(response.success){
						FlashService.Success('Registration successful', true);
						$location.path('/login');
					}else{
						FlashService.Error(response.message);
	                    self.dataLoading = false;
					}
				});
		}
	}
})();