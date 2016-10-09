function dataTableController($rootScope, $scope, fakeData) {
  $rootScope.pageTitle = "Таблица";
  const CELL_HEIGHT = 32,
    ADDITIONAL_ROWS = 10;
  let data = fakeData.createData(8, 256);
  $scope.setRows = (addRows) => {
    let windowHeight = $(window).height(),
      rowsNumber = Math.round(windowHeight / CELL_HEIGHT + ADDITIONAL_ROWS + addRows);
    console.log (rowsNumber);
    $scope.dataToParse = data.slice(0, rowsNumber);
    console.log ($scope.dataToParse);
  };
  $scope.setInfiniteScroll = (addRows) => {
    $('table-list').on('scroll', function() {
      if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
        $scope.setRows(addRows);
        addRows += 10;
        $scope.$apply();
      }
    });
  };
  $scope.setRows(0);
  $scope.setInfiniteScroll(10);
  $scope.setColor = (obj, color) => {
    if (obj.currentTarget.style.backgroundColor !== color) {
      obj.currentTarget.style.backgroundColor = color;
    } else {
      obj.currentTarget.style.backgroundColor = "rgb(255,255,255)";
    }
  };
}
angular.module('PortfolioApp').component('tableList', {
  templateUrl: '../main/dataTable/template.html',
  controller: dataTableController
});