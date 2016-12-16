const TickerList = React.createClass({
    getInitialState: function () {
        return { tickers: [] };
    },
    addTicker: function (newTicker) {
        var tickers = this.state.tickers.concat([newTicker]);

        this.setState({ tickers: tickers });
    },
    componentDidMount: function () {
        $.ajax({
            url: '/profileTickers',
            dataType: 'json',
            cache: false,
            success: (tickerList) => {
                this.setState({ tickers: tickerList.tickers });
            },
            error: (xhr, status, err) => {
                console.error('/tickerList', status, err.toString());
            }
        });
    },
    render: function () {

        let tickerList = this.state.tickers;
        let tickers = tickerList.map((ticker) => {
            return (
                <Ticker
                    tickerData={ticker}
                    saved="true"></Ticker>
            );
        });

        return (
            <div>
                <div className="page-header">
                    <h2>My Tickers: </h2>
                </div>
                <div className="panel-group" id="accordion">
                    {tickers}
                </div>
            </div>
        );
    }
});

//ReactDOM.render(<TickerList/>, document.getElementById('content'));
