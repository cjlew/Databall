const d3 = require("d3");

const handleExit = (e) => {
  e.preventDefault();
  let modal = d3.select('#glossary-modal')
                .classed("open", false)
                .classed("close", true);
};

const handleOpen = (e) => {
  e.preventDefault();
  let modal = d3.select('#glossary-modal')
                .classed("close", false)
                .classed("open", true);
};

export const setupGlossary = () => {
  let exitButton = document.getElementById('glossary-close')
                    .addEventListener('click', handleExit);
  let openButton = document.getElementById('glossary-open')
                    .addEventListener('click', handleOpen);


};
