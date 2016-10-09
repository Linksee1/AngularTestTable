angular.module('PortfolioApp').service('fakeData', function () {
  let service = this;
  service.createData = (rows, columns) => {
    let arr = [];
    for (let i = 0; i < columns; i++) {
      arr[i] = [];
      for (let j = 0; j < rows; j++) {
        arr[i][j] = service.createRandomObject();
      }
    }
    return arr;
  };
  service.createRandomObject = () => {
    return {
      id: service.createRandomString(10),
      name: service.createRandomString(5),
      color: service.createRandomColor()
    }
  };
  service.createRandomColor = () => {
    return "rgb(" + service.createRandomInteger(0, 255) + ", " + service.createRandomInteger(0, 255) + ", " + service.createRandomInteger(0, 255) + ")"
  };
  service.createRandomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  };
  service.createRandomString = (generatedWordLength) => {
    let result = '',
      position,
      words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
      max_position = words.length - 1;
    if (!isNaN(parseFloat(generatedWordLength)) && isFinite(generatedWordLength)) {
      for (let i = 0; i < generatedWordLength; ++i) {
        position = Math.floor(Math.random() * max_position);
        result = result + words.substring(position, position + 1);
      }
      return result;
    } else {
      return "Error"
    }
  }
});