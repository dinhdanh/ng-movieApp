(function(){
	'use strict';

	angular
		.module('app')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['UserService', '$rootScope'];
	function HomeController(UserService, $rootScope){
		var self = this;

		self.user = null;
		self.allUser = [];
		self.deleteUser = deleteUser;

		initController();

		function initController(){
			loadCurrentUser();
			loadAllUsers();
		}

		function loadCurrentUser(){
			UserService.GetByUsername($rootScope.globals.currentUser.username)
				.then(function(user){
					self.user = user;
				});
		}

		function loadAllUsers(){
			UserService.GetAll()
				.then(function(users){
					self.allUsers = users;
				});
		}

		function deleteUser(id){
			UserService.Delete(id)
				.then(function(){
					loadAllUsers();
				});
		}
	}
})();