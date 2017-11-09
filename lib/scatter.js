const d3 = require("d3");
const $ = require("jquery");

// Data for dropdowns
const years = [];
for (let i = 2000; i <= 2016; i++){
  years.push(i);
}

const stats = ['PTS', 'TRB', 'STL', 'AST'];

const teams = ['CLE', 'NYK', 'HOU', 'OKC', 'GSW', 'NOP', 'WAS', 'MIL'];


// Populate dropwdowns

const populateYearsDropdowns = (yearsData) => {
  let selects = d3.selectAll('.year-select');
  selects.forEach((select) => {
  let options = selects
    .selectAll('option')
    .data(yearsData).enter()
    .append('option')
      .text(function(d) {return d;});
    });
};

document.addEventListener("DOMContentLoaded", (e) => {
  populateYearsDropdowns(years);

});
