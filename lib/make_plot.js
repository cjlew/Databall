const d3 = require("d3");
import { parametrize } from './parametrize.js';

export const makePlot = (Params) => {

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

    const refinedData = parametrize(data, Params);
    refinedData.forEach((d) => {

      d[Params.xSelect] = Number(d[Params.xSelect]);
      d[Params.ySelect] = Number(d[Params.ySelect]);
    });
    x.domain(d3.extent(refinedData,(d) => d[Params.xSelect]));
    y.domain([0, d3.max(refinedData,(d) => d[Params.ySelect])]);

    svg.selectAll("dot")
      .data(refinedData)
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
