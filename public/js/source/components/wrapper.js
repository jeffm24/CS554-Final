const Wrapper = React.createClass({
    render() {
        return (
            <div>
                <LoginForm url="/"/>
                <Profile/>
            </div>
        );
    }
});

ReactDOM.render(<Wrapper/>, document.getElementById('stock-app'));
