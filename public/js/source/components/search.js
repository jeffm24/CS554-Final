const Search = React.createClass({
    getInitialState() {
        return { searchInfo: ''};
    },
    resetState() {
        this.setState({ searchInfo: ''});
    },
    changeSearchInfo(e) {
        var newSearchInfo = $('#searchBarInput').val();

        this.setState({ searchInfo: newSearchInfo });
    },
    dynamicSearchSuggest(e) {
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
    submitSearchForm(e) {
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
    render() {
        return (
            <div className="search">
                <div className="page-header">
                    <h2>Search: </h2>
                </div>
                <form id="searchForm">
                    <div id="searchBar" className="input-group" data-spy="affix">
                        <label className = "hidden" for="searchBarInput"> Enter Search Here: </label>
                        <input type="text" id="searchBarInput" name="searchBarInput" className="form-control" placeholder="Search Tickers" onChange={this.dynamicSearchSuggest} />
                        <span className="input-group-btn">
                            <button type="submit" className="btn btn-primary" id="searchBtn">Go!</button>
                        </span>
                    </div>
                </form>
                <div id="searchResult"></div>
            </div>
        );
    }
});