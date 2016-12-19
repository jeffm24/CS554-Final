const Ticker = React.createClass({
  getInitialState() {
    return {tickerData: this.props.tickerData};
  },
  componentWillReceiveProps(nextProps) {
    this.setState({ tickerData: nextProps.tickerData });
  },
  saveTicker() {
    if (this.props.saved) return;

    var self = this;

    $.ajax({
        url: '/saveTicker',
        type: 'POST',
        data: {
            symbol: this.state.tickerData.symbol
        },
        success: function(data) {
            self.props.dispatch({type: 'ADD_TICKER', newTicker: self.props.tickerData});
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
  removeTicker() {
    if (!this.props.saved) return;

    var self = this;

    $.ajax({
        url: '/removeTicker',
        type: 'DELETE',
        data: {
            symbol: this.state.tickerData.symbol
        },
        success: function(data) {
            self.props.dispatch({type: 'REMOVE_TICKER', symbol: self.props.tickerData.symbol});
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
  render() {
    var tickerContent = null;

    if (this.props.saved) {
      // Saved ticker

      tickerContent = (
        <div id={"panel-" + this.state.tickerData.symbol} className={"panel panel-default tickerItem savedTickerItem " + this.state.tickerData.change} data-symbol={this.state.tickerData.symbol}>
          <a data-toggle="collapse" data-parent="#accordion" href={"#collapse" + this.state.tickerData.symbol}>
              <div className="panel-heading">
                  <h3 className="panel-title">
                    {this.state.tickerData.symbol} <span className={"change-percent " + this.state.tickerData.change}>({this.state.tickerData.ChangeinPercent})</span>
                  </h3>
              </div>
          </a>
          <div id={"collapse" + this.state.tickerData.symbol} className={"panel-collapse collapse " + this.state.tickerData.change}>
              <div className="panel-body">
                  <div className="row">
                      <div className="col-xs-12 col-sm-6">
                          <CTickerGraph
                              saved="true"
                              tickerData={this.state.tickerData} />
                      </div>
                      <div className="col-xs-12 col-sm-6">
                          <CTickerStats
                              saved="true"
                              tickerData={this.state.tickerData} />
                      </div>
                  </div>
                  <button type="button" className="btn btn-danger remove-ticker-btn pull-right" onClick={this.removeTicker}>Remove</button>
                  <div className="clearfix"></div>
              </div>
          </div>
        </div>
      );

    } else {
      // Search ticker

      var self = this;

      var addTickerBtn = null;

      var tickerExists = this.props.userTickers.filter(function(ticker) { 
        return ticker.symbol === self.props.tickerData.symbol;
      }).length;

      if (!tickerExists) {
        addTickerBtn = (
          <span>
            <label className ="hidden" htmlFor="saveTickerBtn"> Add {this.state.tickerData.symbol} to Portfolio  </label>
            <button type="button" id="saveTickerBtn" className="btn btn-primary pull-right" onClick={this.saveTicker}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
            <div className="clearfix"></div>
          </span>
        );
      }

      tickerContent = (
        <div id="panel-search" className={"panel panel-default tickerItem " + this.state.tickerData.change}>
          <div className="panel-heading">
              <h3 className="panel-title">
                {this.state.tickerData.symbol} <span className={"change-percent " + this.state.tickerData.change}>({this.state.tickerData.ChangeinPercent})</span>
              </h3>
              {addTickerBtn}
          </div>
          <div className="panel-body">
              <div className="row">
                  <div className="col-xs-12 col-sm-6">
                      <CTickerGraph
                        tickerData={this.state.tickerData} />
                  </div>
                  <div className="col-xs-12 col-sm-6">
                      <CTickerStats
                        tickerData={this.state.tickerData} />
                  </div>
              </div>
          </div>
        </div>
      );

    }

    return tickerContent;
  }
});

const CTicker = connect(state => state)(Ticker);