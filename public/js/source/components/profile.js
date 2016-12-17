const Profile = React.createClass({
    getInitialState() {
        return {userTickers: []};
    },
    addTicker(newTicker) {
        var tickerExists = this.state.userTickers.filter(function(ticker) { 
            return ticker.symbol === newTicker.symbol;
        }).length;
        
        if (!tickerExists) {
            this.setState({ userTickers: this.state.userTickers.concat([newTicker]) });
        }
    },
    updateTicker(symbol, newData) {
        var tickers = this.state.userTickers.map(function(ticker) {
            if (ticker.symbol === symbol) {
                return newData;
            } else {
                return ticker;
            }
        });

        this.setState({ userTickers: tickers });
    },
    removeTicker(symbol) {
        var tickers = this.state.userTickers.filter(function(ticker) {
            return ticker.symbol !== symbol;
        });

        this.setState({ userTickers: tickers });
    },
    getTickers() {
        var tickers = this.state.userTickers;

        return tickers;
    },
    componentDidMount() {
        $.ajax({
            url: '/profileTickers',
            dataType: 'json',
            cache: false,
            success: (tickerList) => {
                this.setState({ userTickers: tickerList.tickers });
            },
            error: (xhr, status, err) => {
                console.error('/tickerList', status, err.toString());
            }
        });
    },
    render() {
        return (
            <div>
                <Search 
                    userTickers={this.getTickers.bind(this)} 
                    addTicker={this.addTicker.bind(this)} />
                <TickerList 
                    userTickers={this.getTickers.bind(this)} 
                    updateTicker={this.updateTicker.bind(this)}
                    removeTicker={this.removeTicker.bind(this)} />
            </div>
        );
    }
});