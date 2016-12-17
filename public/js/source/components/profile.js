const Profile = React.createClass({
    getInitialState() {
        return {};
    },
    componentDidMount() {
        $.ajax({
            url: '/profileTickers',
            dataType: 'json',
            cache: false,
            success: (tickerList) => {
                this.props.dispatch({type: 'SET_TICKERS', userTickers: tickerList.tickers});
            },
            error: (xhr, status, err) => {
                console.error('/tickerList', status, err.toString());
            }
        });
    },
    render() {
        return (
            <div>
                <Search />
                <CTickerList />
            </div>
        );
    }
});

const CProfile = connect(state => state)(Profile);