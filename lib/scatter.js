const d3 = require("d3");
import { makePlot } from './make_plot.js';
import { setupGlossary } from './glossary.js';
import { setupPlayer } from './player.js';

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
  ySelect: 'PTS',
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

  let positionSelector = document.getElementById("position");
  positionSelector.addEventListener("change", handleSelectChange);

};


document.addEventListener("DOMContentLoaded", (e) => {
  populateYearsDropdowns(YEARS);
  populateStatsDropdowns(STATS);
  populateTeamDropdowns(TEAMS);
  populatePositionDropdowns(POSITIONS);

  addEventListeners();
  setupGlossary();
  setupPlayer();

  makePlot(Parameters);
});
