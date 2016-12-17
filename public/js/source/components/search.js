const Search = React.createClass({
    getInitialState() {
        return { searchTicker: null };
    },
    resetState() {
        this.setState({ searchTicker: null });
    },
    dynamicSearchSuggest(e) {
        if (e.target.value) {

            $.ajax({
                url: '/getTickerSearchSuggestions?ticker=' + e.target.value,
                type: 'GET',
                success: function (data) {
                    if (data) {
                        var listOfSymbols = [];

                        for (let ticker of data.suggestions) {
                            listOfSymbols.push(ticker.symbol);
                        }

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
        e.preventDefault();

        var self = this;

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

                    self.setState({searchTicker: data.result});
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
    },
    componentDidMount() {
        this.setState({scrollTop: $('#searchBar').offset().top});
    },
    render() {
        var searchTicker = null;

        if (this.state.searchTicker) {
            searchTicker = (
                <Ticker 
                    tickerData={this.state.searchTicker}
                    userTickers={this.props.userTickers.bind(this)} 
                    addTicker={this.props.addTicker.bind(this)} />
            );
        }

        return (
            <div className="search">
                <div className="page-header">
                    <h2>Search: </h2>
                </div>
                <form id="searchForm" onSubmit={this.submitSearchForm}>
                    <div id="searchBar" className="input-group" data-spy="affix" data-offset-top={this.state.scrollTop}>
                        <label className = "hidden" for="searchBarInput"> Enter Search Here: </label>
                        <input type="text" id="searchBarInput" name="searchBarInput" className="form-control" placeholder="Search Tickers" onChange={this.dynamicSearchSuggest} />
                        <span className="input-group-btn">
                            <button type="submit" className="btn btn-primary" id="searchBtn">Go!</button>
                        </span>
                    </div>
                </form>
                <div id="searchResult">{searchTicker}</div>
            </div>
        );
    }
});