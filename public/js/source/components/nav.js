const Nav = React.createClass({
    getInitialState() {
        return {};
    },
    signOut() {
        $.ajax({
            url: '/signout',
            type: 'POST',
            success: function(data) {
                location.reload();
            },
            error: function(xhr, status, error) {
                alert(xhr.responseText + ' (' + xhr.status + ')');
            }
        });
    },
    render() {
        var userDropdown = null;

        if (this.props.loggedIn) {
            userDropdown = (
                <div className="collapse navbar-collapse" id="navbar-collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> username <span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li><button id="signOutBtn" type="button" className="btn btn-danger" onClick={this.signOut}>Sign Out</button></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            );
        }

        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#"><img alt="StockPile Logo" className="nav-icon pull-left" src="/assets/images/logo.png" /><span className="nav-title">StockPile</span></a>
                    </div>
                    {userDropdown}
                </div>
            </nav>
        );
    }
})