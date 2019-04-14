        //set the dimensions and margins of the graph
        var margin = {top: 20, right: 20, bottom: 40, left: 40},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        //set the ranges
        var x = d3.scaleLinear().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

        //append the svg object to the body of the page
        var svg = d3.select("#chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("class", "chart")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var dataset = [[5, 10], [10, 49], [15, 30], [20, 27], [25, 100], [30, 86]];

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