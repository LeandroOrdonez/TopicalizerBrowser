/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


//var selectedCategory = '3';

var dataCategories, dataOperations;

d3.csv("datasources/topics.csv", function(error, csvData) {
    dataCategories = csvData;
    console.log(dataCategories);
    //console.log(data);
    //drawBarChart(selectedElement);
});

d3.csv("datasources/per-document-topics.csv", function(error, csvData) {
    dataOperations = csvData;
    console.log(dataOperations);
    //console.log(data);
    //drawBarChart(selectedElement);
});

function drawBarChart(element) {
    var idElement, selChart = document.getElementById('chart'),
            xAccessor, yAccessor, filterKey, data;
    console.log('calling Draw BarChart...');
    if (!element) {
        //console.log('Falsy element' + selChart + ', ' + selChart.style);
        selChart.style.display = 'none';
    } else if (element.indexOf("Category") !== -1) {
        //console.log('Categy selected...');
        //$("#chart").style.display = 'inline';
        //consolse.log(selChart + ', ' + selChart.style);
        idElement = element.substring(element.indexOf("-") + 1);
        xAccessor = "Term Probability";
        yAccessor = "Term";
        filterKey = "Topic";
        data = dataCategories;
        selChart.style.display = 'inline';
        //console.log(idElement);
    } else if (element.indexOf("Operation") !== -1) {
        //console.log('Categy selected...');
        idElement = element.substring(element.indexOf(".") + 1);
        xAccessor = "Topic Probability";
        yAccessor = "Topic";
        filterKey = "Operation ID";
        data = dataOperations;
        selChart.style.display = 'inline';
    } else {
        selChart.style.display = 'none';
        d3.selectAll('#chart svg').remove();
        $("#chart-title").text("Start by picking an element");
    }
    
    var actualData = filterData();
    var valueLabelWidth = 40; // space reserved for value labels (right)
    var barHeight = 15; // height of one bar
    var barLabelWidth = 100; // space reserved for bar labels
    var barLabelPadding = 5; // padding between bar and bar labels (left)
    var gridLabelHeight = 18; // space reserved for gridline labels
    var gridChartOffset = 3; // space between start of grid and first bar
    var maxBarWidth = 200; // width of the bar with the max value

    var xAxisLabelOffset = 20;

// accessor functions 
    var barLabel = function(d) {
        return d[yAccessor];
    };
    var barValue = function(d) {
        return parseFloat(d[xAccessor]);
    };

// sorting
    var sortedData = actualData.sort(function(a, b) {
        return d3.descending(barValue(a), barValue(b));
    });

// scales
    var yScale = d3.scale.ordinal().domain(d3.range(0, sortedData.length)).rangeBands([0, sortedData.length * barHeight]);
    var y = function(d, i) {
        return yScale(i);
    };
    var yText = function(d, i) {
        return y(d, i) + yScale.rangeBand() / 2;
    };
    var x = d3.scale.linear().domain([0, d3.max(sortedData, barValue)]).range([0, maxBarWidth]);
// svg container element
    d3.selectAll('#chart svg').remove(); //removing previous charts
    var chartWidth = maxBarWidth + barLabelWidth + valueLabelWidth;
    var chartHeight = gridLabelHeight + gridChartOffset + xAxisLabelOffset + sortedData.length * barHeight;
    var chart = d3.select('#chart').append("svg")
            .attr('width', chartWidth)
            .attr('height', chartHeight);

// chart axis labels
    chart.append("text")
            .attr("transform", "translate(" + (chartWidth / 2) + " ," + 10 + ")")
            .attr("class", "chart-label")
            .style("text-anchor", "middle")
            .style("font-weight", "bold")
            .text(xAccessor);

    chart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("class", "chart-label")
            .attr("y", 20)
            .attr("x", 0 - (chartHeight / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-weight", "bold")
            .text(yAccessor);

// grid line labels
    var gridContainer = chart.append('g')
            .attr('transform', 'translate(' + barLabelWidth + ',' + (gridLabelHeight + xAxisLabelOffset) + ')');
    gridContainer.selectAll("text").data(x.ticks(4)).enter().append("text")
            .attr("class", "chart-label")
            .attr("x", x)
            .attr("dy", -3)
            .attr("text-anchor", "middle")
            .text(String);
// vertical grid lines
    gridContainer.selectAll("line").data(x.ticks(4)).enter().append("line")
            .attr("x1", x)
            .attr("x2", x)
            .attr("y1", 0)
            .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
            .style("stroke", "#ccc");
// bar labels
    var labelsContainer = chart.append('g')
            .attr('transform', 'translate(' + (barLabelWidth - barLabelPadding) + ',' + (gridLabelHeight + xAxisLabelOffset + gridChartOffset) + ')');
    labelsContainer.selectAll('text').data(sortedData).enter().append('text')
            .attr("class", "chart-label")
            .attr('y', yText)
            .attr('stroke', 'none')
            .attr('fill', 'black')
            .attr("dy", ".35em") // vertical-align: middle
            .attr('text-anchor', 'end')
            .text(barLabel);
// bars
    var barsContainer = chart.append('g')
            .attr('transform', 'translate(' + barLabelWidth + ',' + (gridLabelHeight + xAxisLabelOffset + gridChartOffset) + ')');
    barsContainer.selectAll("rect").data(sortedData).enter().append("rect")
            .attr('y', y)
            .attr('height', yScale.rangeBand())
            .attr('width', function(d) {
        return x(barValue(d));
    })
            .attr('stroke', 'white')
            .attr('fill', 'steelblue');
// bar value labels
    barsContainer.selectAll("text").data(sortedData).enter().append("text")
            .attr("class", "chart-label")
            .attr("x", function(d) {
        return x(barValue(d));
    })
            .attr("y", yText)
            .attr("dx", 3) // padding-left
            .attr("dy", ".35em") // vertical-align: middle
            .attr("text-anchor", "start") // text-align: right
            .attr("fill", "black")
            .attr("stroke", "none")
            .text(function(d) {
        return d3.round(barValue(d), 2);
    });
// start line
    barsContainer.append("line")
            .attr("y1", -gridChartOffset)
            .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
            .style("stroke", "#000");

    function filterData() {
        var filteredData = new Array();
        var current, next;
        for (var i = 0; i < data.length; i++) {
            //console.log(data[i]["Topic"]);
            current = data[i][filterKey];
            next = i < (data.length - 1) ? data[(i+1)][filterKey] : current;
            if (data[i][filterKey] === idElement) {
                //console.log(data[i]["Topic"] + ' === ' + selectedCategory);
                //data[i]["Term Probability"] *= 100;
                filteredData.push(data[i]);
                if(current!==next) {
                    break;
                }
            }
        }
        return filteredData;
    }
}

function type(d) {
    if(d["Term Probability"]) {
        d["Term Probability"] = +d["Term Probability"]; // coerce to number
    } else if (d["Topic Probability"]) {
        d["Topic Probability"] = +d["Topic Probability"];
    }
    return d;
}