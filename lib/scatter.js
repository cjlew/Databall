const d3 = require("d3");
import { newPlot, rePlot } from './make_plot.js';
import { setupGlossary } from './glossary.js';
import { setupPlayer } from './player.js';

// Data for dropdowns
const YEARS = [];
for (let i = 2018; i >= 2010; i--){
  YEARS.push(i);
}

const STATS = ['G', 'GS', 'MP', 'FG', 'FGA', 'FG%', '3P', '3PA', '3P%',
               '2P', '2PA', '2P%', 'eFG%', 'FT', 'FTA', 'FT%', 'ORB', 'DRB',
               'TRB', 'AST', 'STL', 'BLK', 'TOV', 'PF', 'PTS'];

const TEAMS = ['All', 'ATL', 'BOS', 'BRK', 'CHO', 'CHI', 'CLE', 'DAL',
               'DEN', 'DET', 'GSW', 'HOU', 'IND', 'LAC', 'LAL', 'MEM', 'MIA',
               'MIL', 'MIN', 'NOP', 'NYK', 'OKC', 'ORL', 'PHI', 'PHO', 'POR',
               'SAC', 'SAS', 'TOR', 'UTA', 'WAS'];

const POSITIONS = ['All','PG', 'SG', 'SF', 'PF', 'C'];

// Parameters for scatter plot
const Parameters = {
  type: 'PG',
  xSelect: 'PTS',
  ySelect: 'PTS',
  Year: 2018,
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
  if (e.target.id === 'Year' ||
      e.target.id === 'position' ||
      e.target.id === 'team' ) {
    rePlot(Parameters);
  } else {
    rePlot(Parameters);
  }
};

const handlePlayerSearch = (e) => {
  e.preventDefault(e);

  Parameters.player = e.target.value;
  newPlot(Parameters);
};

const addEventListeners = () => {
  let statType = document.getElementById('type');
  statType.addEventListener("change", handleSelectChange);

  let xAxisSelector = document.getElementById("xSelect");
  xAxisSelector.addEventListener("change", handleSelectChange);

  let yAxisSelector = document.getElementById("ySelect");
  yAxisSelector.addEventListener("change", handleSelectChange);

  let YearSelector = document.getElementById("Year");
  YearSelector.addEventListener("change", handleSelectChange);

  let teamSelector = document.getElementById("team");
  teamSelector.addEventListener("change", handleSelectChange);

  let playerSelector = document.getElementById("player");
  playerSelector.addEventListener("change", handlePlayerSearch);

  let positionSelector = document.getElementById("position");
  positionSelector.addEventListener("change", handleSelectChange);

};

const setSelectorsDefault = () => {
  d3.select('#xSelect')
    .property("value", "PTS");
  d3.select('#ySelect')
    .property("value", "PTS");

};

document.addEventListener("DOMContentLoaded", (e) => {
  populateYearsDropdowns(YEARS);
  populateStatsDropdowns(STATS);
  populateTeamDropdowns(TEAMS);
  populatePositionDropdowns(POSITIONS);

  addEventListeners();
  setupGlossary();
  setupPlayer();
  setSelectorsDefault();
  newPlot(Parameters);
});
