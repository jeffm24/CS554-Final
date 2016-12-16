const LoginForm = React.createClass({
    getInitialState() {
        return {loginInfo: {}, registerInfo: {}, activeView: 'login'};
    },
    resetState() {
        this.setState({loginInfo: {}, registerInfo: {}, activeView: 'login'});
    },
    submitRegisterForm(e) {
        e.preventDefault();

        var self = this;

        $.ajax({
            url: '/register',
            type: 'POST',
            data: {
                username: this.state.registerInfo.username,
                password: this.state.registerInfo.password,
                confirm: this.state.registerInfo.confirmPassword,
                recaptchaResponse: grecaptcha.getResponse()
            },
            success: function(data) {
                grecaptcha.reset();

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

        $.ajax({
            url: '/signin',
            type: 'POST',
            data: {
                username: this.state.loginInfo.username,
                password: this.state.loginInfo.password
            },
            success: function(data) {
                location.reload();
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

        this.resetState();
    },
    changeLoginInfo(e) {
        var newLoginInfo = {
            username: $('#login-username').val(),
            password: $('#login-password').val()
        };

        this.setState({loginInfo: newLoginInfo});
    },
    changeRegisterInfo(e) {
        var newRegisterInfo = {
            username: $('#register-username').val(),
            password: $('#register-password').val(),
            confirmPassword: $('#register-confirm-password').val()
        };

        this.setState({registerInfo: newRegisterInfo});
    },
    isViewActive(view) {
        //console.log(view);
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
            <div class="row">
                <div class="col-md-6 col-md-offset-3" id="sign-in-content">
                    <div class="panel panel-login">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-6">
                                    <a href="#" className={this.isViewActive('login')} onClick={() => {this.setActiveView('login')}}>Login</a>
                                </div>
                                <div class="col-xs-6">
                                    <a href="#" className={this.isViewActive('register')} onClick={() => {this.setActiveView('register')}}>Register</a>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <form id="login-form" className={this.isFormHidden('login')} onSubmit={this.submitLoginForm}>
                                        <div class="form-group">
                                            <label class="hidden" for="login-username">Username</label>
                                            <input 
                                                type="text" 
                                                name="login-username" 
                                                id="login-username" 
                                                tabindex="1" 
                                                class="form-control" 
                                                placeholder="Username" 
                                                onChange={this.changeLoginInfo}
                                                value={this.state.loginInfo.username} />
                                        </div>
                                        <div class="form-group">
                                            <label class="hidden" for="login-password">Password</label>
                                            <input 
                                                type="password" 
                                                name="login-password" 
                                                id="login-password" 
                                                tabindex="2" 
                                                class="form-control" 
                                                placeholder="Password"
                                                onChange={this.changeLoginInfo}
                                                value={this.state.loginInfo.password} />
                                        </div>
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-sm-6 col-sm-offset-3">
                                                    <input type="submit" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-primary" value="Log In" />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <form id="register-form" className={this.isFormHidden('register')} onSubmit={this.submitRegisterForm}>
                                        <div class="form-group">
                                            <label class="hidden" for="register-username">Username</label>
                                            <input 
                                                type="text" 
                                                name="register-username" 
                                                id="register-username" 
                                                tabindex="1" 
                                                class="form-control" 
                                                placeholder="Username" 
                                                onChange={this.changeRegisterInfo}
                                                value={this.state.registerInfo.username} />
                                        </div>
                                        <div class="form-group">
                                            <label class="hidden" for="register-password">Password</label>
                                            <input 
                                                type="password" 
                                                name="register-password" 
                                                id="register-password" 
                                                tabindex="2" 
                                                class="form-control" 
                                                placeholder="Password"
                                                onChange={this.changeRegisterInfo}
                                                value={this.state.registerInfo.password} />
                                        </div>
                                        <div class="form-group">
                                            <label class="hidden" for="register-confirm-password">Confirm Password</label>
                                            <input 
                                                type="password" 
                                                name="register-confirm-password" 
                                                id="register-confirm-password" 
                                                tabindex="2" 
                                                class="form-control" 
                                                placeholder="Confirm Password"
                                                onChange={this.changeRegisterInfo}
                                                value={this.state.registerInfo.confirmPassword} />
                                        </div>
                                        <div class="form-group">
                                            <div class="g-recaptcha" data-sitekey="6LfHNh8TAAAAAJeYQyoVxYu9o1iL3o1Lvm3e4SUh" style={{'transform': 'scale(0.77)', '-webkit-transform': 'scale(0.77)', 'transform-origin': '0 0', '-webkit-transform-origin': '0 0'}}></div>
                                        </div>
                                        <div class="form-group">
                                            <div class="row">
                                                <div class="col-sm-6 col-sm-offset-3">
                                                    <input type="submit" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-primary" value="Register" />
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

ReactDOM.render(<LoginForm url="/"/>, document.getElementById('content'));
