const TickerList = React.createClass({
    getInitialState: function () {
        return {};
    },
    render: function () {

        let tickerList = this.props.userTickers();
        let tickers = tickerList.map((ticker) => {
            return (
                <Ticker
                    tickerData={ticker}
                    userTickers={this.props.userTickers.bind(this)} 
                    updateTicker={this.props.updateTicker.bind(this)}
                    removeTicker={this.props.removeTicker.bind(this)}
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

//ReactDOM.render(<TickerList/>, document.getElementById('content'));
