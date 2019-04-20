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