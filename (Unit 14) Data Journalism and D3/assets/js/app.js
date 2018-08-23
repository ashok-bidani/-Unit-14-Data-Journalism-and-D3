// Create the margins and size of the SVG
    var svgWidth = 960;
    var svgHeight = 500;

    var margin = {
        top: 20,
        right: 40,
        bottom: 80,
        left: 100
    };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    // // Create an SVG wrapper, append an SVG group that will hold our chart,
    // // and shift the latter by left and top margins.
    var svg = d3
        .select("#chart")
        //.append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    // // Append an SVG group
    var chartGroup = svg.append("g")
        .classed('chartGroup', true)
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // // Initial Params
    var XAxis = "poverty";
    var YAxis = "diabetesPercentage";

    // function used for updating circles group with new tooltip
    function updateXToolTip(XAxis, circlesGroup) {

        switch (chosenXAxis) {
            default: //"poverty"
                var label = "Poverty:";
                var value = 'poverty';
        }

        var toolTip = d3.tip()
            .attr("class", "tooltip")
            .offset([0, -margin.top * 2])
            .html(function (d) {
                return (`${d.state}<br>${label} ${d[value]}`);
            });

        var circlesGroup = chartGroup.selectAll("circle");

        circlesGroup.call(toolTip);

        circlesGroup.on("mouseover", function (data) {
            //toolTip.show(data);
            toolTip.show(data, this)
        })
            // onmouseout event
            .on("mouseout", function (data, index) {
                toolTip.hide(data, this);
            });

        return circlesGroup;
    }

    function updateToolTip(YAxis, YAxis) {

        switch (XAxis) {
            default: //"poverty"
                var label = "Poverty:";
                var value = 'poverty';
        }

        switch (YAxis) {
            default: //"diabetes"
                var ylabel = "Diabetes Percentage:";
                var yvalue = 'diabetesPercentage';
        }

        var toolTip = d3.tip()
            .attr("class", "tooltip")
            .offset([0, -margin.top * 2])
            .html(function (d) {
                return (`${d.state}<br>${ylabel} ${d[yvalue]}<br>${label} ${d[value]}`);
            });

        var circlesGroup = chartGroup.selectAll("circle")

        circlesGroup.call(toolTip);

        circlesGroup.on("mouseover", function (data) {
            //toolTip.show(data);
            toolTip.show(data, this)
        })
            // onmouseout event
            .on("mouseout", function (data, index) {
                toolTip.hide(data, this);
            });

        return circlesGroup;
    }

    // // Retrieve data from the CSV file and execute everything below
    d3.csv("./data/cleanedData.csv", function (err, chartData) {
        if (err) throw err;

        // parse data
        chartData.forEach(function (data) {
            data.poverty = +data.poverty;
            data.diabetesPercentage = +data.diabetesPercentage;
        });

        function xScale(chartData, chosenXAxis) {
            // create scales
            var xLinearScale = d3.scaleLinear()
                .domain([d3.min(chartData, d => d[chosenXAxis]) * 0.8,
                d3.max(chartData, d => d[chosenXAxis]) * 1.2
                ])
                .range([0, width]);
    
            return xLinearScale;
        }
            function yScale(chartData, chosenYAxis) {
            // Create y scale
            var yLinearScale = d3.scaleLinear()
                .domain([0, d3.max(chartData, d => d[chosenYAxis])])
                .range([height, 0]);
    
            return yLinearScale;
        }

        // xLinearScale function above csv import
        var xLinearScale = xScale(chartData, XAxis);
        var yLinearScale = yScale(chartData, YAxis);

        // Create initial axis functions
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        // append x axis
        var xAxis = chartGroup.append("g")
            .classed("x-axis", true)
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

        // append y axis
        var yAxis = chartGroup.append("g")
            .call(leftAxis);

        // append initial circles
        //JOIN
        var circlesGroup = chartGroup.selectAll("circle")
            .data(chartData);


        //ENTER
        circlesGroup
            .enter()
            .append('g').attr('class', 'circle')
            .append("circle")
            .attr("cx", d => xLinearScale(d[XAxis]))
            .attr("cy", d => yLinearScale(d[YAxis]))
            .attr("r", 20)
            .attr("fill", "lightBlue")
            .attr("opacity", ".5");

        var text = chartGroup.selectAll("text")
            .data(chartData)
            .enter()
            .append("g")
            .classed("circleText", true)
            .append("text");

        var textLabels = text
            .attr("x", d => xLinearScale(d[XAxis]))
            .attr("y", d => yLinearScale(d[YAxis]))
            .attr("dy", ".30em")
            .attr("dx", "-.10em")
            .text(function (d) { return d.abbr; })
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("text-anchor", "middle") 
            .attr("fill", "white");

        // Create group for  3 x- axis labels
        var xLabelsGroup = chartGroup.append("g")
            .attr("transform", `translate(${width / 2}, ${height + 20})`);

        // Create group for  3 y- axis labels
        var yLabelsGroup = chartGroup.append("g")
            .attr("transform", "rotate(-90)")
            .attr("transform", `translate(0, ${margin.top + height / 2})`);

        var povertyLabel = xLabelsGroup.append("text")
            .attr("x", 0)
            .attr("y", 20)
            .attr("value", "poverty") // value to grab for event listener
            .classed("active", true)
            .text("Poverty");

        var diabetesPercentageLabel = yLabelsGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", 0)
            .attr("y", -20)
            .attr("value", "diabetesPercentage") // value to grab for event listener
            .classed("active", true)
            .text("Diabetes (%)");

        // updateToolTip function above csv import
        var circlesGroup = updateToolTip(XAxis, YAxis);

        // x axis labels event listener
        xLabelsGroup.selectAll("text")
            .on("click", function () {
                // get value of selection
                var value = d3.select(this).attr("value");
                if (value !== XAxis) {

                    // replaces chosenXAxis with value
                    XAxis = value;

                    // functions here found above csv import
                    // updates x scale for new data
                    xLinearScale = xScale(chartData, XAxis);

                    // updates x axis with transition
                    xAxis = renderXAxes(xLinearScale, xAxis);

                    // updates circles with new x values
                    // UPDATE
                    chartGroup.selectAll("circle")
                        .transition()
                        .duration(1000)
                        .attr("cx", d => xLinearScale(d[XAxis]))
                        .attr("cy", d => yLinearScale(d[YAxis]))

                    //UPDATE
                    text
                        .transition()
                        .duration(1000)
                        .attr("x", d => xLinearScale(d[XAxis]))
                        .attr("y", d => yLinearScale(d[YAxis]))

                    // updates tooltips with new info
                    circlesGroup = updateToolTip(XAxis, YAxis);
                }
            });
    });
// }
