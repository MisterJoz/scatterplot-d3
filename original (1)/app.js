let width = 500;
let height = 500;
var padding = 20;

// create y scale
// let yMax = d3.max(birthData2011, d => d.lifeExpectancy);
// let yMin = d3.min(birthData2011, d => d.lifeExpectancy);

let yScale = d3
  .scaleLinear()
  .domain(d3.extent(birthData2011, d => d.lifeExpectancy))
  .range([height - padding, padding]);

let xScale = d3
  .scaleLinear()
  .domain(d3.extent(birthData2011, d => d.births / d.population))
  .range([padding, width - padding]);

let xAxis = d3.axisBottom(xScale);

let colorScale = d3
  .scaleLinear()
  .domain(d3.extent(birthData2011, d => d.population / d.area))
  .range(['lightgreen', 'black']);

let radiusScale = d3
  .scaleLinear()
  .domain(d3.extent(birthData2011, d => d.births))
  .range([2, 40]);

// scatterplot stuff
d3.select('svg')
  .attr('width', width)
  .attr('height', height)
  .selectAll('circle')
  .data(birthData2011)
  .enter()
  .append('circle')
  .attr('cx', d => xScale(d.births / d.population))
  .attr('cy', d => yScale(d.lifeExpectancy))
  .attr('fill', d => colorScale(d.population / d.area))
  .attr('r', d => radiusScale(d.births));

d3.select('svg')
  .append('g')
  .call(xAxis);
