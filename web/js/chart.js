/* 
 Document   : charts
 Created on : 24-ene-2014, 22:31:34
 Author     : Leandro Ordonez <leandro.ordonez.ante@gmail.com>
 Description:
 Managing d3.js charting and the user actions.
 */


//var selectedCategory = '3';

var dataCategories, dataOperations, idElement, tags, userTags, okTags, addTags, rmvTags; //, jsonAnnotations;

var userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

if(!userProfile) { 
    window.location.href = "/TopicalizerBrowser/index.xhtml";
}

$.getJSON("annotation?" + userProfile.ID, function(data) {
    //jsonAnnotations = data;
    $.each(data, function(key, val) {
        sessionStorage.setItem(key, val.terms);
    });
    console.log("Retrieving " + userProfile.ID + ".json ...");
})
//        .done(function() {
//            console.log("second success");
//        })
        .fail(function() {
            //jsonAnnotations = {};
            console.log("[ERROR] There are no annotations available for the specified user (" + userProfile.ID + ")");
        })
        .always(function() {
            console.log("... Complete");
        });

d3.csv("datasources/topics.csv", function(error, csvData) {
    dataCategories = csvData;
//    console.log(dataCategories);
    //console.log(data);
    //drawBarChart(selectedElement);
});

d3.csv("datasources/per-document-topics.csv", function(error, csvData) {
    dataOperations = csvData;
//    console.log(dataOperations);
    //console.log(data);
    //drawBarChart(selectedElement);
});

function drawBarChart(element) {
    var /*idElement, */selChart = $('#chart'),
            xAccessor, yAccessor, filterKey, data, xLabel, yLabel;
    console.log('calling Draw BarChart...');
//    console.log(localStorage);
    $('#save-btn').css('display', 'none');
    if (!element) {
        //console.log('Falsy element' + selChart + ', ' + selChart.style);
        selChart.style.display = 'none';
    } else if (element.indexOf("Category") !== -1) {
        //console.log('Categy selected...');
        //$("#chart").style.display = 'inline';
        //consolse.log(selChart + ', ' + selChart.style);
        idElement = element.substring(element.indexOf("-") + 1);
        xAccessor = xLabel = "Term Probability";
        yAccessor = yLabel = "Term";
        filterKey = "Topic";
        data = dataCategories;
//        selChart.style.display = 'inline';
        if (localStorage.getItem($('#chart-title').text())) {
            $('#name-value').css('color', 'black').html(localStorage.getItem($('#chart-title').text()));
        } else {
            $('#name-value').css('color', 'grey').html('<em>none yet</em>');
        }
        $('#category-name').css('display', 'inline');
        selChart.css('display', 'inline');
//        $('#service-uri-label').attr('style', 'display: none');
        //console.log(idElement);
        $('#service-uri').css('display', 'none');
        $('#annotations').css('display', 'none');
        $('#operation-doc').css('display', 'none');
        $('#intro').css('display', 'none');
    } else if (element.indexOf("Operation") !== -1) {
        //console.log('Categy selected...');
        idElement = element.substring(element.indexOf(".") + 1);
        xAccessor = "Topic Probability";
        xLabel = "Category Proportion";
        yAccessor = "Topic";
        yLabel = "Category";
        filterKey = "Operation ID";
        data = dataOperations;
//        selChart.style.display = 'inline';
        $('#category-name').css('display', 'none');
        $('#intro').css('display', 'none');
        selChart.css('display', 'inline');
        $('#service-uri').css('display', 'inline');
        $('#annotations').css('display', 'inline');
        $('#operation-doc').css('display', 'inline');
    } else {
//        selChart.style.display = 'none';
        selChart.css('display', 'none');
        $('#category-name').css('display', 'none');
        $('#service-uri').css('display', 'none');
        $('#annotations').css('display', 'none');
        $('#operation-doc').css('display', 'none');
        d3.selectAll('#chart svg').remove();
        d3.selectAll('#service-uri a').remove();
        d3.selectAll('#annotations div').remove();
//        $('#service-uri-label').attr('style', 'display: none');
        $("#chart-title").text("Start by picking an element");
        return;
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
    var terms = function(d) {
        if (element.indexOf("Operation") !== -1) {
            return d["Topic Probability"] > 0.15 ? d["Terms"] : "";
        }
    };
    var serviceUri = function(d) {
        if (element.indexOf("Operation") !== -1) {
            return d["Service URI"];
        }
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
            .text(xLabel);

    chart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("class", "chart-label")
            .attr("y", 20)
            .attr("x", 0 - (chartHeight / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-weight", "bold")
            .text(yLabel);

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
                return d3.round(barValue(d), 3);
            });
// start line
    barsContainer.append("line")
            .attr("y1", -gridChartOffset)
            .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
            .style("stroke", "#000");

    d3.selectAll('#service-uri a').remove();

    if (element.indexOf("Operation") !== -1) {
        var sUriContainer = d3.select('#service-uri').selectAll("a")
                .data(sortedData.slice(0, 1)).enter().append("a")
                .attr("class", "annotation")
                .style("text-decoration", "none")
                .style("color", "cornflowerblue")
                .attr("href", function(d) {
//                console.log(terms(d));
                    return serviceUri(d);
                })
                .attr("target", "_blank")
                .html(function(d) {
//                console.log(terms(d));
                    return "(Service Documentation)";
                });

        d3.selectAll('#annotations div').remove();

        var annotationsContainer = d3.select('#annotations').selectAll("div")
//                .data(sortedData.slice(0, 3)).enter().append("div")
                .data(sortedData).enter().append("div")
                .attr("class", "annotation")
                .html(function(d) {
//                console.log(terms(d));
                    return terms(d);
                });

        var annStreams = $("#annotations div");
        tags = [];
        for (var i = 0; i < annStreams.length; i++) {
            var words = annStreams[i].innerHTML.split("; ");
            if (words.length > 1) {
                words.forEach(function(value) {
                    if (tags.indexOf(value) === -1)
                        tags.push(value);
                });
            }
        }
        
        $("#operation-doc").html('<br /><br /><hr /><h4 style="padding: 0px; margin: 0px;">Operation Documentation</h4>');
        $("#operation-doc").append((operationDoc!=='' && operationDoc!==null)? '<span class="operation-doc">' + operationDoc.length > 150 ? operationDoc : operationDoc.subsubstring(0,147) + '[...]' + '</span>' : '<span class="operation-doc">No documentation Available</span>');

        renderTags();

    } else {
        $("#indexRightColumn").css("padding-bottom", "30px");
    }

    function filterData() {
        var filteredData = new Array();
        var current, next;
        for (var i = 0; i < data.length; i++) {
            //console.log(data[i]["Topic"]);
            current = data[i][filterKey];
            next = i < (data.length - 1) ? data[(i + 1)][filterKey] : current;
            if (data[i][filterKey] === idElement) {
                //console.log(data[i]["Topic"] + ' === ' + selectedCategory);
                //data[i]["Term Probability"] *= 100;
                filteredData.push(data[i]);
                if (current !== next) {
                    break;
                }
            }
        }
        return filteredData;
    }
}

function type(d) {
    if (d["Term Probability"]) {
        d["Term Probability"] = +d["Term Probability"]; // coerce to number
    } else if (d["Topic Probability"]) {
        d["Topic Probability"] = +d["Topic Probability"];
    }
    return d;
}

Array.prototype.diff = function(a) {
    return this.filter(function(i) {
        return (a.indexOf(i) < 0);
    });
};

Array.prototype.intersect = function(a) {
    return this.filter(function(i) {
        return (a.indexOf(i) !== -1);
    });
};

String.prototype.unescapeHtml = function () {
    var temp = document.createElement("div");
    temp.innerHTML = this;
    var result = temp.childNodes[0].nodeValue;
    temp.removeChild(temp.firstChild);
    return result;
};

function renderTags() {
    userTags = (sessionStorage.getItem('Operation-' + idElement)) ? sessionStorage.getItem('Operation-' + idElement).split(',') : null;
    //console.log(tags);
    var formattedTags = [];
    if (!userTags) {
        tags.forEach(function(e) {
            formattedTags.push('<span class="tag">' + e + '</span> ');
        });
    } else {

        okTags = tags.intersect(userTags);
        addTags = userTags.diff(tags);
        rmvTags = tags.diff(userTags);

        okTags.forEach(function(e) {
            formattedTags.push('<span class="tag">' + e + '</span> ');
        });
        rmvTags.forEach(function(e) {
            formattedTags.push('<span class="tag removed">' + e + '</span> ');
        });
        addTags.forEach(function(e) {
            formattedTags.push('<span class="tag added">' + e + '</span> ');
        });
    }

    //console.log(tags);
    $("#annotations").html('<hr /><h4 style="padding: 0px; margin: 0px;">Annotations</h4><br />');
    $("#annotations").append(formattedTags);
    $("#annotations").append('<br /><br /><a href="#" id="dialog-link" class="tags-button">What do you think?</a>');
    $("#indexRightColumn").css("padding-bottom", "15px");

    // Link to open the dialog
    $("#dialog-link").click(function(event) {
        console.log("Click on dialog button...");
//            $("#dialog").attr("title", $("#chart-title").text());
//            $("#annotations-input").empty();
//            $("#annotations-input").tagit("destroy");
        var tagSrc = userTags ? userTags : tags;
        $('#annotations-input').tagit({
            tagSource: tagSrc,
            sortable: true
//                tagsChanged: function(tagValue, action, element) {
//                    console.log("Tags changed!: " + tagValue + ", " + action + ", " + element);
//                    if (action === 'added') {
//
//                    } else {
//
//                    }
//                }
        });
        tagSrc.forEach(function(e) {
//                $('#annotations-input').append("<li data-value='" + e + "'>"+ e +"</li>");
            $('#annotations-input').tagit("add", {label: e, value: e});
        });

//            $("#annotations-input").text(tags);
        $("#dialog").dialog("open");
        event.preventDefault();
    });
}