//get the data
d3.csv("../../newdata/testdata.csv", function(error, data) {
    if (error) throw error;

    //format the data
    data.forEach(function(d) {
        d.x = +d.x;
        d.y = +d.y;
    });

    //scale the range of the data
    x.domain(d3.extent(data, function(d) {return d.x; }));
    y.domain([0, d3.max(data, function(d) {return d.y; })]);

    //add a circle element for each data point
    svg.append("g")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("fill", "none")
        .selectAll("circle")
        .data(data)
        .join("circle")
            .attr("cx", d => x(d.x))
            .attr("cy", d => y(d.y))
            .attr("r", 2);
    
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

