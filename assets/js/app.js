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
})
};

// VISUALIZATION
// Create the main function which will set up the visualization from input data
function VisualizeData(data) {

    // Set default variables for X and Y values
    var selectedXAxis = "smoker";
    var selectedYAxis = "heartAttack";

    // Set the scales' domains and ranges
    var xScale = d3.scaleLinear()
        .range([0, width])
        .domain([0.9*(d3.min(data, (d) => {return d[selectedXAxis]; })), 1.1*(d3.max(data, (d) => {return d[selectedXAxis]; }))])
    var yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0.9*(d3.min(data, (d) => {return d[selectedYAxis]; })), 1.1*(d3.max(data, (d) => {return d[selectedYAxis]; }))]);

    // Create the axes

        // X Axis
        var xAxis = svg.append("g")
            .attr("class", "xAxis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));

        // Y axis
        var yAxis = svg.append("g")
            .attr("class", "yAxis")
            .call(d3.axisLeft(yScale));

    // Add a circle element for each data point
    svg.append("g")
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("cx", ((d) => {return xScale(d[selectedXAxis]); }))
        .attr("cy", ((d) => {return yScale(d[selectedYAxis]); }))
        .attr("r", 12);
        
    // Add state labels to scatterplot circles
    svg.append("g")
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "stateText")
        .attr("x", ((d) => {return xScale(d[selectedXAxis]); }))
        .attr("y", ((d) => {return yScale(d[selectedYAxis]); }))
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
            .attr("axis", "x")
            .attr("class", "labelText")
            .classed("active", true)
            .classed("inactive", false)
            .style("text-anchor", "middle")
            .text("Smoker (%)");

        // "Physical Activity Last Month (%)" label
        physicalActivityLabel = svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.top + 45)
            .attr("value", "physicalActivity")
            .attr("axis", "x")
            .attr("class", "labelText")
            .classed("active", false)
            .classed("inactive", true)
            .style("text-anchor", "middle")
            .text("Physical Activity Last Month (%)");

        // "Household Income (Median)" label
        householdIncomeLabel = svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.top + 70)
            .attr("value", "householdIncome")
            .attr("axis", "x")
            .attr("class", "labelText")
            .classed("active", false)
            .classed("inactive", true)
            .style("text-anchor", "middle")
            .text("Household Income (Median)");

    // Y axis labels
        
        //"Depression (%)" label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 70)
            .attr("x", 0 - (height / 2))
            .attr("value", "depression")
            .attr("axis", "y")
            .attr("class", "labelText")
            .classed("active", false)
            .classed("inactive", true)
            .style("text-anchor", "middle")
            .text("Depression (%)");       

        //"Heart Attack Ever (%)" label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 45)
            .attr("x", 0 - (height / 2))
            .attr("value", "heartAttack")
            .attr("axis", "y")
            .attr("class", "labelText")
            .classed("active", true)
            .classed("inactive", false)
            .style("text-anchor", "middle")
            .text("Heart Attack Ever (%)");
    
        //"Diabetes Ever (%)" label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 20)
            .attr("x", 0 - (height / 2))
            .attr("value", "diabetes")
            .attr("axis", "y")
            .attr("class", "labelText")
            .classed("active", false)
            .classed("inactive", true)
            .style("text-anchor", "middle")
            .text("Diabetes Ever (%)");

    // INTERACTIVITY
    // This section adds the interactive element where clicking on an axis changes the graph by updating the X or Y values to
    // match the selected input.

    // Create a function which updates the axis title and appearance when clicked
    function UpdateAxes(axis, clickedVariable) {
        // Switch the currently active variable to inactive (one of three X- or Y-variables).
        d3
          .selectAll("labelText")
          .filter("." + axis)
          .filter(".active")
          .classed("active", false)
          .classed("inactive", true);
    
        // Switch the variable just clicked to active.
        clickedVariable.classed("inactive", false).classed("active", true);
        };
    
    // Now input code for changing the data, axis scale, and axis label when clicked/selected.
    d3.selectAll("labelText").on("click", function() {
    
    // Save the selected text so I can reference it.
    var selected = d3.select(this);

    // Only update the display if an inactive display is selected (otherwise, keep the display - graph, axes, labels - the same)
    if (selected.classed("inactive")) {

        // Save the axis and axis label from the selected text.
        var axis = selected.attr("axis");
        var axisValue = selected.attr("value");

        // When x is the saved axis, execute this:
        if (axis === "x") {

            // Make the selected variable the current value for "selectedXAxis"
            selectedXAxis = axisValue;

            // Update the domain of x.
            xScale.domain([0.9*(d3.min(data, (d) => {return d[selectedXAxis]; })), 1.1*(d3.max(data, (d) => {return d[selectedXAxis]; }))])

            // Now use a transition when we update the xAxis.
            svg.select(".xAxis").transition().duration(500).call(xAxis);

            // Now update the location of the circles. Provide a transition for each state circle from the original to the new location.
            d3.selectAll("circle").each(function() {
            d3
                .select(this)
                .transition()
                .attr("cx", ((d) => {return xScale(d[selectedXAxis]); }))
                .duration(500);
            });

            // Need change the location of the state texts, too: give each state text the same motion as the matching circle.
            d3.selectAll(".stateText").each(function() {
            d3
                .select(this)
                .transition()
                .attr("x", ((d) => {return xScale(d[selectedXAxis]); }))
                .duration(500);
            });

            // Finally, change the classes of the last active label and the clicked label.
            UpdateAxes(axis, selected);
        }
        // In the other case, y is the saved axis:
        else {

            // Make the selected variable the current value for "selectedXAxis"
            selectedYAxis = axisValue;
        
            // Update the domain of y.
            yScale.domain([0.9*(d3.min(data, (d) => {return d[selectedYAxis]; })), 1.1*(d3.max(data, (d) => {return d[selectedYAxis]; }))])
        
            // Now use a transition when we update the yAxis.
            svg.select(".yAxis").transition().duration(500).call(yAxis);
        
            // Now update the location of the circles. Provide a transition for each state circle from the original to the new location.
            d3.selectAll("circle").each(function() {
            d3
                .select(this)
                .transition()
                .attr("cy", ((d) => {return yScale(d[selectedYAxis]); }))
                .duration(500);
            });
        
            // Need change the location of the state texts, too: give each state text the same motion as the matching circle.
            d3.selectAll(".stateText").each(function() {
            d3
                .select(this)
                .transition()
                .attr("y", ((d) => {return yScale(d[selectedYAxis]); }))
                .duration(500);
            });
        
            // Finally, change the classes of the last active label and the clicked label.
            UpdateAxes(axis, selected);
        }
    }
    })
};