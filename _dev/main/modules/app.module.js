'use strict';
angular.module('PortfolioApp', [
  'ngRoute',
  'ngSanitize'
]).controller('mainCtrl', ["$rootScope", function ($rootScope) {
  $rootScope.pageTitle = "Поиск";
}]);
