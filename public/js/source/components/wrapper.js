const Wrapper = React.createClass({
    getInitialState() {
        return {loading: true};
    },
    componentDidMount() {
        var self = this;

        $.ajax({
            url: '/checkLoginStatus',
            type: 'GET'
        }).done((data) => {
            self.props.dispatch({type: 'SET_LOGIN', loginState: data.loggedIn});   
            self.setState({loading: false});
        });
    },
    render() {
        let mainComponent = null;

        if (!this.state.loading) {

            if (this.props.loggedIn) {
                mainComponent = <CProfile />
            } else {
                mainComponent = <CLoginForm />
            }

        }

        return (
            <div>
                <CNav />
                <div className="container">
                    {mainComponent}
                </div>
            </div>
        );
    }
});

const CWrapper = connect(state => state)(Wrapper);

const store = Redux.createStore(function(state = {loggedIn: false, userTickers: []}, action) {
    switch (action.type) {
        case 'SET_LOGIN':

            return {
                loggedIn: action.loginState,
                userTickers: state.userTickers
            };

        case 'SET_TICKERS':

            return {
                loggedIn: state.loggedIn,
                userTickers: action.userTickers
            };

        case 'ADD_TICKER':

            var tickerExists = state.userTickers.filter(function(ticker) { 
                return ticker.symbol === action.newTicker.symbol;
            }).length;

            var newState = { loggedIn: state.loggedIn, userTickers: state.userTickers };
            
            if (!tickerExists) {
                newState.userTickers = state.userTickers.concat([action.newTicker]);
            }

            return newState;

        case 'UPDATE_TICKER':

            var newTickers = state.userTickers.map(function(ticker) {
                if (ticker.symbol === action.updateTicker.symbol) {
                    return action.updateTicker;
                } else {
                    return ticker;
                }
            });

            return {
                loggedIn: state.loggedIn,
                userTickers: newTickers
            };

        case 'REMOVE_TICKER':

            var newTickers = state.userTickers.filter(function(ticker) {
                return ticker.symbol !== action.symbol;
            });

            return {
                loggedIn: state.loggedIn,
                userTickers: newTickers
            };

        default:
            return state
    }
})

ReactDOM.render(
    <Provider store={store}>
        <CWrapper />
    </Provider>, 
    document.getElementById('stock-app'));