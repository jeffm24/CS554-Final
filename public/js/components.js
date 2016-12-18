'use strict';

var LoginForm = React.createClass({
    displayName: 'LoginForm',
    getInitialState: function getInitialState() {
        return { activeView: 'login' };
    },
    resetState: function resetState() {
        this.setState({ activeView: 'login' });
    },
    submitRegisterForm: function submitRegisterForm(e) {
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
        e.preventDefault();

        var self = this;

        $.ajax({
            url: '/signin',
            type: 'POST',
            data: {
                username: $('#login-username').val(),
                password: $('#login-password').val()
            }
        }).done(function (data) {

            self.props.dispatch({ type: 'SET_LOGIN', loginState: true });
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
        var _this = this;

        return React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
                'div',
                { className: 'col-md-6 col-md-offset-3' },
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
                                            _this.setActiveView('login');
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
                                            { className: 'hidden', htmlFor: 'login-username' },
                                            'Username'
                                        ),
                                        React.createElement('input', {
                                            type: 'text',
                                            name: 'login-username',
                                            id: 'login-username',
                                            tabIndex: '1',
                                            className: 'form-control',
                                            placeholder: 'Username' })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        React.createElement(
                                            'label',
                                            { className: 'hidden', htmlFor: 'login-password' },
                                            'Password'
                                        ),
                                        React.createElement('input', {
                                            type: 'password',
                                            name: 'login-password',
                                            id: 'login-password',
                                            tabIndex: '2',
                                            className: 'form-control',
                                            placeholder: 'Password' })
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
                                                React.createElement('input', { type: 'submit', name: 'login-submit', id: 'login-submit', tabIndex: '4', className: 'form-control btn btn-primary', value: 'Log In' })
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
                                            { className: 'hidden', htmlFor: 'register-username' },
                                            'Username'
                                        ),
                                        React.createElement('input', {
                                            type: 'text',
                                            name: 'register-username',
                                            id: 'register-username',
                                            tabIndex: '1',
                                            className: 'form-control',
                                            placeholder: 'Username' })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        React.createElement(
                                            'label',
                                            { className: 'hidden', htmlFor: 'register-password' },
                                            'Password'
                                        ),
                                        React.createElement('input', {
                                            type: 'password',
                                            name: 'register-password',
                                            id: 'register-password',
                                            tabIndex: '2',
                                            className: 'form-control',
                                            placeholder: 'Password' })
                                    ),
                                    React.createElement(
                                        'div',
                                        { className: 'form-group' },
                                        React.createElement(
                                            'label',
                                            { className: 'hidden', htmlFor: 'register-confirm-password' },
                                            'Confirm Password'
                                        ),
                                        React.createElement('input', {
                                            type: 'password',
                                            name: 'register-confirm-password',
                                            id: 'register-confirm-password',
                                            tabIndex: '2',
                                            className: 'form-control',
                                            placeholder: 'Confirm Password' })
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
                                                React.createElement('input', { type: 'submit', name: 'register-submit', id: 'register-submit', tabIndex: '4', className: 'form-control btn btn-primary', value: 'Register' })
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

var CLoginForm = connect(function (state) {
    return state;
})(LoginForm);
'use strict';

var Nav = React.createClass({
    displayName: 'Nav',
    getInitialState: function getInitialState() {
        return {};
    },
    signOut: function signOut() {
        var self = this;

        $.ajax({
            url: '/signout',
            type: 'POST',
            success: function success(data) {
                self.props.dispatch({ type: 'SET_LOGIN', loginState: false });
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

var CNav = connect(function (state) {
    return state;
})(Nav);
'use strict';

var Profile = React.createClass({
    displayName: 'Profile',
    getInitialState: function getInitialState() {
        return {};
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        $.ajax({
            url: '/profileTickers',
            dataType: 'json',
            cache: false,
            success: function success(tickerList) {
                _this.props.dispatch({ type: 'SET_TICKERS', userTickers: tickerList.tickers });
            },
            error: function error(xhr, status, err) {
                console.error('/tickerList', status, err.toString());
            }
        });
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(Search, null),
            React.createElement(CTickerList, null)
        );
    }
});

var CProfile = connect(function (state) {
    return state;
})(Profile);
'use strict';

var Search = React.createClass({
    displayName: 'Search',
    getInitialState: function getInitialState() {
        return { searchTicker: null };
    },
    resetState: function resetState() {
        this.setState({ searchTicker: null });
    },
    dynamicSearchSuggest: function dynamicSearchSuggest(e) {
        if (e.target.value) {

            $.ajax({
                url: '/getTickerSearchSuggestions?ticker=' + e.target.value,
                type: 'GET',
                success: function success(data) {
                    if (data) {
                        var listOfSymbols = [];

                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = data.suggestions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var ticker = _step.value;

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
        e.preventDefault();

        var self = this;

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

                    self.setState({ searchTicker: data.result });
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
    },
    componentDidMount: function componentDidMount() {
        this.setState({ scrollTop: $('#searchBar').offset().top });
    },
    render: function render() {
        var searchTicker = null;

        if (this.state.searchTicker) {
            searchTicker = React.createElement(CTicker, { tickerData: this.state.searchTicker });
        }

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
                { id: 'searchForm', onSubmit: this.submitSearchForm },
                React.createElement(
                    'div',
                    { id: 'searchBar', className: 'input-group', 'data-spy': 'affix', 'data-offset-top': this.state.scrollTop },
                    React.createElement(
                        'label',
                        { className: 'hidden', htmlFor: 'searchBarInput' },
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
            React.createElement(
                'div',
                { id: 'searchResult' },
                searchTicker
            )
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

        var self = this;

        $.ajax({
            url: '/saveTicker',
            type: 'POST',
            data: {
                symbol: this.props.tickerData.symbol
            },
            success: function success(data) {
                self.props.dispatch({ type: 'ADD_TICKER', newTicker: self.props.tickerData });
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

        var self = this;

        $.ajax({
            url: '/removeTicker',
            type: 'DELETE',
            data: {
                symbol: this.props.tickerData.symbol
            },
            success: function success(data) {
                self.props.dispatch({ type: 'REMOVE_TICKER', symbol: self.props.tickerData.symbol });
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
                                this.props.tickerData.ChangeinPercent,
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
                                React.createElement(CTickerGraph, {
                                    saved: 'true',
                                    tickerData: this.props.tickerData })
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-xs-12 col-sm-6' },
                                React.createElement(CTickerStats, {
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

            var self = this;

            var addTickerBtn = null;

            var tickerExists = this.props.userTickers.filter(function (ticker) {
                return ticker.symbol === self.props.tickerData.symbol;
            }).length;

            if (!tickerExists) {
                addTickerBtn = React.createElement(
                    'span',
                    null,
                    React.createElement(
                        'label',
                        { className: 'hidden', htmlFor: 'saveTickerBtn' },
                        ' Add ',
                        this.props.tickerData.symbol,
                        ' to Portfolio  '
                    ),
                    React.createElement(
                        'button',
                        { type: 'button', id: 'saveTickerBtn', className: 'btn btn-primary pull-right', onClick: this.saveTicker },
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
                            this.props.tickerData.ChangeinPercent,
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
                            React.createElement(CTickerGraph, {
                                tickerData: this.props.tickerData })
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-xs-12 col-sm-6' },
                            React.createElement(CTickerStats, {
                                tickerData: this.props.tickerData })
                        )
                    )
                )
            );
        }

        return tickerContent;
    }
});

var CTicker = connect(function (state) {
    return state;
})(Ticker);
'use strict';

// Resize graphs on window resize
$(window).resize(function () {
    if ($('.searchButtons')) $('.searchButtons' + ' .active').click();

    $(".d3-wrapper").each(function () {
        var s = $(this).data("symbol");
        $('#buttons' + "" + '-' + s + ' .active').click();
    });
});

// Clicks the last active button on expand of each panel (to redraw the graph)
$(document).on('shown.bs.collapse', '.panel', function (e) {
    $('#' + e.target.id + ' .active').click();
});

var TickerGraph = React.createClass({
    displayName: 'TickerGraph',
    getInitialState: function getInitialState() {
        return { tickerData: this.props.tickerData, activePeriod: '1W' };
    },
    makeGraph: function makeGraph() {
        var symbol = this.state.tickerData.symbol;
        var searchTag = '';

        if (!this.props.saved) {
            searchTag = 'Search';
        }

        var margin = { top: 0, right: 0, bottom: 0, left: 0 },
            width = $("#d3" + searchTag + "-" + symbol).outerWidth() - margin.left - margin.right,
            height = $("#d3" + searchTag + "-" + symbol).outerHeight() - margin.top - margin.bottom;

        var svg = d3.select("#d3" + searchTag + "-" + symbol).append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("path") // Add the valueline path.
        .attr("class", "line");

        this.setDataPeriod('1W');
    },
    updateGraph: function updateGraph(start, end) {
        var self = this;

        $.ajax({
            method: "PUT",
            url: "/searchHistory",
            contentType: 'application/json',
            data: JSON.stringify({
                ticker: this.state.tickerData.symbol,
                start: start,
                end: end
            })
        }).then(function (data) {
            self.drawGraph(data.result);
        });
    },
    drawGraph: function drawGraph(data) {
        var symbol = this.state.tickerData.symbol;
        var searchTag = '';

        if (!this.props.saved) {
            searchTag = 'Search';
        }

        var values = [];
        var margin = { top: 0, right: 0, bottom: 0, left: 0 },
            width = $("#d3" + searchTag + "-" + symbol).outerWidth() - margin.left - margin.right,
            height = $("#d3" + searchTag + "-" + symbol).outerHeight() - margin.top - margin.bottom;

        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);

        var parseDate = d3.timeParse("%Y-%m-%d");
        var valueline = d3.line().x(function (d) {
            return x(d.date);
        }).y(function (d) {
            return y(d.high);
        });

        data.forEach(function (d) {
            d.date = parseDate(d.Date);
            d.high = +d.High;
            d.low = +d.Low;
            values.push(d.Open);
        });

        data.sort(function (a, b) {
            return b.date - a.date;
        });

        x.domain(d3.extent(data, function (d) {
            return d.date;
        }));
        y.domain([d3.min(data, function (d) {
            return d.low;
        }), d3.max(data, function (d) {
            return d.high;
        })]);

        var svg = d3.select("#d3" + searchTag + "-" + symbol).transition();

        // Make the changes
        svg.select(".line") // change the line
        .transition().duration(500).attr("d", valueline(data));

        var ret = (ubique.mean(ubique.tick2ret(values.reverse())) * 100).toFixed(4);
        var varc = (ubique.varc(ubique.tick2ret(values.reverse())) * 100).toFixed(4);

        this.setState({ currentPrice: parseFloat(data[0].Open).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) });

        $('#return' + searchTag + '-' + symbol).text(ret + "%");
        $('#variance' + searchTag + '-' + symbol).text(varc + "%");
    },
    setDataPeriod: function setDataPeriod(newPeriod) {
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

        this.updateGraph(start, end);
    },
    isActivePeriod: function isActivePeriod(period) {
        return this.state.activePeriod === period ? 'active' : '';
    },
    componentDidMount: function componentDidMount() {
        this.makeGraph();
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
            React.createElement(
                'div',
                { className: 'text-center price' },
                this.state.currentPrice
            ),
            React.createElement('div', { className: 'd3-wrapper', id: "d3" + searchIdLong + "-" + this.state.tickerData.symbol, 'data-symbol': this.state.tickerData.symbol }),
            React.createElement(
                'div',
                { className: "buttons btn-group " + searchBtnsClass, id: "buttons-" + this.state.tickerData.symbol },
                React.createElement(
                    'label',
                    { className: 'hidden', htmlFor: "1W-" + this.state.tickerData.symbol },
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
                            _this.setDataPeriod('1W');
                        } },
                    '1W'
                ),
                React.createElement(
                    'label',
                    { className: 'hidden', htmlFor: "1M-" + this.state.tickerData.symbol },
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
                            _this.setDataPeriod('1M');
                        } },
                    '1M'
                ),
                React.createElement(
                    'label',
                    { className: 'hidden', htmlFor: "1M-" + this.state.tickerData.symbol },
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
                            _this.setDataPeriod('3M');
                        } },
                    '3M'
                ),
                React.createElement(
                    'label',
                    { className: 'hidden', htmlFor: "1Y-" + this.state.tickerData.symbol },
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
                            _this.setDataPeriod('1Y');
                        } },
                    '1Y'
                )
            )
        );
    }
});

var CTickerGraph = connect(function (state) {
    return state;
})(TickerGraph);
"use strict";

var TickerList = React.createClass({
    displayName: "TickerList",

    getInitialState: function getInitialState() {
        return {};
    },
    render: function render() {

        var tickerList = this.props.userTickers;
        var tickers = tickerList.map(function (ticker) {
            return React.createElement(CTicker, {
                tickerData: ticker,
                key: ticker.symbol,
                saved: "true" });
        });

        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { className: "page-header" },
                React.createElement(
                    "h2",
                    null,
                    "My Tickers: "
                )
            ),
            React.createElement(
                "div",
                { className: "panel-group", id: "accordion" },
                tickers
            )
        );
    }
});

var CTickerList = connect(function (state) {
    return state;
})(TickerList);
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
    updateTicker: function updateTicker() {
        var self = this;

        $.ajax({
            url: '/updateTicker',
            type: 'PUT',
            data: {
                symbol: this.state.tickerData.symbol
            },
            success: function success(data) {
                self.props.dispatch({ type: 'UPDATE_TICKER', updateTicker: data.result });
                self.setState({ refreshRunning: false });

                swal({
                    title: "Success!",
                    text: self.state.tickerData.symbol + " is now up to date.",
                    type: "success",
                    confirmButtonText: "OK"
                });
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
    render: function render() {
        var refreshButton = null;

        if (this.props.saved) {
            refreshButton = React.createElement(
                'span',
                { className: 'pull-right' },
                React.createElement(
                    'label',
                    { className: 'hidden', htmlFor: "refresh-" + this.state.tickerData.symbol },
                    ' Refresh ',
                    this.state.tickerData.symbol,
                    ' '
                ),
                React.createElement(
                    'button',
                    {
                        type: 'button',
                        id: "refresh-" + this.state.tickerData.symbol,
                        className: 'btn btn-primary refresh-ticker-btn',
                        disabled: this.state.refreshRunning,
                        onClick: this.updateTicker },
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

var CTickerStats = connect(function (state) {
    return state;
})(TickerStats);
'use strict';

var Wrapper = React.createClass({
    displayName: 'Wrapper',
    getInitialState: function getInitialState() {
        return {};
    },
    componentDidMount: function componentDidMount() {
        var self = this;

        $.ajax({
            url: '/checkLoginStatus',
            type: 'GET'
        }).done(function (data) {
            self.props.dispatch({ type: 'SET_LOGIN', loginState: data.loggedIn });
        });
    },
    render: function render() {
        var mainComponent = null;

        if (this.props.loggedIn) {
            mainComponent = React.createElement(CProfile, null);
        } else {
            mainComponent = React.createElement(CLoginForm, null);
        }

        return React.createElement(
            'div',
            null,
            React.createElement(CNav, null),
            React.createElement(
                'div',
                { className: 'container' },
                mainComponent
            )
        );
    }
});

var CWrapper = connect(function (state) {
    return state;
})(Wrapper);

var store = Redux.createStore(function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? { loggedIn: false, userTickers: [] } : arguments[0];
    var action = arguments[1];

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

            var tickerExists = state.userTickers.filter(function (ticker) {
                return ticker.symbol === action.newTicker.symbol;
            }).length;

            var newState = { loggedIn: state.loggedIn, userTickers: state.userTickers };

            if (!tickerExists) {
                newState.userTickers = state.userTickers.concat([action.newTicker]);
            }

            return newState;

        case 'UPDATE_TICKER':

            var newTickers = state.userTickers.map(function (ticker) {
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

            var newTickers = state.userTickers.filter(function (ticker) {
                return ticker.symbol !== action.symbol;
            });

            return {
                loggedIn: state.loggedIn,
                userTickers: newTickers
            };

        default:
            return state;
    }
});

ReactDOM.render(React.createElement(
    Provider,
    { store: store },
    React.createElement(CWrapper, null)
), document.getElementById('stock-app'));