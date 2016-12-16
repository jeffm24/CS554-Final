const Wrapper = React.createClass({
    getInitialState() {
        return { loggedIn: false};
    },
    componentDidMount() {
        $.ajax({
            url: '/checkLoginStatus',
            type: 'GET'
        }).done((data) => {
            this.setState({ loggedIn: data.loggedIn });
        });
    },
    onLogin() {
        this.setState({ loggedIn: true });
    },
    render() {
        let mainComponent = null;
        if(this.state.loggedIn){
            mainComponent = <Profile/>
        }else{
            mainComponent = <LoginForm loginFunc={this.onLogin.bind(this)} url="/"/>
        }

        return (
            <div>
                {mainComponent}
            </div>
        );
    }
});

ReactDOM.render(<Wrapper/>, document.getElementById('stock-app'));
