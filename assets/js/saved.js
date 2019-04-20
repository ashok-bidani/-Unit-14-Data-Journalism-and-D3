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

    //read the data values
    data.forEach(function(d) {
    return {
        smoker: +d.smoker,
        heartAttack: +d.heartAttack};
    })

    //set the scales' domains and ranges
    var x = d3.scaleLinear()
        .range([0, width])
        .domain([d3.min(data, (d) => {return d.smoker; }), d3.max(data, (d) => {return d.smoker; })])
    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([d3.min(data, (d) => {return d.heartAttack; }), d3.max(data, (d) => {return d.heartAttack; })])

    //add a circle element for each data point
    svg.append("g")
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", ((d) => {return x(d.smoker); }))
        .attr("cy", ((d) => {return y(d.heartAttack); }))
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

-------------------

var dataset = [[5, 10], [10, 49], [15, 30], [20, 27], [25, 120], [30, 86]];

var xScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d) {return d[0]; })])
    .range([0, width])
    
var yScale = d3.scaleLinear()
    .domain([0, d3.max(dataset, function(d) { return d[1]; })])
    .range([ height, 0 ]);
    
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
    
svg.append("g")
    .call(d3.axisLeft(y));
    
svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function (d) {return xScale(d[0]); })
    .attr("cy", function (d) {return yScale(d[1]); })
    .attr("r", 10); 