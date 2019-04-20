//set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 40, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


//append the svg object to the body of the page
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "chart")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//get the data
d3.csv("testdata.csv").then(function(data) {

    //set the scales' domains and ranges
    var x = d3.scaleLinear()
        .range([0, width])
        .domain([d3.min(data, (d) => {return +d.x; }), d3.max(data, (d) => {return +d.x; })])
    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([d3.min(data, (d) => {return +d.y; }), d3.max(data, (d) => {return +d.y; })])

    //add a circle element for each data point
    svg.append("g")
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", ((d) => {return x(+d.x); }))
        .attr("cy", ((d) => {return y(+d.y); }))
        .attr("r", 10);
    
    //add the X axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    //add the Y axis
    svg.append("g")
        .call(d3.axisLeft(y));

    //display the chart
    return svg.node();
});