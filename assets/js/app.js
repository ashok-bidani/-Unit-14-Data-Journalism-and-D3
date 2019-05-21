// SET UP
// First, set the dimensions and margins of the visual
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

// DATA
// Get the data and set up initial visualization. This includes a function "Run" which handles all of the visual aspects of the display.
// Basically, we import the csv data and then create the visualization in the same section with the "Run" function.
{d3.csv("data/data.csv").then(function(cdcData) {
    cdcData.forEach(function(d) {
        d.stateAbbr = d.stateAbbr;
        d.stateName = d.stateName;
        d.smoker = +d.smoker;
        d.physicalActivity = +d.physicalActivity;
        d.householdIncome = +d.householdIncome;
        d.depression = +d.depression;
        d.diabetes = +d.diabetes;
        d.heartAttack = +d.heartAttack;
    });
    VisualizeData(cdcData)
});
};

// VISUALIZATION
// Create the main function which will set up the visualization from input data
function VisualizeData(data) {

    // Set default variables for X and Y values
    var selectedXAxis = "smoker";
    var selectedYAxis = "heartAttack";

    // Set the scales' domains and ranges
    var x = d3.scaleLinear()
        .range([0, width])
        .domain([0.9*(d3.min(data, (d) => {return d[selectedXAxis]; })), 1.1*(d3.max(data, (d) => {return d[selectedXAxis]; }))])
    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0.9*(d3.min(data, (d) => {return d[selectedYAxis]; })), 1.1*(d3.max(data, (d) => {return d[selectedYAxis]; }))]);

    // Create the axes

        // X Axis
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // Y axis
        svg.append("g")
            .call(d3.axisLeft(y));

    // Add a circle element for each data point
    svg.append("g")
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", ((d) => {return x(d[selectedXAxis]); }))
        .attr("cy", ((d) => {return y(d[selectedYAxis]); }))
        .attr("r", 12);
        
    // Add state labels to scatterplot circles
    svg.append("g")
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", ((d) => {return x(d[selectedXAxis]); }))
        .attr("y", ((d) => {return y(d[selectedYAxis]); }))
        .attr("dx", "-0.65em")
        .attr("dy", "0.4em")
        .attr("font-size", "10px")
        .text((d) => {return d.stateAbbr});

    // X axis labels

        // "Smoker (%)" label
        smokerLabel = svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.top + 20)
            .attr("value", "smoker")
            .style("text-anchor", "middle")
            .text("Smoker (%)");

        // "Physical Activity Last Month (%)" label
        physicalActivityLabel = svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.top + 45)
            .attr("value", "physicalActivity")
            .style("text-anchor", "middle")
            .text("Physical Activity Last Month (%)");

        // "Household Income (Median)" label
        householdIncomeLabel = svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.top + 70)
            .attr("value", "householdIncome")
            .style("text-anchor", "middle")
            .text("Household Income (Median)");

    // Y axis labels
        
        //"Depression (%)" label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 70)
            .attr("x", 0 - (height / 2))
            .attr("value", "depression")
            .style("text-anchor", "middle")
            .text("Depression (%)");       

        //"Heart Attack Ever (%)" label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 45)
            .attr("x", 0 - (height / 2))
            .attr("value", "heartAttack")
            .style("text-anchor", "middle")
            .text("Heart Attack Ever (%)");
    
        //"Diabetes Ever (%)" label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 20)
            .attr("x", 0 - (height / 2))
            .attr("value", "diabetes")
            .style("text-anchor", "middle")
            .text("Diabetes Ever (%)");

};