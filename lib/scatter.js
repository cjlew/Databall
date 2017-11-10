const d3 = require("d3");
import PG2016 from '../assets/data/PG2016.json';

// Data for dropdowns
const YEARS = [];
for (let i = 2016; i >= 2000; i--){
  YEARS.push(i);
}

const STATS = ['PTS', 'TRB', 'STL', 'AST'];

const TEAMS = ['All', 'CLE', 'NYK', 'HOU', 'OKC', 'GSW', 'NOP', 'WAS', 'MIL'];

const POSITIONS = ['All','PG', 'SG', 'SF', 'PF', 'C'];

// Parameters for scatter plot
const Parameters = {
  type: 'PG',
  xSelect: 'PTS',
  ySelect: 'AST',
  startYear: 2016,
  endYear: 2016,
  team: 'All',
  position: 'All',
  player: null
};
// Populate dropdowns

const populateYearsDropdowns = (data) => {
  let selects = d3.selectAll('.year-select')
    .selectAll('option')
    .data(data).enter()
    .append('option')
      .attr('value', function(d) {return d;})
      .text(function(d) {return d;});
};

const populateStatsDropdowns = (data) => {
  let selects = d3.selectAll('.stats-selector')
    .selectAll('option')
    .data(data).enter()
    .append('option')
      .attr('value', function(d) {return d;})
      .text(function(d) {return d;});
};

const populateTeamDropdowns = (data) => {
  let selects = d3.selectAll('.team-select')
    .selectAll('option')
    .data(data).enter()
    .append('option')
      .attr('value', function(d) {return d;})
      .text(function(d) {return d;});
};

const populatePositionDropdowns = (data) => {
  let selects = d3.selectAll('.position-select')
    .selectAll('option')
    .data(data).enter()
    .append('option')
      .attr('value', function(d) {return d;})
      .text(function(d) {return d;});
};

const handleSelectChange = (e) => {
  e.preventDefault();
  let property = e.target.id;
  let value = e.target.value;
  Parameters[property] = value;
  makePlot(Parameters);
};

const handlePlayerSearch = (e) => {
  e.preventDefault(e);
  Parameters.player = e.target.value;
  makePlot(Parameters);

};

const addEventListeners = () => {
  let statType = document.getElementById('type');
  statType.addEventListener("change", handleSelectChange);

  let xAxisSelector = document.getElementById("xSelect");
  xAxisSelector.addEventListener("change", handleSelectChange);

  let yAxisSelector = document.getElementById("ySelect");
  yAxisSelector.addEventListener("change", handleSelectChange);

  let startYearSelector = document.getElementById("startYear");
  startYearSelector.addEventListener("change", handleSelectChange);

  let endYearSelector = document.getElementById("endYear");
  endYearSelector.addEventListener("change", handleSelectChange);

  let teamSelector = document.getElementById("team");
  teamSelector.addEventListener("change", handleSelectChange);

  let playerSelector = document.getElementById("player");
  playerSelector.addEventListener("change", handlePlayerSearch);
};


const makePlot = (Params) => {

  d3.selectAll("svg").remove();

  let margin = {top: 50, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  let x = d3.scaleLinear().range([0, width]);
  let y = d3.scaleLinear().range([height, 0]);

  let svg = d3.select('.plot').append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

  d3.json(`../assets/data/${Params.type}${Params.startYear}.json`, (error, data) => {
    if (error) throw error;
    data.forEach((d) => {
      d[Params.xSelect] = Number(d[Params.xSelect]);
      d[Params.ySelect] = Number(d[Params.ySelect]);
    });
    x.domain(d3.extent(data,(d) => d[Params.xSelect]));
    y.domain([0, d3.max(data,(d) => d[Params.ySelect])]);

    svg.selectAll("dot")
      .data(data)
    .enter().append("circle")
      .attr("r", 5)
      .attr("cx", (d) =>  x(d[Params.xSelect]) )
      .attr("cy", (d) => y(d[Params.ySelect]) );

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
  addEventListeners();
  makePlot(Parameters);
});
