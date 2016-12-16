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
'use strict';

var Nav = React.createClass({
    displayName: 'Nav',
    getInitialState: function getInitialState() {
        return {};
    },
    signOut: function signOut() {
        $.ajax({
            url: '/signout',
            type: 'POST',
            success: function success(data) {
                location.reload();
            },
            error: function error(xhr, status, _error) {
                alert(xhr.responseText + ' (' + xhr.status + ')');
            }
        });
    },
    render: function render() {
        var userDropdown = null;

        if (this.props.loggedIn) {
            userDropdown = React.createElement(
                'div',
                { className: 'collapse navbar-collapse', id: 'navbar-collapse' },
                React.createElement(
                    'ul',
                    { className: 'nav navbar-nav navbar-right' },
                    React.createElement(
                        'li',
                        { className: 'dropdown' },
                        React.createElement(
                            'a',
                            { href: '#', className: 'dropdown-toggle', 'data-toggle': 'dropdown', role: 'button', 'aria-haspopup': 'true', 'aria-expanded': 'false' },
                            ' username ',
                            React.createElement('span', { className: 'caret' })
                        ),
                        React.createElement(
                            'ul',
                            { className: 'dropdown-menu' },
                            React.createElement(
                                'li',
                                null,
                                React.createElement(
                                    'a',
                                    { href: '/account' },
                                    'Edit Account'
                                )
                            ),
                            React.createElement('li', { role: 'separator', className: 'divider' }),
                            React.createElement(
                                'li',
                                null,
                                React.createElement(
                                    'button',
                                    { id: 'signOutBtn', type: 'button', className: 'btn btn-danger', onClick: this.signOut },
                                    'Sign Out'
                                )
                            )
                        )
                    )
                )
            );
        }

        return React.createElement(
            'nav',
            { className: 'navbar navbar-inverse navbar-fixed-top' },
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { className: 'navbar-header' },
                    React.createElement(
                        'button',
                        { type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#navbar-collapse', 'aria-expanded': 'false' },
                        React.createElement(
                            'span',
                            { className: 'sr-only' },
                            'Toggle navigation'
                        ),
                        React.createElement('span', { className: 'icon-bar' }),
                        React.createElement('span', { className: 'icon-bar' }),
                        React.createElement('span', { className: 'icon-bar' })
                    ),
                    React.createElement(
                        'a',
                        { className: 'navbar-brand', href: '#' },
                        React.createElement('img', { alt: 'StockPile Logo', className: 'nav-icon pull-left', src: '/assets/images/logo.png' }),
                        React.createElement(
                            'span',
                            { className: 'nav-title' },
                            'StockPile'
                        )
                    )
                ),
                userDropdown
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
            React.createElement(Search, null),
            React.createElement(TickerList, null)
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

var Search = React.createClass({
    displayName: 'Search',
    getInitialState: function getInitialState() {
        return { searchInfo: '' };
    },
    resetState: function resetState() {
        this.setState({ searchInfo: '' });
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
                success: function success(data) {
                    if (data) {
                        console.log("it's in data");
                        console.log(data);
                        var listOfSymbols = [];

                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = data.suggestions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                ticker = _step.value;

                                listOfSymbols.push(ticker.symbol);
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }

                        console.log(listOfSymbols.toString());
                        $('#searchBarInput').autocomplete({
                            source: listOfSymbols
                        });
                    }
                },
                error: function error(xhr, status, _error) {
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
            success: function success(data) {
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
                        success: function success(searchTickerItemEJS) {

                            // Render the searchTickerItem and insert it
                            var html = ejs.render(searchTickerItemEJS, renderData);
                            $('#searchResult').html(html);
                            makeGraph(data.result.symbol, "Search");
                        }
                    });
                }
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

        return false;
    },
    render: function render() {
        return React.createElement(
            'div',
            { className: 'search' },
            React.createElement(
                'div',
                { className: 'page-header' },
                React.createElement(
                    'h2',
                    null,
                    'Search: '
                )
            ),
            React.createElement(
                'form',
                { id: 'searchForm' },
                React.createElement(
                    'div',
                    { id: 'searchBar', className: 'input-group', 'data-spy': 'affix' },
                    React.createElement(
                        'label',
                        { className: 'hidden', 'for': 'searchBarInput' },
                        ' Enter Search Here: '
                    ),
                    React.createElement('input', { type: 'text', id: 'searchBarInput', name: 'searchBarInput', className: 'form-control', placeholder: 'Search Tickers', onChange: this.dynamicSearchSuggest }),
                    React.createElement(
                        'span',
                        { className: 'input-group-btn' },
                        React.createElement(
                            'button',
                            { type: 'submit', className: 'btn btn-primary', id: 'searchBtn' },
                            'Go!'
                        )
                    )
                )
            ),
            React.createElement('div', { id: 'searchResult' })
        );
    }
});
'use strict';

var Ticker = React.createClass({
    displayName: 'Ticker',

    getInitialState: function getInitialState() {
        return {};
    },
    saveTicker: function saveTicker() {
        if (this.props.saved) return;

        $.ajax({
            url: '/saveTicker',
            type: 'POST',
            data: {
                symbol: this.props.tickerData.symbol
            },
            success: function success(data) {
                // ADD TICKER TO PARENT SAVED TICKER LIST
                // ADD TICKER SYMBOL TO CACHE
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
    removeTicker: function removeTicker() {
        if (!this.props.saved) return;

        $.ajax({
            url: '/removeTicker',
            type: 'DELETE',
            data: {
                symbol: $(event.target).data('symbol')
            },
            success: function success(data) {
                // REMOVE TICKER FROM PARENT SAVED TICKER LIST
                //removeFromCache($(event.target).data('symbol'));
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
    },
    render: function render() {
        var tickerContent = null;

        if (this.props.saved) {
            // Saved ticker

            tickerContent = React.createElement(
                'div',
                { id: "panel-" + this.props.tickerData.symbol, className: "panel panel-default tickerItem savedTickerItem " + this.props.tickerData.change, 'data-symbol': this.props.tickerData.symbol },
                React.createElement(
                    'a',
                    { 'data-toggle': 'collapse', 'data-parent': '#accordion', href: "#collapse" + this.props.tickerData.symbol },
                    React.createElement(
                        'div',
                        { className: 'panel-heading' },
                        React.createElement(
                            'h3',
                            { className: 'panel-title' },
                            this.props.tickerData.symbol,
                            ' ',
                            React.createElement(
                                'span',
                                { className: "change-percent " + this.props.tickerData.change },
                                '(',
                                this.props.tickerData.ChangeInPercent,
                                ')'
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { id: "collapse" + this.props.tickerData.symbol, className: "panel-collapse collapse " + this.props.tickerData.change },
                    React.createElement(
                        'div',
                        { className: 'panel-body' },
                        React.createElement(
                            'div',
                            { className: 'row' },
                            React.createElement(
                                'div',
                                { className: 'col-xs-12 col-sm-6' },
                                React.createElement(TickerGraph, {
                                    saved: 'true',
                                    tickerData: this.props.tickerData })
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-xs-12 col-sm-6' },
                                React.createElement(TickerStats, {
                                    saved: 'true',
                                    tickerData: this.props.tickerData })
                            )
                        ),
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-danger remove-ticker-btn pull-right', onClick: this.removeTicker },
                            'Remove'
                        ),
                        React.createElement('div', { className: 'clearfix' })
                    )
                )
            );
        } else {
            // Search ticker

            var addTickerBtn = null;

            if (this.props.userSavedTickers && this.props.userSavedTickers.indexOf(this.props.tickerData.symbol) === -1) {
                addTickerBtn = React.createElement(
                    'span',
                    { className: 'pull-right' },
                    React.createElement(
                        'label',
                        { className: 'hidden', 'for': 'saveTickerBtn' },
                        ' Add ',
                        this.props.tickerData.symbol,
                        ' to Portfolio  '
                    ),
                    React.createElement(
                        'button',
                        { type: 'button', id: 'saveTickerBtn', className: 'btn btn-primary', onClick: this.saveTicker },
                        React.createElement('span', { className: 'glyphicon glyphicon-plus', 'aria-hidden': 'true' })
                    ),
                    React.createElement('div', { className: 'clearfix' })
                );
            }

            tickerContent = React.createElement(
                'div',
                { id: 'panel-search', className: "panel panel-default tickerItem " + this.props.tickerData.change },
                React.createElement(
                    'div',
                    { className: 'panel-heading' },
                    React.createElement(
                        'h3',
                        { className: 'panel-title' },
                        this.props.tickerData.symbol,
                        ' ',
                        React.createElement(
                            'span',
                            { className: "change-percent " + this.props.tickerData.change },
                            '(',
                            this.props.tickerData.ChangeInPercent,
                            ')'
                        )
                    ),
                    addTickerBtn
                ),
                React.createElement(
                    'div',
                    { className: 'panel-body' },
                    React.createElement(
                        'div',
                        { className: 'row' },
                        React.createElement(
                            'div',
                            { className: 'col-xs-12 col-sm-6' },
                            React.createElement(TickerGraph, {
                                tickerData: this.props.tickerData })
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-xs-12 col-sm-6' },
                            React.createElement(TickerStats, {
                                tickerData: this.props.tickerData })
                        )
                    )
                )
            );
        }

        return tickerContent;
    }
});
'use strict';

/*
function makeGraph(s, tag) {
    //var margin = {top: 1, right: 0, bottom: 20, left: 0};
    var margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = $("#d3" + tag + "-" + s).outerWidth() - margin.left - margin.right,
        height = $("#d3" + tag + "-" + s).outerHeight() - margin.top - margin.bottom;

    var svg = d3.select("#d3" + tag + "-" + s)
        .append("svg")
        // .attr("viewBox", "0 0 500 400")
        // .attr("preserveAspectRatio", "xMinYMin slice")
        // .classed("svg-content-responsive", true)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate("
            + margin.left
            + "," + margin.top + ")");

    svg.append("path")        // Add the valueline path.
        .attr("class", "line");
    $('#buttons' + tag + '-' + s + ' .week').click();
}

function updateGraph(t,s,e,tag,range) {

    var stock = t;
    var start = s;
    var end = e;
    var DATA;

    DATA = isCacheUpToDate(stock,range);

    if(!DATA){
        //console.log("UPDATE GRAPH - CACHE NEEDS UPDATING");
        var requestConfig = {
            method: "PUT",
            url: "/searchHistory",
            contentType: 'application/json',
            data: JSON.stringify({
                ticker: stock,
                start: start,
                end: end
            })
        };
        $.ajax(requestConfig).then(function(data) {
            DATA = updateCache(stock,data,range);
            drawGraph(t,s,e,tag,DATA.data);
        });
    }

    if(DATA){
        drawGraph(t,s,e,tag,DATA.data);
    }

};

function drawGraph(t,s,e,tag,DATA){
    var stock = t;
    var start = s;
    var end = e;
    var values = [];
    var margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = $("#d3" + tag + "-" + stock).outerWidth() - margin.left - margin.right,
        height = $("#d3" + tag + "-" + stock).outerHeight() - margin.top - margin.bottom;


    var x = d3.time.scale().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    //console.log("#d3" + stock);
    var parseDate = d3.time.format("%Y-%m-%d").parse;
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.high); });


    DATA.result.forEach(function(d) {
        d.date = parseDate(d.Date);
        d.high = +d.High;
        d.low = +d.Low;
        values.push(d.Open);
    });

    x.domain(d3.extent(DATA.result, function(d) {
        return d.date; }));
    y.domain([
        d3.min(DATA.result, function(d) {
            return d.low; }),
        d3.max(DATA.result, function(d) {
            return d.high; })
    ]);

    var svg = d3.select("#d3" + tag + "-" + stock).transition();

    // Make the changes
    svg.select(".line")    // change the line
        .transition()
        .duration(500)
        .attr("d", valueline(DATA.result));

    var ret = (ubique.mean(ubique.tick2ret(values.reverse())) * 100).toFixed(4);
    var varc = (ubique.varc(ubique.tick2ret(values.reverse())) * 100).toFixed(4);
    $('#title' + tag + '-' + stock).text(parseFloat(DATA.result[0].Open).toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
    $('#return' + tag + '-' + stock).text(ret + "%");
    $('#variance' + tag + '-' + stock).text(varc + "%");

}

$(document).ready(function () {
    $(".d3-wrapper").each(function() {
        var symbol = $(this).data("symbol");

        makeGraph(symbol,"");
    });
});

$(window).resize(function() {
    if($('.searchButtons'))
        $('.searchButtons' + ' .active').click();

    $(".d3-wrapper").each(function() {
        var s = $(this).data("symbol");
        $('#buttons' + "" + '-' + s + ' .active').click();
    });
});
*/

var TickerGraph = React.createClass({
    displayName: 'TickerGraph',

    getInitialState: function getInitialState() {
        return { tickerData: this.props.tickerData, activePeriod: '1W' };
    },
    getDataPeriod: function getDataPeriod(newPeriod) {
        this.setState({ activePeriod: newPeriod });

        var stock = this.state.tickerData.symbol;
        var end = new Date();
        var start = new Date();

        switch (newPeriod) {
            case '1W':
                start.setDate(end.getDate() - 7);
                break;
            case '1M':
                start.setMonth(end.getMonth() - 1);
                break;
            case '3M':
                start.setMonth(end.getMonth() - 3);
                break;
            case '1Y':
                start.setFullYear(end.getFullYear() - 1);
                break;
        }

        start = start.toISOString().split('T')[0];
        end = end.toISOString().split('T')[0];

        if (this.props.saved) {
            //updateGraph(stock,start,end,"",newPeriod);
        } else {
                //updateGraph(stock,start,end,"Search",newPeriod);
            }
    },
    isActivePeriod: function isActivePeriod(period) {
        return this.state.activePeriod === period ? 'active' : '';
    },
    render: function render() {
        var _this = this;

        var searchIdLong = '',
            searchIdShort = '',
            searchBtnsClass = '';

        if (!this.props.saved) {
            searchIdLong = 'Search';
            searchIdShort = 's';
            searchBtnsClass = 'searchButtons';
        }

        return React.createElement(
            'div',
            { className: 'sub-panel graph-panel text-center' },
            React.createElement('div', { className: 'text-center price', id: "title" + searchIdLong + "-" + this.state.tickerData.symbol }),
            React.createElement('div', { className: 'd3-wrapper', id: "d3" + searchIdLong + "-" + this.state.tickerData.symbol, 'data-symbol': this.state.tickerData.symbol }),
            React.createElement(
                'div',
                { className: "buttons btn-group " + searchBtnsClass, id: "buttons-" + this.state.tickerData.symbol },
                React.createElement(
                    'label',
                    { className: 'hidden', 'for': "1W-" + this.state.tickerData.symbol },
                    ' View 1 Week Graph for ',
                    this.state.tickerData.symbol,
                    ' '
                ),
                React.createElement(
                    'button',
                    {
                        id: "1W" + searchIdShort + "-" + this.state.tickerData.symbol,
                        className: "btn btn-primary btn-graph week " + this.state.tickerData.change + " " + this.isActivePeriod('1W'),
                        type: 'button',
                        onClick: function onClick() {
                            _this.getDataPeriod('1W');
                        } },
                    '1W'
                ),
                React.createElement(
                    'label',
                    { className: 'hidden', 'for': "1M-" + this.state.tickerData.symbol },
                    ' View 1 Month Graph for ',
                    this.state.tickerData.symbol,
                    ' '
                ),
                React.createElement(
                    'button',
                    {
                        id: "1M" + searchIdShort + "-" + this.state.tickerData.symbol,
                        className: "btn btn-primary btn-graph month " + this.state.tickerData.change + " " + this.isActivePeriod('1M'),
                        type: 'button',
                        onClick: function onClick() {
                            _this.getDataPeriod('1M');
                        } },
                    '1M'
                ),
                React.createElement(
                    'label',
                    { className: 'hidden', 'for': "1M-" + this.state.tickerData.symbol },
                    ' View 3 Month Graph for ',
                    this.state.tickerData.symbol,
                    ' '
                ),
                React.createElement(
                    'button',
                    {
                        id: "3M" + searchIdShort + "-" + this.state.tickerData.symbol,
                        className: "btn btn-primary btn-graph 3month " + this.state.tickerData.change + " " + this.isActivePeriod('3M'),
                        type: 'button',
                        onClick: function onClick() {
                            _this.getDataPeriod('3M');
                        } },
                    '3M'
                ),
                React.createElement(
                    'label',
                    { className: 'hidden', 'for': "1Y-" + this.state.tickerData.symbol },
                    ' View 1 Year Graph for ',
                    this.state.tickerData.symbol,
                    ' '
                ),
                React.createElement(
                    'button',
                    {
                        id: "1Y" + searchIdShort + "-" + this.state.tickerData.symbol,
                        className: "btn btn-primary btn-graph year " + this.state.tickerData.change + " " + this.isActivePeriod('1Y'),
                        type: 'button',
                        onClick: function onClick() {
                            _this.getDataPeriod('1Y');
                        } },
                    '1Y'
                )
            )
        );
    }
});
'use strict';

var TickerList = React.createClass({
    displayName: 'TickerList',

    getInitialState: function getInitialState() {
        return { tickers: [] };
    },
    addTicker: function addTicker(newTicker) {
        var tickers = this.state.tickers.concat([newTicker]);

        this.setState({ tickers: tickers });
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        $.ajax({
            url: '/profileTickers',
            dataType: 'json',
            cache: false,
            success: function success(tickerList) {
                _this.setState({ tickers: tickerList.tickers });
            },
            error: function error(xhr, status, err) {
                console.error('/tickerList', status, err.toString());
            }
        });
    },
    render: function render() {

        var tickerList = this.state.tickers;
        var tickers = tickerList.map(function (ticker) {
            return React.createElement(Ticker, {
                tickerData: ticker,
                saved: 'true' });
        });

        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                { className: 'page-header' },
                React.createElement(
                    'h2',
                    null,
                    'My Tickers: '
                )
            ),
            React.createElement(
                'div',
                { className: 'panel-group', id: 'accordion' },
                tickers
            )
        );
    }
});

//ReactDOM.render(<TickerList/>, document.getElementById('content'));
'use strict';

var TickerStats = React.createClass({
    displayName: 'TickerStats',

    getInitialState: function getInitialState() {
        return { refreshRunning: false, tickerData: this.props.tickerData };
    },
    refreshTickerStats: function refreshTickerStats() {
        this.setState({ refreshRunning: true });
        this.updateTicker($(this).data('symbol'), true);
    },
    updateTicker: function updateTicker(tickerSymbol, showSuccessAlert) {
        var self = this;

        $.ajax({
            url: '/updateTicker',
            type: 'PUT',
            data: {
                symbol: tickerSymbol
            },
            success: function success(data) {
                // Create the render data object to be passed to the renderer
                this.setState({ tickerData: data.result });

                // Display success message to the user
                if (showSuccessAlert) {
                    swal({
                        title: "Success!",
                        text: renderData.tickerSymbol + " is now up to date.",
                        type: "success",
                        confirmButtonText: "OK"
                    });
                }

                self.setState({ refreshRunning: false });
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
    isRefreshDisabled: function isRefreshDisabled() {
        return this.state.refreshRunning ? 'true' : 'false';
    },
    render: function render() {
        var refreshButton = null;

        if (this.props.saved) {
            refreshButton = React.createElement(
                'span',
                { className: 'pull-right' },
                React.createElement(
                    'label',
                    { className: 'hidden', 'for': "refresh-" + this.state.tickerData.symbol },
                    ' Refresh ',
                    this.state.tickerData.symbol,
                    ' '
                ),
                React.createElement(
                    'button',
                    { type: 'button', id: "refresh-" + this.state.tickerData.symbol, className: 'btn btn-primary refresh-ticker-btn', 'data-symbol': this.state.tickerData.symbol, disabled: isRefreshDisabled },
                    React.createElement('span', { className: 'glyphicon glyphicon-refresh', 'aria-hidden': 'true' })
                )
            );
        }

        return React.createElement(
            'div',
            { id: "stats-" + this.state.tickerData.symbol, className: 'sub-panel stat-panel' },
            React.createElement(
                'h4',
                null,
                'Statistics ',
                refreshButton
            ),
            React.createElement('hr', null),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-xs-6' },
                    React.createElement(
                        'div',
                        { className: 'stat-item' },
                        React.createElement(
                            'p',
                            { className: 'stat-val' },
                            this.state.tickerData.Open
                        ),
                        React.createElement(
                            'p',
                            { className: 'stat-name' },
                            'Open'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'stat-item' },
                        React.createElement(
                            'p',
                            { className: 'stat-val' },
                            this.state.tickerData.DaysHigh
                        ),
                        React.createElement(
                            'p',
                            { className: 'stat-name' },
                            'Today\'s High'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'stat-item' },
                        React.createElement(
                            'p',
                            { className: 'stat-val' },
                            this.state.tickerData.DaysLow
                        ),
                        React.createElement(
                            'p',
                            { className: 'stat-name' },
                            'Today\'s Low'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'stat-item' },
                        React.createElement(
                            'p',
                            { className: 'stat-val' },
                            this.state.tickerData.YearHigh
                        ),
                        React.createElement(
                            'p',
                            { className: 'stat-name' },
                            '52 Wk High'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'stat-item' },
                        React.createElement(
                            'p',
                            { className: 'stat-val' },
                            this.state.tickerData.YearLow
                        ),
                        React.createElement(
                            'p',
                            { className: 'stat-name' },
                            '52 Wk Low'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'stat-item' },
                        React.createElement(
                            'p',
                            { className: 'stat-val', id: "return-" + this.state.tickerData.symbol },
                            this.state.tickerData.YearLow
                        ),
                        React.createElement(
                            'p',
                            { className: 'stat-name' },
                            'Expected Return'
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-xs-6' },
                    React.createElement(
                        'div',
                        { className: 'stat-item' },
                        React.createElement(
                            'p',
                            { className: 'stat-val' },
                            this.state.tickerData.Volume
                        ),
                        React.createElement(
                            'p',
                            { className: 'stat-name' },
                            'Volume'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'stat-item' },
                        React.createElement(
                            'p',
                            { className: 'stat-val' },
                            this.state.tickerData.AverageDailyVolume
                        ),
                        React.createElement(
                            'p',
                            { className: 'stat-name' },
                            'Average Volume'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'stat-item' },
                        React.createElement(
                            'p',
                            { className: 'stat-val' },
                            this.state.tickerData.MarketCapitalization
                        ),
                        React.createElement(
                            'p',
                            { className: 'stat-name' },
                            'Market Cap'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'stat-item' },
                        React.createElement(
                            'p',
                            { className: 'stat-val' },
                            this.state.tickerData.PERatio
                        ),
                        React.createElement(
                            'p',
                            { className: 'stat-name' },
                            'P/E Ratio'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'stat-item' },
                        React.createElement(
                            'p',
                            { className: 'stat-val' },
                            this.state.tickerData.DividendYield
                        ),
                        React.createElement(
                            'p',
                            { className: 'stat-name' },
                            'Div/Yield'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'stat-item' },
                        React.createElement(
                            'p',
                            { className: 'stat-val', id: "variance-" + this.state.tickerData.symbol },
                            this.state.tickerData.YearLow
                        ),
                        React.createElement(
                            'p',
                            { className: 'stat-name' },
                            'Variance'
                        )
                    )
                )
            )
        );
    }
});
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
            mainComponent = React.createElement(LoginForm, { loginFunc: this.onLogin.bind(this) });
        }

        return React.createElement(
            'div',
            null,
            React.createElement(Nav, { loggedIn: this.state.loggedIn }),
            React.createElement(
                'div',
                { className: 'container' },
                mainComponent
            )
        );
    }
});

ReactDOM.render(React.createElement(Wrapper, null), document.getElementById('stock-app'));