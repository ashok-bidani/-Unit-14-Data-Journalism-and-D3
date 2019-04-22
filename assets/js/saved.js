// Set the dimensions and margins of the visual
var margin = {top: 20, right: 20, bottom: 70, left: 70},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


// Append the svg object to the body of the page
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "chart")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("data.csv").then(function(data) {

    // Read the data values
    data.forEach(function(d) {
        d.smoker = +d.smoker;
        d.heartAttack = +d.heartAttack;
        d.stateAbbr = d.stateAbbr;
    });

    // Set the scales' domains and ranges
    var x = d3.scaleLinear()
        .range([0, width])
        .domain([0.9*(d3.min(data, (d) => {return d.smoker; })), 1.1*(d3.max(data, (d) => {return d.smoker; }))])
    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0.9*(d3.min(data, (d) => {return d.heartAttack; })), 1.1*(d3.max(data, (d) => {return d.heartAttack; }))]);

    // Add a circle element for each data point
    svg.append("g")
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", ((d) => {return x(d.smoker); }))
        .attr("cy", ((d) => {return y(d.heartAttack); }))
        .attr("r", 12);

    // Add the X axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // X axis label
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.top + 20)
        .text("Smoker (%)");

    // add the Y axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // Y axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Heart Attack Ever (%)");
    
    //display the chart
    return svg.node();
});

----------------------------------------

    // Y axis labels
        
        //"Depression Ever (%)" label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 20)
            .attr("x", 0 - (height / 2))
            .style("text-anchor", "middle")
            .text("Depression Ever (%)");

        //"Diabetes Ever (%)" label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 45)
            .attr("x", 0 - (height / 2))
            .style("text-anchor", "middle")
            .text("Depression Ever (%)");            

        //"Heart Attack Ever (%)" label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 70)
            .attr("x", 0 - (height / 2))
            .style("text-anchor", "middle")
            .text("Heart Attack Ever (%)");