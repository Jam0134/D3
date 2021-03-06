// @TODO: YOUR CODE HERE!
var svgWidth = 970;
var svgHeight = 650;

var margin = {
  top: 20,
  right: 40,
  bottom: 100,
  left: 100
};

//Chart Height and width
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  .attr("class", "chart");

  // Import Data
d3.csv("assets/data/data.csv").then(function(data) {
    console.log(data);

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    data.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcare = +data.healthcare;
    });

     // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.poverty), d3.extent(data, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.healthcare), d3.extent(data, d => d.healthcare)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

     // Step 4: Append Axes to the chart
      
     xLinearScale.domain([d3.min(data, d => d.poverty) * 0.9,d3.max(data, d => d.poverty) * 0.9]);
     yLinearScale.domain([d3.min(data, d => d.healthcare) * 0.2,d3.max(data, d => d.healthcare) * 1.1]);


    // ==============================

     // Create axes labels
        chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Poverty Percentage");

        chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${margin.top -20})`)
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("US Healthcare vs Poverty");

        chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "axisText")
        .text("Healthcare");

            chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);
    
            chartGroup.append("g")
            .call(leftAxis);

        // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", "15")
        // .attr("fill", "pink")
        // .attr("opacity", ".5");
        .attr("class", "stateCircle");

        var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([80, -60])
        .html(function (d) {
            return (`${d.state}<br>Poverty: ${d.poverty}%<br>Healthcare: ${d.healthcare}%`);
        });

        chartGroup.call(toolTip);

  


    var textGroup = chartGroup.append("g")
        .attr("class", "stateText")
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", d => xLinearScale(d.poverty)-0.5)
        .attr("y", d => yLinearScale(d.healthcare)+5)
        .html(function (d) {
            return (`${d.abbr}`)        
        });
        // .attr("fill", "pink")
        // .attr("opacity", ".5");
      


});

