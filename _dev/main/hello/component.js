function helloController($rootScope) {
  $rootScope.pageTitle = "Приветствие!";
}
  
angular.module('PortfolioApp').component('hello', {
  templateUrl: '../main/hello/template.html',
  controller: helloController
});