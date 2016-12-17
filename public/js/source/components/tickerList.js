const TickerList = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {

        let tickerList = this.props.userTickers;
        let tickers = tickerList.map((ticker) => {
            return (
                <CTicker
                    tickerData={ticker}
                    key={ticker.symbol}
                    saved="true" />
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

const CTickerList = connect(state => state)(TickerList);
