/*
function makeGraph(s, tag) {
    //var margin = {top: 1, right: 0, bottom: 20, left: 0};
    var margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = $("#d3" + tag + "-" + s).outerWidth() - margin.left - margin.right,
        height = $("#d3" + tag + "-" + s).outerHeight() - margin.top - margin.bottom;

    var svg = d3.select("#d3" + tag + "-" + s)
        .append("svg")
        // .attr("viewBox", "0 0 500 400")
        // .attr("preserveAspectRatio", "xMinYMin slice")
        // .classed("svg-content-responsive", true)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate("
            + margin.left
            + "," + margin.top + ")");

    svg.append("path")        // Add the valueline path.
        .attr("class", "line");
    $('#buttons' + tag + '-' + s + ' .week').click();
}

function updateGraph(t,s,e,tag,range) {

    var stock = t;
    var start = s;
    var end = e;
    var DATA;

    DATA = isCacheUpToDate(stock,range);

    if(!DATA){
        //console.log("UPDATE GRAPH - CACHE NEEDS UPDATING");
        var requestConfig = {
            method: "PUT",
            url: "/searchHistory",
            contentType: 'application/json',
            data: JSON.stringify({
                ticker: stock,
                start: start,
                end: end
            })
        };
        $.ajax(requestConfig).then(function(data) {
            DATA = updateCache(stock,data,range);
            drawGraph(t,s,e,tag,DATA.data);
        });
    }

    if(DATA){
        drawGraph(t,s,e,tag,DATA.data);
    }

};

function drawGraph(t,s,e,tag,DATA){
    var stock = t;
    var start = s;
    var end = e;
    var values = [];
    var margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = $("#d3" + tag + "-" + stock).outerWidth() - margin.left - margin.right,
        height = $("#d3" + tag + "-" + stock).outerHeight() - margin.top - margin.bottom;


    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    //console.log("#d3" + stock);
    var parseDate = d3.time.format("%Y-%m-%d").parse;
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.high); });


    DATA.result.forEach(function(d) {
        d.date = parseDate(d.Date);
        d.high = +d.High;
        d.low = +d.Low;
        values.push(d.Open);
    });

    x.domain(d3.extent(DATA.result, function(d) {
        return d.date; }));
    y.domain([
        d3.min(DATA.result, function(d) {
            return d.low; }),
        d3.max(DATA.result, function(d) {
            return d.high; })
    ]);

    var svg = d3.select("#d3" + tag + "-" + stock).transition();

    // Make the changes
    svg.select(".line")    // change the line
        .transition()
        .duration(500)
        .attr("d", valueline(DATA.result));

    var ret = (ubique.mean(ubique.tick2ret(values.reverse())) * 100).toFixed(4);
    var varc = (ubique.varc(ubique.tick2ret(values.reverse())) * 100).toFixed(4);
    $('#title' + tag + '-' + stock).text(parseFloat(DATA.result[0].Open).toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
    $('#return' + tag + '-' + stock).text(ret + "%");
    $('#variance' + tag + '-' + stock).text(varc + "%");

}

$(document).ready(function () {
    $(".d3-wrapper").each(function() {
        var symbol = $(this).data("symbol");

        makeGraph(symbol,"");
    });
});

$(window).resize(function() {
    if($('.searchButtons'))
        $('.searchButtons' + ' .active').click();

    $(".d3-wrapper").each(function() {
        var s = $(this).data("symbol");
        $('#buttons' + "" + '-' + s + ' .active').click();
    });
});
*/

const TickerGraph = React.createClass({
    getInitialState: function () {
        return {tickerData: this.props.tickerData, activePeriod: '1W'};
    },
    getDataPeriod: function(newPeriod) {
        this.setState({activePeriod: newPeriod});

        var stock = this.state.tickerData.symbol;
        var end = new Date();
        var start = new Date();

        switch (newPeriod) {
            case '1W':
                start.setDate(end.getDate() - 7);
                break;
            case '1M':
                start.setMonth(end.getMonth() - 1);
                break;
            case '3M':
                start.setMonth(end.getMonth() - 3);
                break;
            case '1Y':
                start.setFullYear(end.getFullYear() - 1);
                break;
        }

        start = start.toISOString().split('T')[0];
        end = end.toISOString().split('T')[0];
        
        if (this.props.saved){
            //updateGraph(stock,start,end,"",newPeriod);
        } else {
            //updateGraph(stock,start,end,"Search",newPeriod);
        }
    },
    isActivePeriod: function(period) {
        return (this.state.activePeriod === period) ? 'active' : '';
    },
    render() {
        var searchIdLong = '',
            searchIdShort = '',
            searchBtnsClass = '';

        if (!this.props.saved) {
            searchIdLong = 'Search';
            searchIdShort = 's';
            searchBtnsClass = 'searchButtons';
        }

        return (
            <div className = "sub-panel graph-panel text-center">
                <div className = "text-center price" id = {"title" + searchIdLong + "-" + this.state.tickerData.symbol}></div>
                <div className="d3-wrapper" id={"d3" + searchIdLong + "-" + this.state.tickerData.symbol} data-symbol = {this.state.tickerData.symbol}></div>

                <div className = {"buttons btn-group " + searchBtnsClass} id={"buttons-" + this.state.tickerData.symbol}>
                    <label className ="hidden" htmlFor={"1W-" + this.state.tickerData.symbol}> View 1 Week Graph for {this.state.tickerData.symbol} </label>
                    <button 
                        id={"1W" + searchIdShort + "-" + this.state.tickerData.symbol} 
                        className={"btn btn-primary btn-graph week " + this.state.tickerData.change + " " + this.isActivePeriod('1W')} 
                        type="button"
                        onClick={() => {this.getDataPeriod('1W')}}>1W</button>
                    
                    <label className ="hidden" htmlFor={"1M-" + this.state.tickerData.symbol}> View 1 Month Graph for {this.state.tickerData.symbol} </label>
                    <button 
                        id={"1M" + searchIdShort + "-" + this.state.tickerData.symbol} 
                        className={"btn btn-primary btn-graph month " + this.state.tickerData.change + " " + this.isActivePeriod('1M')} 
                        type="button"
                        onClick={() => {this.getDataPeriod('1M')}}>1M</button>
                    
                    <label className ="hidden" htmlFor={"1M-" + this.state.tickerData.symbol}> View 3 Month Graph for {this.state.tickerData.symbol} </label>
                    <button 
                        id={"3M" + searchIdShort + "-" + this.state.tickerData.symbol} 
                        className={"btn btn-primary btn-graph 3month " + this.state.tickerData.change + " " + this.isActivePeriod('3M')} 
                        type="button" 
                        onClick={() => {this.getDataPeriod('3M')}}>3M</button>

                    <label className ="hidden" htmlFor={"1Y-" + this.state.tickerData.symbol}> View 1 Year Graph for {this.state.tickerData.symbol} </label>
                    <button 
                        id={"1Y" + searchIdShort + "-" + this.state.tickerData.symbol} 
                        className={"btn btn-primary btn-graph year " + this.state.tickerData.change + " " + this.isActivePeriod('1Y')} 
                        type="button" 
                        onClick={() => {this.getDataPeriod('1Y')}}>1Y</button>
                </div>
            </div>
        );
    }
});

const CTickerGraph = connect(state => state)(TickerGraph);
