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
                confirm: this.state.registerInfo.confirmPassword
            },
            success: function success(data) {
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
        var _this = this;

        e.preventDefault();

        $.ajax({
            url: '/signin',
            type: 'POST',
            data: {
                username: this.state.loginInfo.username,
                password: this.state.loginInfo.password
            }
        }).done(function (data) {
            _this.props.loginFunc();
        }).fail(function (xhr, status, error) {
            swal({
                title: "Error!",
                text: xhr.responseJSON.error,
                type: "error",
                confirmButtonText: "OK"
            });
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
        var _this2 = this;

        return React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-md-6 col-md-offset-3', id: 'sign-in-content' },
                React.createElement(
                    'div',
                    { className: 'panel panel-login' },
                    React.createElement(
                        'div',
                        { className: 'panel-heading' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-xs-6' },
                                React.createElement(
                                    'a',
                                    { href: '#', className: this.isViewActive('login'), onClick: function onClick() {
                                            _this2.setActiveView('login');
                                        } },
                                    'Login'
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-xs-6' },
                                React.createElement(
                                    'a',
                                    { href: '#', className: this.isViewActive('register'), onClick: function onClick() {
                                            _this2.setActiveView('register');
                                        } },
                                    'Register'
                                )
                            )
                        ),
                        React.createElement('hr', null)
                    ),
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-lg-12' },
                                React.createElement(
                                    'form',
                                    { id: 'login-form', className: this.isFormHidden('login'), onSubmit: this.submitLoginForm },
                                    React.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        React.createElement(
                                            'label',
                                            { className: 'hidden', 'for': 'login-username' },
                                            'Username'
                                        ),
                                        React.createElement('input', {
                                            type: 'text',
                                            name: 'login-username',
                                            id: 'login-username',
                                            tabindex: '1',
                                            className: 'form-control',
                                            placeholder: 'Username',
                                            onChange: this.changeLoginInfo,
                                            value: this.state.loginInfo.username })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        React.createElement(
                                            'label',
                                            { className: 'hidden', 'for': 'login-password' },
                                            'Password'
                                        ),
                                        React.createElement('input', {
                                            type: 'password',
                                            name: 'login-password',
                                            id: 'login-password',
                                            tabindex: '2',
                                            className: 'form-control',
                                            placeholder: 'Password',
                                            onChange: this.changeLoginInfo,
                                            value: this.state.loginInfo.password })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        React.createElement(
                                            'div',
                                            { className: 'row' },
                                            React.createElement(
                                                'div',
                                                { className: 'col-sm-6 col-sm-offset-3' },
                                                React.createElement('input', { type: 'submit', name: 'login-submit', id: 'login-submit', tabindex: '4', className: 'form-control btn btn-primary', value: 'Log In' })
                                            )
                                        )
                                    )
                                ),
                                React.createElement(
                                    'form',
                                    { id: 'register-form', className: this.isFormHidden('register'), onSubmit: this.submitRegisterForm },
                                    React.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        React.createElement(
                                            'label',
                                            { className: 'hidden', 'for': 'register-username' },
                                            'Username'
                                        ),
                                        React.createElement('input', {
                                            type: 'text',
                                            name: 'register-username',
                                            id: 'register-username',
                                            tabindex: '1',
                                            className: 'form-control',
                                            placeholder: 'Username',
                                            onChange: this.changeRegisterInfo,
                                            value: this.state.registerInfo.username })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        React.createElement(
                                            'label',
                                            { className: 'hidden', 'for': 'register-password' },
                                            'Password'
                                        ),
                                        React.createElement('input', {
                                            type: 'password',
                                            name: 'register-password',
                                            id: 'register-password',
                                            tabindex: '2',
                                            className: 'form-control',
                                            placeholder: 'Password',
                                            onChange: this.changeRegisterInfo,
                                            value: this.state.registerInfo.password })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        React.createElement(
                                            'label',
                                            { className: 'hidden', 'for': 'register-confirm-password' },
                                            'Confirm Password'
                                        ),
                                        React.createElement('input', {
                                            type: 'password',
                                            name: 'register-confirm-password',
                                            id: 'register-confirm-password',
                                            tabindex: '2',
                                            className: 'form-control',
                                            placeholder: 'Confirm Password',
                                            onChange: this.changeRegisterInfo,
                                            value: this.state.registerInfo.confirmPassword })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        React.createElement('div', { className: 'g-recaptcha', 'data-sitekey': '6LfHNh8TAAAAAJeYQyoVxYu9o1iL3o1Lvm3e4SUh', style: { 'transform': 'scale(0.77)', '-webkit-transform': 'scale(0.77)', 'transform-origin': '0 0', '-webkit-transform-origin': '0 0' } })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        React.createElement(
                                            'div',
                                            { className: 'row' },
                                            React.createElement(
                                                'div',
                                                { className: 'col-sm-6 col-sm-offset-3' },
                                                React.createElement('input', { type: 'submit', name: 'register-submit', id: 'register-submit', tabindex: '4', className: 'form-control btn btn-primary', value: 'Register' })
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
"use strict";

var Profile = React.createClass({
    displayName: "Profile",
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "p",
                null,
                "Profile"
            ),
            React.createElement(Search, null)
        );
    }
});
"use strict";

var Search = React.createClass({
    displayName: "Search",
    getInitialState: function getInitialState() {
        return { searchInfo: ''};
    },
    resetState: function resetState() {
        this.setState({ searchInfo: ''});
    },
    changeSearchInfo: function changeSearchInfo(e) {
        var newSearchInfo = $('#searchBarInput').val();

        this.setState({ searchInfo: newSearchInfo });
    },
    dynamicSearchSuggest: function dynamicSearchSuggest(e) {
        console.log('fire');
        if ($('#searchBarInput').val()) {
            $.ajax({
                url: '/getTickerSearchSuggestions?ticker=' + $('#searchBarInput').val(),
                type: 'GET',
                success: function (data) {
                    if (data) {
                        console.log("it's in data")
                        var listOfSymbols = [];

                        for (ticker of data.suggestions) {
                            listOfSymbols.push(ticker.symbol);
                        }

                        console.log(listOfSymbols.toString());
                        $('#searchBarInput').autocomplete({
                            source: listOfSymbols
                        });
                    }
                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText + ' (' + xhr.status + ')');
                }
            });
        }
    },
    submitSearchForm: function submitSearchForm(e) {
        $.ajax({
            url: '/search',
            type: 'PUT',
            data: {
                search: $('#searchBarInput').val().toUpperCase()
            },
            success: function (data) {
                if (data.notFound) {
                    swal({
                        title: "Error!",
                        text: data.result,
                        type: "error",
                        confirmButtonText: "OK"
                    });
                } else {

                    // Create the render data object to be passed to the renderer
                    var renderData = {
                        tickerSymbol: data.result.symbol,
                        changeInPercent: data.result.ChangeinPercent,
                        open: data.result.Open,
                        todayHigh: data.result.DaysHigh,
                        todayLow: data.result.DaysLow,
                        wkHigh: data.result.YearHigh,
                        wkLow: data.result.YearLow,
                        volume: data.result.Volume,
                        avgVolume: data.result.AverageDailyVolume,
                        marketCap: data.result.MarketCapitalization,
                        peRatio: data.result.PERatio,
                        divYield: data.result.DividendYield,
                        change: data.result.change,
                        userSavedTickers: data.result.userSavedTickers
                    };

                    // Get the contents of the searchTickerItem ejs file to pass to the renderer
                    $.ajax({
                        url: '/assets/templates/searchTickerItem.ejs',
                        type: 'GET',
                        success: function (searchTickerItemEJS) {

                            // Render the searchTickerItem and insert it
                            var html = ejs.render(searchTickerItemEJS, renderData);
                            $('#searchResult').html(html);
                            makeGraph(data.result.symbol, "Search");

                        }
                    });
                }
            },
            error: function (xhr, status, error) {
                swal({
                    title: "Error!",
                    text: xhr.responseJSON.error,
                    type: "error",
                    confirmButtonText: "OK"
                });
            }
        });

        return false;    
    },
    render: function render() {
        return React.createElement(
            "div",
            {classname: 'search'},
            React.createElement(
                "div",
                { className: 'page-header' },
                React.createElement(
                    "h2",
                    null,
                    "Search: "
                )
            ),
            React.createElement(
                "form",
                {id: 'searchForm'},
                React.createElement(
                    "div",
                    {classname: 'input-group', id: 'searchBar'/*, 'data-spy': 'affix'*/ },
                    React.createElement("label", {classname: 'hidden', 'for': 'searchBarInput'}, "Enter Search Here "),
                    React.createElement("input", {type: 'text', id: 'searchBarInput', name: 'searchBarInput', classname: 'form-control', placeholder: 'Search Tickers', onChange: this.dynamicSearchSuggest/*, value: this.state.searchInfo*/ }),
                    React.createElement(
                        "span",
                        {classname: 'input-group-btn'},
                        React.createElement("button", {classname: 'btn btn-primary', id: 'searchBtn', type: 'submit'}, "Go!")
                    )
                )
            ),
            React.createElement(
                "div",
                {id: 'searchResult'}
            )
        );
    }
});
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
'use strict';

var Wrapper = React.createClass({
    displayName: 'Wrapper',
    getInitialState: function getInitialState() {
        return { loggedIn: false };
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        $.ajax({
            url: '/checkLoginStatus',
            type: 'GET'
        }).done(function (data) {
            _this.setState({ loggedIn: data.loggedIn });
        });
    },
    onLogin: function onLogin() {
        this.setState({ loggedIn: true });
    },
    render: function render() {
        var mainComponent = null;
        if (this.state.loggedIn) {
            mainComponent = React.createElement(Profile, null);
        } else {
            mainComponent = React.createElement(LoginForm, { loginFunc: this.onLogin.bind(this), url: '/' });
        }

        return React.createElement(
            'div',
            null,
            mainComponent
        );
    }
});

ReactDOM.render(React.createElement(Wrapper, null), document.getElementById('stock-app'));