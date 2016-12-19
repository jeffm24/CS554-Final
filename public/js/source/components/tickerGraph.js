// Resize graphs on window resize
$(window).resize(function() {
    if($('.searchButtons'))
        $('.searchButtons' + ' .active').click();

    $(".d3-wrapper").each(function() {
        var s = $(this).data("symbol");
        $('#buttons' + "" + '-' + s + ' .active').click();
    });
});

// Clicks the last active button on expand of each panel (to redraw the graph)
$(document).on('shown.bs.collapse', '.panel', function (e) {
    $('#' + e.target.id + ' .active').click();
});

const TickerGraph = React.createClass({
    getInitialState () {
        return {tickerData: this.props.tickerData, activePeriod: '1W', initialLoad: true};
    },
    componentWillReceiveProps(nextProps) {
        this.setState({ tickerData: nextProps.tickerData }, function() {
            this.setDataPeriod(this.state.activePeriod);
        });
    },
    makeGraph() {
        var symbol = this.state.tickerData.symbol;
        var searchTag = '';

        if (!this.props.saved) {
            searchTag = 'Search';
        }

        var margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = $("#d3" + searchTag + "-" + symbol).outerWidth() - margin.left - margin.right,
            height = $("#d3" + searchTag + "-" + symbol).outerHeight() - margin.top - margin.bottom;
        
        var svg = d3.select("#d3" + searchTag + "-" + symbol)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate("
                + margin.left
                + "," + margin.top + ")");

        svg.append("path")        // Add the valueline path.
            .attr("class", "line");

        this.setDataPeriod('1W');
    },
    updateGraph(start, end) {
        var self = this;

        $.ajax({
            method: "PUT",
            url: "/searchHistory",
            contentType: 'application/json',
            data: JSON.stringify({
                ticker: this.state.tickerData.symbol,
                start: start,
                end: end,
                period: this.state.activePeriod
            })
        }).then(function(data) {
            self.drawGraph(data.result);
        });
    },
    drawGraph(data) {
        var symbol = this.state.tickerData.symbol;
        var searchTag = '';

        if (!this.props.saved) {
            searchTag = 'Search';
        }

        var values = [];
        var margin = {top: 0, right: 0, bottom: 0, left: 0},
            width = $("#d3" + searchTag + "-" + symbol).outerWidth() - margin.left - margin.right,
            height = $("#d3" + searchTag + "-" + symbol).outerHeight() - margin.top - margin.bottom;
        
        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

        var parseDate = d3.timeParse("%Y-%m-%d");
        var valueline = d3.line()
            .x(function(d) { return x(d.date); })
            .y(function(d) { return y(d.high); });

        data.forEach(function(d) {
            d.date = parseDate(d.Date);
            d.high = +d.High;
            d.low = +d.Low;
            values.push(d.Open);
        });

        data.sort(function(a, b){
            return b.date - a.date
        });

        x.domain(d3.extent(data, function(d) {
            return d.date; }));
        y.domain([
            d3.min(data, function(d) {
                return d.low; }),
            d3.max(data, function(d) {
                return d.high; })
        ]);

        var svg = d3.select("#d3" + searchTag + "-" + symbol).transition();

        // Make the changes
        svg.select(".line")    // change the line
            .transition()
            .duration(500)
            .attr("d", valueline(data));

        var ret = (ubique.mean(ubique.tick2ret(values.reverse())) * 100).toFixed(4);
        var varc = (ubique.varc(ubique.tick2ret(values.reverse())) * 100).toFixed(4);

        this.setState({ currentPrice: parseFloat(data[0].Open).toLocaleString('en-US', { style: 'currency', currency: 'USD' }), initialLoad: false });

        $('#return' + searchTag + '-' + symbol).text(ret + "%");
        $('#variance' + searchTag + '-' + symbol).text(varc + "%");
    },
    setDataPeriod (newPeriod) {
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

        this.setState({activePeriod: newPeriod}, function() {
            this.updateGraph(start, end);
        });
    },
    isActivePeriod (period) {
        return (this.state.activePeriod === period) ? 'active' : '';
    },
    componentDidMount() {
        this.makeGraph();
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
            <div className="sub-panel graph-panel text-center">                
                
                <div className ="text-center price">{this.state.currentPrice}</div>

                <div className="d3-wrapper" id={"d3" + searchIdLong + "-" + this.state.tickerData.symbol} data-symbol = {this.state.tickerData.symbol}></div>

                <div className = {"buttons btn-group " + searchBtnsClass} id={"buttons-" + this.state.tickerData.symbol}>
                    <label className ="hidden" htmlFor={"1W-" + this.state.tickerData.symbol}> View 1 Week Graph for {this.state.tickerData.symbol} </label>
                    <button 
                        id={"1W" + searchIdShort + "-" + this.state.tickerData.symbol} 
                        className={"btn btn-primary btn-graph week " + this.state.tickerData.change + " " + this.isActivePeriod('1W')} 
                        type="button"
                        onClick={() => {this.setDataPeriod('1W')}}>1W</button>
                    
                    <label className ="hidden" htmlFor={"1M-" + this.state.tickerData.symbol}> View 1 Month Graph for {this.state.tickerData.symbol} </label>
                    <button 
                        id={"1M" + searchIdShort + "-" + this.state.tickerData.symbol} 
                        className={"btn btn-primary btn-graph month " + this.state.tickerData.change + " " + this.isActivePeriod('1M')} 
                        type="button"
                        onClick={() => {this.setDataPeriod('1M')}}>1M</button>
                    
                    <label className ="hidden" htmlFor={"1M-" + this.state.tickerData.symbol}> View 3 Month Graph for {this.state.tickerData.symbol} </label>
                    <button 
                        id={"3M" + searchIdShort + "-" + this.state.tickerData.symbol} 
                        className={"btn btn-primary btn-graph 3month " + this.state.tickerData.change + " " + this.isActivePeriod('3M')} 
                        type="button" 
                        onClick={() => {this.setDataPeriod('3M')}}>3M</button>

                    <label className ="hidden" htmlFor={"1Y-" + this.state.tickerData.symbol}> View 1 Year Graph for {this.state.tickerData.symbol} </label>
                    <button 
                        id={"1Y" + searchIdShort + "-" + this.state.tickerData.symbol} 
                        className={"btn btn-primary btn-graph year " + this.state.tickerData.change + " " + this.isActivePeriod('1Y')} 
                        type="button" 
                        onClick={() => {this.setDataPeriod('1Y')}}>1Y</button>
                </div>
            </div>
        );
    }
});

const CTickerGraph = connect(state => state)(TickerGraph);
