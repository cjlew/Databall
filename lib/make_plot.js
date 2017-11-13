const d3 = require("d3");
import { parametrize } from './parametrize.js';


const NBACOLORS = {ATL: '#C8102E', BOS: '#007A33', WAS: '#0C2340', BKN: '#010101',
                  CHA: '#201747', CHI: '#BA0C2F',
                  "CLE": '#6F263D', DAL: '#0050B5', DEN: '#418FDE',
                  DET: '#003DA5', GSW: '#003DA5', HOU: '#BA0C2F',
                  IND: '#041E42', LAC: '#D50032', LAL:'#702F8A', MEM:"#23375B;",
                  MIA:'#862633', MIL:'#2C5234', MIN:'#002B5C', NOP:'#002B5C',
                  NYK:'#003DA5', OKC:'#007DC3', ORL:'#007DC5',
                  PHI:'#006BB6', PHO:'#E56020', POR:'#F0163A;',
                  SAC:'#724C9F', SA:'#B6BFBF', TOR:'#CE1141', UTA:'#002B5C'};

const handleOpen = (e) => {
  let modal = d3.select('#player-modal')
                .classed("close", false)
                .classed("open", true);
  let playerModalStats = d3.select('#player-modal-stats').append("h1")
                              .attr("class", "player-modal-name")
                              .html(e.name);
  let stats = playerModalStats.append("ul")
                .attr('class', 'stats-ul');
  Object.keys(e).forEach((stat) => {
    if (stat !== 'name') {
    stats.append("li")
      .html(`${stat}: ` + `${e[stat]}`);
    }
  });
};

export const makePlot = (Params) => {

  d3.selectAll("svg").remove();

  let margin = {top: 50, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  let x = d3.scaleLinear().range([0, width]);
  let y = d3.scaleLinear().range([height, 0]);

  let tooltip = d3.select("body").append("div")
        .attr("class", "toolTip")
        .style("display", "none");

  let svg = d3.select('.plot').append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform","translate(" + margin.left + "," + margin.top + ")");

  d3.json(`/assets/data/${Params.type}${Params.startYear}.json`, (error, data) => {
    if (error) throw error;
    const refinedData = parametrize(data, Params);
    refinedData.forEach((d) => {
      d[Params.xSelect] = Number(d[Params.xSelect]);
      d[Params.ySelect] = Number(d[Params.ySelect]);
    });

    let min = d3.min(refinedData,(d) => d[Params.xSelect]);
    x.domain([(min - 2 <= 0 ? 0 : min - 2),
              d3.max(refinedData,(d) => d[Params.xSelect])]);
    y.domain([0, d3.max(refinedData,(d) => d[Params.ySelect])]);

    svg.selectAll("dot")
      .data(refinedData)
    .enter().append("circle")
      .attr("r", 5)
      .attr("cx", (d) =>  x((d[Params.xSelect])) )
      .attr("cy", (d) => y((d[Params.ySelect])) )
      .on("click", handleOpen)
      .on("mouseover", (d) => {
        tooltip.transition()
          .style("display", "inline-block")
          .style("left", (d3.event.pageX - 70) + "px")
          .style("top", (d3.event.pageY - 100) + "px");
        tooltip.html(d.Player + "<br/>" + `<span>${Params.xSelect}: `  + d[Params.xSelect] + "</span><br/>"
                      + (Params.xSelect === Params.ySelect ? '' : `<span>${Params.ySelect}: ` + d[Params.ySelect] + "</span><br/>"))
                      .style("background-color", `${NBACOLORS[d.Tm]}`);

      })
      .on("mouseout", function(d) {
       tooltip.transition()
         .duration(400)
         .style("display", 'none');
       });

    svg.append("g")
       .attr("class", "x-axis")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(x));


   svg.append("g")
       .attr("class", "y-axis")
       .call(d3.axisLeft(y));


    svg.append('text')
    .attr("class", "label")
    .attr("transform","translate(" + (width - 20) + " ," + (height-5) + ")")
    .style("fill", "white")
    .style("text-anchor", "middle")
    .text(`${Params.xSelect}`);

    svg.append('text')
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("y", 1)
      .attr("x", (height/2 - 250))
      .attr("dy", "1em")
      .style("font-family", "sans-serif")
      .style("fill", "white")
      .style("text-anchor", "middle")
      .text(`${Params.ySelect}`);
    });
};
