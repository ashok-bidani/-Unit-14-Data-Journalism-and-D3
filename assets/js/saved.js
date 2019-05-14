// Set the dimensions and margins of the visual
var margin = {top: 20, right: 20, bottom: 70, left: 115},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


// Append the svg object to the body of the page
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom + 70)
    .attr("class", "chart")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("data/data.csv").then(function(data) {

    // Read the data values
    data.forEach(function(d) {
        d.stateAbbr = d.stateAbbr;
        d.stateName = d.stateName;
        d.smoker = +d.smoker;
        d.physicalActivity = +d.physicalActivity;
        d.householdIncome = +d.householdIncome;
        d.depression = +d.depression;
        d.diabetes = +d.diabetes;
        d.heartAttack = +d.heartAttack;
    });

    // Set the scales' domains and ranges
    var x = d3.scaleLinear()
        .range([0, width])
        .domain([0.9*(d3.min(data, (d) => {return d.smoker; })), 1.1*(d3.max(data, (d) => {return d.smoker; }))])
    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0.9*(d3.min(data, (d) => {return d.heartAttack; })), 1.1*(d3.max(data, (d) => {return d.heartAttack; }))]);

    // Add a circle element for each data point
    circles = svg.append("g")
                .selectAll("circle")
                .data(data)
                .join("circle")
                .attr("cx", ((d) => {return x(d.smoker); }))
                .attr("cy", ((d) => {return y(d.heartAttack); }))
                .attr("r", 12);
    
    // Add state labels to scatterplot circles
    svg.append("g")
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", ((d) => {return x(d.smoker); }))
        .attr("y", ((d) => {return y(d.heartAttack); }))
        .attr("dx", "-0.65em")
        .attr("dy", "0.4em")
        .attr("font-size", "10px")
        .text((d) => {return d.stateAbbr});

    // Add the X axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // X axis labels

        // "Smoker (%)" label
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.top + 20)
            .style("text-anchor", "middle")
            .text("Smoker (%)");

        // "Physical Activity Last Month (%)" label
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.top + 45)
            .style("text-anchor", "middle")
            .text("Physical Activity Last Month (%)");

        // "Household Income (Median)" label
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.top + 70)
            .style("text-anchor", "middle")
            .text("Household Income (Median)");

    // Add the Y axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // Y axis labels
        
        //"Depression (%)" label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 70)
            .attr("x", 0 - (height / 2))
            .style("text-anchor", "middle")
            .text("Depression (%)");       

        //"Heart Attack Ever (%)" label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 45)
            .attr("x", 0 - (height / 2))
            .style("text-anchor", "middle")
            .text("Heart Attack Ever (%)");
    
        //"Diabetes Ever (%)" label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 20)
            .attr("x", 0 - (height / 2))
            .style("text-anchor", "middle")
            .text("Diabetes Ever (%)"); 

    // Display the chart
    return svg.node();
});

//WORKING CODE UP TO STATUS IN WORD DOCUMENT

--------------------------------------------

// Now, we need to create three transitions for each variable on the x axis,
// and three transitions for each variable on the y axis.

// X axis transitions

function physicalActivityUpdate({

    circles.data(data)
        .attr("cx", ((d) => {return x(d.physicalActivity); }))
        .attr("r", 12);
    });
    
    physicalActivityLabel.on("click", physicalActivityUpdate)