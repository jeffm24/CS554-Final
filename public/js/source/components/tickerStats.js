const TickerStats = React.createClass({
    getInitialState: function () {
        return {refreshRunning: false, tickerData: this.props.tickerData};
    },
    refreshTickerStats: function() {
        this.setState({refreshRunning: true});
        this.updateTicker($(this).data('symbol'), true);
    },
    updateTicker: function(tickerSymbol, showSuccessAlert) {
        var self = this;

        $.ajax({
            url: '/updateTicker',
            type: 'PUT',
            data: {
                symbol: tickerSymbol
            },
            success: function(data) {
                // Create the render data object to be passed to the renderer
                this.setState({tickerData: data.result});

                // Display success message to the user
                if (showSuccessAlert) {
                    swal({
                        title: "Success!",
                        text: renderData.tickerSymbol + " is now up to date.",
                        type: "success",
                        confirmButtonText: "OK"
                    });
                }

                self.setState({refreshRunning: false});
            },
            error: function(xhr, status, error) {
                swal({
                    title: "Error!",
                    text: xhr.responseJSON.error,
                    type: "error",
                    confirmButtonText: "OK"
                });
            }
        });
    },
    isRefreshDisabled: function() {
        return (this.state.refreshRunning) ? 'true' : 'false';
    },
    render() {
        var refreshButton = null;
      
        if (this.props.saved) {
            refreshButton = (
                <span className="pull-right">
                    <label className ="hidden" for={"refresh-" + this.state.tickerData.symbol}> Refresh {this.state.tickerData.symbol} </label>
                    <button type="button" id = {"refresh-" + this.state.tickerData.symbol} className="btn btn-primary refresh-ticker-btn" data-symbol={this.state.tickerData.symbol} disabled={isRefreshDisabled}>
                        <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>
                    </button>
                </span>
            );
        }

        return (
            <div id={"stats-" + this.state.tickerData.symbol} className="sub-panel stat-panel">
                <h4>Statistics {refreshButton}</h4>
                <hr />
                <div className="row">
                    <div className="col-xs-6">
                        <div className="stat-item">
                            <p className="stat-val">{this.state.tickerData.Open}</p>
                            <p className="stat-name">Open</p>
                        </div>
                        <div className="stat-item">
                            <p className="stat-val">{this.state.tickerData.DaysHigh}</p>
                            <p className="stat-name">Today's High</p>
                        </div>
                        <div className="stat-item">
                            <p className="stat-val">{this.state.tickerData.DaysLow}</p>
                            <p className="stat-name">Today's Low</p>
                        </div>
                        <div className="stat-item">
                            <p className="stat-val">{this.state.tickerData.YearHigh}</p>
                            <p className="stat-name">52 Wk High</p>
                        </div>
                        <div className="stat-item">
                            <p className="stat-val">{this.state.tickerData.YearLow}</p>
                            <p className="stat-name">52 Wk Low</p>
                        </div>
                        <div className="stat-item">
                            <p className="stat-val" id = {"return-" + this.state.tickerData.symbol}>{this.state.tickerData.YearLow}</p>
                            <p className="stat-name">Expected Return</p>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="stat-item">
                            <p className="stat-val">{this.state.tickerData.Volume}</p>
                            <p className="stat-name">Volume</p>
                        </div>
                        <div className="stat-item">
                            <p className="stat-val">{this.state.tickerData.AverageDailyVolume}</p>
                            <p className="stat-name">Average Volume</p>
                        </div>
                        <div className="stat-item">
                            <p className="stat-val">{this.state.tickerData.MarketCapitalization}</p>
                            <p className="stat-name">Market Cap</p>
                        </div>
                        <div className="stat-item">
                            <p className="stat-val">{this.state.tickerData.PERatio}</p>
                            <p className="stat-name">P/E Ratio</p>
                        </div>
                        <div className="stat-item">
                            <p className="stat-val">{this.state.tickerData.DividendYield}</p>
                            <p className="stat-name">Div/Yield</p>
                        </div>
                        <div className="stat-item">
                            <p className="stat-val" id = {"variance-" + this.state.tickerData.symbol}>{this.state.tickerData.YearLow}</p>
                            <p className="stat-name">Variance</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
