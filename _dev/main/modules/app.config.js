angular.module('PortfolioApp').config(["$routeProvider", function ($routeProvider) {
  $routeProvider.when("/table", {
    template: '<table-list></table-list>'
  })
    .when("/", {
      template: '<hello></hello>'
    })
    .otherwise({redirectTo: '/'});
}]);