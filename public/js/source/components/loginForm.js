const LoginForm = React.createClass({
    getInitialState() {
        return {activeView: 'login'};
    },
    resetState() {
        this.setState({activeView: 'login'});
    },
    submitRegisterForm(e) {
        e.preventDefault();

        var self = this;

        $.ajax({
            url: '/register',
            type: 'POST',
            data: {
                username: $('#register-username').val(),
                password: $('#register-password').val(),
                confirm: $('#register-confirm-password').val()
            },
            success: function(data) {
                swal({
                    title: "Success!",
                    text: data.status,
                    type: "success",
                    confirmButtonText: "OK"
                });

                // Clear out fields
                self.resetState();
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
    submitLoginForm(e) {
        e.preventDefault();

        var self = this;

        $.ajax({
            url: '/signin',
            type: 'POST',
            data: {
                username: $('#login-username').val(),
                password: $('#login-password').val()
            }
        }).done((data) => {
            
            self.props.dispatch({type: 'SET_LOGIN', loginState: true});

        }).fail((xhr, status, error) => {
            swal({
                title: "Error!",
                text: xhr.responseJSON.error,
                type: "error",
                confirmButtonText: "OK"
            });
        });

        this.resetState();
    },
    isViewActive(view) {
        return (this.state.activeView === view) ? 'active' : '';
    },
    isFormHidden(view) {
        return (this.state.activeView === view) ? '' : 'hidden';
    },
    setActiveView(view) {
        this.setState({activeView: view});
    },
    render() {
        return (
            <div className="row">
                <div className="col-md-6 col-md-offset-3">
                    <div className="panel panel-login">
                        <div className="panel-heading">
                            <div className="row">
                                <div className="col-xs-6">
                                    <a href="#" className={this.isViewActive('login')} onClick={() => {this.setActiveView('login')}}>Login</a>
                                </div>
                                <div className="col-xs-6">
                                    <a href="#" className={this.isViewActive('register')} onClick={() => {this.setActiveView('register')}}>Register</a>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <form id="login-form" className={this.isFormHidden('login')} onSubmit={this.submitLoginForm}>
                                        <div className="form-group">
                                            <label className="hidden" htmlFor="login-username">Username</label>
                                            <input 
                                                type="text" 
                                                name="login-username" 
                                                id="login-username" 
                                                tabIndex="1" 
                                                className="form-control" 
                                                placeholder="Username" />
                                        </div>
                                        <div className="form-group">
                                            <label className="hidden" htmlFor="login-password">Password</label>
                                            <input 
                                                type="password" 
                                                name="login-password" 
                                                id="login-password" 
                                                tabIndex="2" 
                                                className="form-control" 
                                                placeholder="Password" />
                                        </div>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-sm-6 col-sm-offset-3">
                                                    <input type="submit" name="login-submit" id="login-submit" tabIndex="4" className="form-control btn btn-primary" value="Log In" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <form id="register-form" className={this.isFormHidden('register')} onSubmit={this.submitRegisterForm}>
                                        <div className="form-group">
                                            <label className="hidden" htmlFor="register-username">Username</label>
                                            <input 
                                                type="text" 
                                                name="register-username" 
                                                id="register-username" 
                                                tabIndex="1" 
                                                className="form-control" 
                                                placeholder="Username" />
                                        </div>
                                        <div className="form-group">
                                            <label className="hidden" htmlFor="register-password">Password</label>
                                            <input 
                                                type="password" 
                                                name="register-password" 
                                                id="register-password" 
                                                tabIndex="2" 
                                                className="form-control" 
                                                placeholder="Password" />
                                        </div>
                                        <div className="form-group">
                                            <label className="hidden" htmlFor="register-confirm-password">Confirm Password</label>
                                            <input 
                                                type="password" 
                                                name="register-confirm-password" 
                                                id="register-confirm-password" 
                                                tabIndex="2" 
                                                className="form-control" 
                                                placeholder="Confirm Password" />
                                        </div>
                                        <div className="form-group">
                                            <div className="row">
                                                <div className="col-sm-6 col-sm-offset-3">
                                                    <input type="submit" name="register-submit" id="register-submit" tabIndex="4" className="form-control btn btn-primary" value="Register" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

const CLoginForm = connect(state => state)(LoginForm);
