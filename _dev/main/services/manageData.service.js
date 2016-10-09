angular.module('PortfolioApp').service('manageData', function (fakeData) {
  let service = this;
  service.setFakeData = (rows, columns) => {
    service._innerData = fakeData.createData(rows, columns)
  };
  service.getFakeData = (offset) => {
    if (service._innerData) {
      let resultArray = [];
      resultArray.push(service._innerData.slice(0, offset));
      console.log (service._innerData);
      console.log (resultArray);
      return resultArray
    }
  }
});