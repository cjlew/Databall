const d3 = require("d3");

class Paramatrize {
  constructor(props) {
    this.type = d3.select('input[name="type"]:checked').property('value');
    this.xSelect = d3.select('#xSelect').property('value');
    this.ySelect = d3.select('#ySelect').property('value');
    this.startYear = d3.select('#startYear').property('value');
    this.endYear = d3.select('#endYear').property('value');
    this.team = d3.select('#team').property('value');
    this.position = d3.select('#position').property('value');
  }



}
