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

// Get the data and set up initial visualization

// First create a global variable "cdcData" where the data will be stored
var cdcData;

d3.csv("data/data.csv").then(function(data) {
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
    cdcData = data;
});


function Run(cdcData) {

    // Set the scales' domains and ranges
    var x = d3.scaleLinear()
        .range([0, width])
        .domain([0.9*(d3.min(cdcData, (d) => {return d.smoker; })), 1.1*(d3.max(cdcData, (d) => {return d.smoker; }))])
    var y = d3.scaleLinear()
        .range([height, 0])
        .domain([0.9*(d3.min(cdcData, (d) => {return d.heartAttack; })), 1.1*(d3.max(cdcData, (d) => {return d.heartAttack; }))]);

    // Add a circle element for each data point
    svg.append("g")
        .selectAll("circle")
        .data(cdcData)
        .join("circle")
        .attr("cx", ((d) => {return x(d.smoker); }))
        .attr("cy", ((d) => {return y(d.heartAttack); }))
        .attr("r", 12);
        
    // Add state labels to scatterplot circles
    svg.append("g")
        .selectAll("text")
        .data(cdcData)
        .enter()
        .append("text")
        .attr("x", ((d) => {return x(d.smoker); }))
        .attr("y", ((d) => {return y(d.heartAttack); }))
        .attr("dx", "-0.65em")
        .attr("dy", "0.4em")
        .attr("font-size", "10px")
        .text((d) => {return d.stateAbbr});

    // // Create 8 more setups to account for 6 possible plots
    // function circles2 = svg.append("g")
    //     .selectAll("circle")
    //     .data(data)
    //     .join("circle")
    //     .attr("cx", ((d) => {return x(d.smoker); }))
    //     .attr("cy", ((d) => {return y(d.depression); }))
    //     .attr("r", 12);
    
    // function labels2 = svg.append("g")
    //     .selectAll("text")
    //     .data(data)
    //     .enter()
    //     .append("text")
    //     .attr("x", ((d) => {return x(d.smoker); }))
    //     .attr("y", ((d) => {return y(d.depression); }))
    //     .attr("dx", "-0.65em")
    //     .attr("dy", "0.4em")
    //     .attr("font-size", "10px")
    //     .text((d) => {return d.stateAbbr});

    // function circles3 = svg.append("g")
    //     .selectAll("circle")
    //     .data(data)
    //     .join("circle")
    //     .attr("cx", ((d) => {return x(d.smoker); }))
    //     .attr("cy", ((d) => {return y(d.diabetes); }))
    //     .attr("r", 12);
    
    // function labels3 = svg.append("g")
    //     .selectAll("text")
    //     .data(data)
    //     .enter()
    //     .append("text")
    //     .attr("x", ((d) => {return x(d.smoker); }))
    //     .attr("y", ((d) => {return y(d.diabetes); }))
    //     .attr("dx", "-0.65em")
    //     .attr("dy", "0.4em")
    //     .attr("font-size", "10px")
    //     .text((d) => {return d.stateAbbr});

    // function circles4 = svg.append("g")
    //     .selectAll("circle")
    //     .data(data)
    //     .join("circle")
    //     .attr("cx", ((d) => {return x(d.physicalActivity); }))
    //     .attr("cy", ((d) => {return y(d.heartAttack); }))
    //     .attr("r", 12);
    
    // function labels4 = svg.append("g")
    //     .selectAll("text")
    //     .data(data)
    //     .enter()
    //     .append("text")
    //     .attr("x", ((d) => {return x(d.physicalActivity); }))
    //     .attr("y", ((d) => {return y(d.heartAttack); }))
    //     .attr("dx", "-0.65em")
    //     .attr("dy", "0.4em")
    //     .attr("font-size", "10px")
    //     .text((d) => {return d.stateAbbr});

    // function circles5 = svg.append("g")
    //     .selectAll("circle")
    //     .data(data)
    //     .join("circle")
    //     .attr("cx", ((d) => {return x(d.physicalActivity); }))
    //     .attr("cy", ((d) => {return y(d.depression); }))
    //     .attr("r", 12);
    
    // function labels5 = svg.append("g")
    //     .selectAll("text")
    //     .data(data)
    //     .enter()
    //     .append("text")
    //     .attr("x", ((d) => {return x(d.physicalActivity); }))
    //     .attr("y", ((d) => {return y(d.depression); }))
    //     .attr("dx", "-0.65em")
    //     .attr("dy", "0.4em")
    //     .attr("font-size", "10px")
    //     .text((d) => {return d.stateAbbr});

    // function circles6 = svg.append("g")
    //     .selectAll("circle")
    //     .data(data)
    //     .join("circle")
    //     .attr("cx", ((d) => {return x(d.physicalActivity); }))
    //     .attr("cy", ((d) => {return y(d.diabetes); }))
    //     .attr("r", 12);
    
    // function labels6 = svg.append("g")
    //     .selectAll("text")
    //     .data(data)
    //     .enter()
    //     .append("text")
    //     .attr("x", ((d) => {return x(d.physicalActivity); }))
    //     .attr("y", ((d) => {return y(d.diabetes); }))
    //     .attr("dx", "-0.65em")
    //     .attr("dy", "0.4em")
    //     .attr("font-size", "10px")
    //     .text((d) => {return d.stateAbbr});

    // function circles7 = svg.append("g")
    //     .selectAll("circle")
    //     .data(data)
    //     .join("circle")
    //     .attr("cx", ((d) => {return x(d.householdIncome); }))
    //     .attr("cy", ((d) => {return y(d.heartAttack); }))
    //     .attr("r", 12);
    
    // function labels7 = svg.append("g")
    //     .selectAll("text")
    //     .data(data)
    //     .enter()
    //     .append("text")
    //     .attr("x", ((d) => {return x(d.householdIncome); }))
    //     .attr("y", ((d) => {return y(d.heartAttack); }))
    //     .attr("dx", "-0.65em")
    //     .attr("dy", "0.4em")
    //     .attr("font-size", "10px")
    //     .text((d) => {return d.stateAbbr});

    // function circles8 = svg.append("g")
    //     .selectAll("circle")
    //     .data(data)
    //     .join("circle")
    //     .attr("cx", ((d) => {return x(d.householdIncome); }))
    //     .attr("cy", ((d) => {return y(d.depression); }))
    //     .attr("r", 12);
    
    // function labels8 = svg.append("g")
    //     .selectAll("text")
    //     .data(data)
    //     .enter()
    //     .append("text")
    //     .attr("x", ((d) => {return x(d.householdIncome); }))
    //     .attr("y", ((d) => {return y(d.depression); }))
    //     .attr("dx", "-0.65em")
    //     .attr("dy", "0.4em")
    //     .attr("font-size", "10px")
    //     .text((d) => {return d.stateAbbr});

    // function circles9 = svg.append("g")
    //     .selectAll("circle")
    //     .data(data)
    //     .join("circle")
    //     .attr("cx", ((d) => {return x(d.householdIncome); }))
    //     .attr("cy", ((d) => {return y(d.diabetes); }))
    //     .attr("r", 12);
    
    // function labels9 = svg.append("g")
    //     .selectAll("text")
    //     .data(data)
    //     .enter()
    //     .append("text")
    //     .attr("x", ((d) => {return x(d.householdIncome); }))
    //     .attr("y", ((d) => {return y(d.diabetes); }))
    //     .attr("dx", "-0.65em")
    //     .attr("dy", "0.4em")
    //     .attr("font-size", "10px")
    //     .text((d) => {return d.stateAbbr});

    // Add the X axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // X axis labels

        // "Smoker (%)" label
        smokerLabel = svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.top + 20)
            .style("text-anchor", "middle")
            .attr("font-weight", 700)
            .text("Smoker (%)");

        // "Physical Activity Last Month (%)" label
        physicalActivityLabel = svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.top + 45)
            .style("text-anchor", "middle")
            .text("Physical Activity Last Month (%)");

        // "Household Income (Median)" label
        householdIncomeLabel = svg.append("text")
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
            .attr("font-weight", 700)
            .text("Heart Attack Ever (%)");
    
        //"Diabetes Ever (%)" label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 20)
            .attr("x", 0 - (height / 2))
            .style("text-anchor", "middle")
            .text("Diabetes Ever (%)");

};

Run(cdcData);