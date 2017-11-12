const d3 = require("d3");

const handleExit = (e) => {
  e.preventDefault();
  let modal = d3.select('#player-modal')
                .classed("open", false)
                .classed("close", true);

  d3.select('.player-modal-name').remove();
  d3.select('.stats-ul').remove();
};


export const setupPlayer = () => {
  let exitButton = document.getElementById('player-close')
                    .addEventListener('click', handleExit);

};
