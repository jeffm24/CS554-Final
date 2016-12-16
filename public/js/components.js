'use strict';

var LoginForm = React.createClass({
    displayName: 'LoginForm',
    getInitialState: function getInitialState() {
        return { loginInfo: {}, registerInfo: {}, activeView: 'login' };
    },
    resetState: function resetState() {
        this.setState({ loginInfo: {}, registerInfo: {}, activeView: 'login' });
    },
    submitRegisterForm: function submitRegisterForm(e) {
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
            success: function success(data) {
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
            error: function error(xhr, status, _error) {
                swal({
                    title: "Error!",
                    text: xhr.responseJSON.error,
                    type: "error",
                    confirmButtonText: "OK"
                });
            }
        });
    },
    submitLoginForm: function submitLoginForm(e) {
        e.preventDefault();

        $.ajax({
            url: '/signin',
            type: 'POST',
            data: {
                username: this.state.loginInfo.username,
                password: this.state.loginInfo.password
            },
            success: function success(data) {
                location.reload();
            },
            error: function error(xhr, status, _error2) {
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
    changeLoginInfo: function changeLoginInfo(e) {
        var newLoginInfo = {
            username: $('#login-username').val(),
            password: $('#login-password').val()
        };

        this.setState({ loginInfo: newLoginInfo });
    },
    changeRegisterInfo: function changeRegisterInfo(e) {
        var newRegisterInfo = {
            username: $('#register-username').val(),
            password: $('#register-password').val(),
            confirmPassword: $('#register-confirm-password').val()
        };

        this.setState({ registerInfo: newRegisterInfo });
    },
    isViewActive: function isViewActive(view) {
        //console.log(view);
        return this.state.activeView === view ? 'active' : '';
    },
    isFormHidden: function isFormHidden(view) {
        return this.state.activeView === view ? '' : 'hidden';
    },
    setActiveView: function setActiveView(view) {
        this.setState({ activeView: view });
    },
    render: function render() {
        var _this = this;

        return React.createElement(
            'div',
            { 'class': 'row' },
            React.createElement(
                'div',
                { 'class': 'col-md-6 col-md-offset-3', id: 'sign-in-content' },
                React.createElement(
                    'div',
                    { 'class': 'panel panel-login' },
                    React.createElement(
                        'div',
                        { 'class': 'panel-heading' },
                        React.createElement(
                            'div',
                            { 'class': 'row' },
                            React.createElement(
                                'div',
                                { 'class': 'col-xs-6' },
                                React.createElement(
                                    'a',
                                    { href: '#', className: this.isViewActive('login'), onClick: function onClick() {
                                            _this.setActiveView('login');
                                        } },
                                    'Login'
                                )
                            ),
                            React.createElement(
                                'div',
                                { 'class': 'col-xs-6' },
                                React.createElement(
                                    'a',
                                    { href: '#', className: this.isViewActive('register'), onClick: function onClick() {
                                            _this.setActiveView('register');
                                        } },
                                    'Register'
                                )
                            )
                        ),
                        React.createElement('hr', null)
                    ),
                    React.createElement(
                        'div',
                        { 'class': 'panel-body' },
                        React.createElement(
                            'div',
                            { 'class': 'row' },
                            React.createElement(
                                'div',
                                { 'class': 'col-lg-12' },
                                React.createElement(
                                    'form',
                                    { id: 'login-form', className: this.isFormHidden('login'), onSubmit: this.submitLoginForm },
                                    React.createElement(
                                        'div',
                                        { 'class': 'form-group' },
                                        React.createElement(
                                            'label',
                                            { 'class': 'hidden', 'for': 'login-username' },
                                            'Username'
                                        ),
                                        React.createElement('input', {
                                            type: 'text',
                                            name: 'login-username',
                                            id: 'login-username',
                                            tabindex: '1',
                                            'class': 'form-control',
                                            placeholder: 'Username',
                                            onChange: this.changeLoginInfo,
                                            value: this.state.loginInfo.username })
                                    ),
                                    React.createElement(
                                        'div',
                                        { 'class': 'form-group' },
                                        React.createElement(
                                            'label',
                                            { 'class': 'hidden', 'for': 'login-password' },
                                            'Password'
                                        ),
                                        React.createElement('input', {
                                            type: 'password',
                                            name: 'login-password',
                                            id: 'login-password',
                                            tabindex: '2',
                                            'class': 'form-control',
                                            placeholder: 'Password',
                                            onChange: this.changeLoginInfo,
                                            value: this.state.loginInfo.password })
                                    ),
                                    React.createElement(
                                        'div',
                                        { 'class': 'form-group' },
                                        React.createElement(
                                            'div',
                                            { 'class': 'row' },
                                            React.createElement(
                                                'div',
                                                { 'class': 'col-sm-6 col-sm-offset-3' },
                                                React.createElement('input', { type: 'submit', name: 'login-submit', id: 'login-submit', tabindex: '4', 'class': 'form-control btn btn-primary', value: 'Log In' })
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'form',
                                    { id: 'register-form', className: this.isFormHidden('register'), onSubmit: this.submitRegisterForm },
                                    React.createElement(
                                        'div',
                                        { 'class': 'form-group' },
                                        React.createElement(
                                            'label',
                                            { 'class': 'hidden', 'for': 'register-username' },
                                            'Username'
                                        ),
                                        React.createElement('input', {
                                            type: 'text',
                                            name: 'register-username',
                                            id: 'register-username',
                                            tabindex: '1',
                                            'class': 'form-control',
                                            placeholder: 'Username',
                                            onChange: this.changeRegisterInfo,
                                            value: this.state.registerInfo.username })
                                    ),
                                    React.createElement(
                                        'div',
                                        { 'class': 'form-group' },
                                        React.createElement(
                                            'label',
                                            { 'class': 'hidden', 'for': 'register-password' },
                                            'Password'
                                        ),
                                        React.createElement('input', {
                                            type: 'password',
                                            name: 'register-password',
                                            id: 'register-password',
                                            tabindex: '2',
                                            'class': 'form-control',
                                            placeholder: 'Password',
                                            onChange: this.changeRegisterInfo,
                                            value: this.state.registerInfo.password })
                                    ),
                                    React.createElement(
                                        'div',
                                        { 'class': 'form-group' },
                                        React.createElement(
                                            'label',
                                            { 'class': 'hidden', 'for': 'register-confirm-password' },
                                            'Confirm Password'
                                        ),
                                        React.createElement('input', {
                                            type: 'password',
                                            name: 'register-confirm-password',
                                            id: 'register-confirm-password',
                                            tabindex: '2',
                                            'class': 'form-control',
                                            placeholder: 'Confirm Password',
                                            onChange: this.changeRegisterInfo,
                                            value: this.state.registerInfo.confirmPassword })
                                    ),
                                    React.createElement(
                                        'div',
                                        { 'class': 'form-group' },
                                        React.createElement('div', { 'class': 'g-recaptcha', 'data-sitekey': '6LfHNh8TAAAAAJeYQyoVxYu9o1iL3o1Lvm3e4SUh', style: { 'transform': 'scale(0.77)', '-webkit-transform': 'scale(0.77)', 'transform-origin': '0 0', '-webkit-transform-origin': '0 0' } })
                                    ),
                                    React.createElement(
                                        'div',
                                        { 'class': 'form-group' },
                                        React.createElement(
                                            'div',
                                            { 'class': 'row' },
                                            React.createElement(
                                                'div',
                                                { 'class': 'col-sm-6 col-sm-offset-3' },
                                                React.createElement('input', { type: 'submit', name: 'register-submit', id: 'register-submit', tabindex: '4', 'class': 'form-control btn btn-primary', value: 'Register' })
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(LoginForm, { url: '/' }), document.getElementById('content'));
"use strict";

var Recipe = React.createClass({
  displayName: "Recipe",

  getInitialState: function getInitialState() {
    return { showingDetails: false };
  },
  showMore: function showMore(e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.setState({ showingDetails: true });
  },
  showLess: function showLess(e) {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    this.setState({ showingDetails: false });
  },
  render: function render() {

    var bodyContent = undefined;
    var toggler = undefined;

    if (this.state.showingDetails) {
      var steps = this.props.steps.map(function (step) {
        return React.createElement(
          "li",
          null,
          step
        );
      });

      var ingredients = this.props.ingredients.map(function (step) {
        return React.createElement(
          "li",
          null,
          step
        );
      });

      bodyContent = React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          null,
          this.props.description
        ),
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "div",
            { className: "col-md-8" },
            React.createElement(
              "ol",
              null,
              steps
            )
          ),
          React.createElement(
            "div",
            { className: "col-sm-4" },
            React.createElement(
              "ul",
              null,
              ingredients
            )
          )
        )
      );
      toggler = React.createElement(
        "p",
        { className: "text-center" },
        React.createElement(
          "a",
          { onClick: this.showLess, href: "" },
          "Show Less"
        )
      );
    } else {
      bodyContent = React.createElement(
        "p",
        null,
        this.props.description
      );

      toggler = React.createElement(
        "p",
        { className: "text-center" },
        React.createElement(
          "a",
          { onClick: this.showMore, href: "" },
          "Show More"
        )
      );
    }

    return React.createElement(
      "div",
      { className: "panel panel-default" },
      React.createElement(
        "div",
        { className: "panel-heading" },
        this.props.title
      ),
      React.createElement(
        "div",
        { className: "panel-body" },
        bodyContent,
        toggler
      )
    );
  }
});
"use strict";

var RecipeList = React.createClass({
    displayName: "RecipeList",

    getInitialState: function getInitialState() {
        return { recipes: [] };
    },
    addRecipe: function addRecipe(newRecipe) {
        var recipes = this.state.recipes.concat([newRecipe]);

        this.setState({ recipes: recipes });
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function success(recipeList) {
                _this.setState({ recipes: recipeList });
            },
            error: function error(xhr, status, err) {
                console.error(_this.props.url, status, err.toString());
            }
        });
    },
    render: function render() {
        var recipeList = this.state.recipes;
        var recipes = recipeList.map(function (recipe) {
            return React.createElement(Recipe, {
                title: recipe.title,
                description: recipe.description,
                id: recipe.id,
                steps: recipe.steps,
                ingredients: recipe.ingredients });
        });

        return React.createElement(
            "div",
            { className: "recipe" },
            recipes,
            React.createElement("hr", null),
            React.createElement(RecipeForm, { onRecipeSubmit: this.addRecipe })
        );
    }
});

//ReactDOM.render(<RecipeList url="/recipes"/>, document.getElementById('content'));