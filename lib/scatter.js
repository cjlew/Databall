const d3 = require("d3");
const $ = require("jquery");
import PG2016 from '../assets/data/PG2016.json';

// Data for dropdowns
const YEARS = [];
for (let i = 2000; i <= 2016; i++){
  YEARS.push(i);
}

const STATS = ['PTS', 'TRB', 'STL', 'AST'];

const TEAMS = ['All', 'CLE', 'NYK', 'HOU', 'OKC', 'GSW', 'NOP', 'WAS', 'MIL'];

const POSITIONS = ['All','PG', 'SG', 'SF', 'PF', 'C'];

// Populate dropdowns

const populateYearsDropdowns = (data) => {
  let selects = d3.selectAll('.year-select')
    .selectAll('option')
    .data(data).enter()
    .append('option')
      .text(function(d) {return d;});
};

const populateStatsDropdowns = (data) => {
  let selects = d3.selectAll('.stats-selector')
    .selectAll('option')
    .data(data).enter()
    .append('option')
      .text(function(d) {return d;});
};

const populateTeamDropdowns = (data) => {
  let selects = d3.selectAll('.team-select')
    .selectAll('option')
    .data(data).enter()
    .append('option')
      .text(function(d) {return d;});
};

const populatePositionDropdowns = (data) => {
  let selects = d3.selectAll('.position-select')
    .selectAll('option')
    .data(data).enter()
    .append('option')
      .text(function(d) {return d;});
};

const makePlot = (type, xSelect, ySelect, startYear, endYear, team, position) => {

  let margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  let x = d3.scaleLinear().range([0, width]);
  let y = d3.scaleLinear().range([height, 0]);

  let svg = d3.select('.plot').append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");


  d3.json(`../assets/data/PG2016.json`, function(error, data) {
    if (error) throw error;


    data.forEach(function(d){
      d.PTS = Number(d.PTS);
      d.TRB = Number(d.TRB);
    });

    x.domain(d3.extent(data, function(d) { return d.PTS; }));
    y.domain([0, d3.max(data, function(d) { return d.TRB; })]);

    svg.selectAll("dot")
      .data(data)
    .enter().append("circle")
      .attr("r", 5)
      .attr("cx", function(d) { return x(d.PTS); })
      .attr("cy", function(d) { return y(d.TRB); });

    svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(x));

   svg.append("g")
       .call(d3.axisLeft(y));


  });
};



document.addEventListener("DOMContentLoaded", (e) => {
  populateYearsDropdowns(YEARS);
  populateStatsDropdowns(STATS);
  populateTeamDropdowns(TEAMS);
  populatePositionDropdowns(POSITIONS);

  // Check selectors
  let type = d3.select('input[name="data-type"]:checked').property('value');
  let xSelect = d3.select('#x-axis-selector').property('value');
  let ySelect = d3.select('#y-axis-selector').property('value');
  let startYear = d3.select('#start-year').property('value');
  let endYear = d3.select('#end-year').property('value');
  let team = d3.select('#team').property('value');
  let position = d3.select('#position').property('value');
  //
  makePlot(type, xSelect, ySelect, startYear, endYear, team, position);
});
