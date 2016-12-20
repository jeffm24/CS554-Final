const httpRequest = require('request');
const fs = require('fs');
var cache = require('express-redis-cache')();

const data = require('../data');
const userData = data.userData;
const tickerData = data.tickerData;
const historicalData = data.historicalData;

const constructorMethod = (app) => {
    // Middleware for checking if the user is logged in
    app.use(function(request, response, next) {
        userData.getUserBySessionID(request.cookies.sessionID).then(function(user) {
            // If the user is logged in, set response.locals.user to the user
            if (user) {
                response.locals.user = user;
            } else {
                response.locals.user = undefined;
            }

            next();
        });
    });

    //log info to console
    /*
    let incoming = true;
    app.use((req, res, next) => {
        let info = {};
        info.req = {};
        info.req.body = req.body;
        info.req.cookies = req.cookies;
        info.req.files = req.files;
        info.req.headers = req.headers;
        info.req.params = req.params;
        info.req.query = req.query;
        info.req.route = req.route;
        info.req.method = req.method;
        info.req.url = req.url;
        info.res = {};
        info.res.locals = res.locals;
        console.log("---");
        console.log(info);
        next();
    });
    */

    app.get('/', function(request, response) {
        response.render('home', {});
    });

    app.get('/checkLoginStatus', (req, res) => {
        userData.getUserBySessionID(req.cookies.sessionID).then(function(user) {
            // If the user is logged in, set response.locals.user to the user
            if (user) {
                res.status(200).json({loggedIn:true});
            } else {
                res.status(200).json({loggedIn:false});
            }
        });
    })

    // Display the user profile if they are logged in, otherwise redirect to "/"
    app.get("/profileTickers", function(request, response) {

        // If the user is logged in, render the profile page, otherwise redirect to '/'
        if (response.locals.user) {
            var user = response.locals.user;

            tickerData.getMultTickerInfo(user.savedTickers).then(function(tickers) {
                response.json({
                    username: user.username,
                    tickers: tickers
                });
            }, function(errorMessage) {
                response.status(500).json({error: errorMessage});
            });

        } else {
            response.status(403).json({error: 'Please log in.'});
        }

    });

    // Route for getting ticker suggestions based on a given search
    app.get("/getTickerSearchSuggestions", function(request, response) {

        var ticker = request.query.ticker;
        tickerData.getTickerSearchSuggestions(ticker).then(function(result) {
            response.json({suggestions: result});
        }, function(errorMessage) {
            response.status(500).json({error: errorMessage});
        });

    });

    // Route to log the user in
    app.post("/signin", function(request, response) {

        // Only run logIn function if the user is not currently logged in
        if (!response.locals.user) {

            // Log the user in and then set the session cookie
            userData.logIn(request.body.username, request.body.password).then(function(sessionID) {
                if (sessionID) {
                    // If the user was successfully signed in, create a new cookie with the generated sessionID
                    var expiresAt = new Date();
                    expiresAt.setHours(expiresAt.getHours() + 5);

                    response.cookie("sessionID", sessionID, { expires: expiresAt });

                    response.json({status: "success"});
                }
            }, function(errorMessage) {
                response.status(500).json({ error: errorMessage });
            });

        } else {
            response.status(500).json({error: "User already signed in."});
        }

    });

    // Route to sign the user out
    app.post("/signout", function(request, response) {

        // Only run logOut function if the user is currently logged in
        if (response.locals.user) {

            // Log the user out and then remove the session cookie
            userData.logOut(response.locals.user._id).then(function(res) {
                if (res) {
                    var anHourAgo = new Date();
                    anHourAgo.setHours(anHourAgo.getHours() -1);

                    // invalidate, then clear so that lastAccessed no longer shows up on the cookie object
                    response.cookie("sessionID", "", { expires: anHourAgo });
                    response.clearCookie("sessionID");

                    response.json({status: "success"});
                }
            }, function(errorMessage) {
                response.status(500).json({ error: errorMessage });
            });

        } else {
            response.status(500).json({error: "User not signed in."});
        }

    });

    // Route for signing a user up
    app.post("/register", function(request, response) {

        // Only run addUser function if the user is not currently logged in
        if (!response.locals.user) {

            userData.addUser(request.body.username, request.body.password, request.body.confirm).then(function(val) {
                response.json({status: request.body.username + " successfully added. Please try logging in."});
            }, function(errorMessage) {
                response.status(500).json({ error: errorMessage });
            });

        } else {
            response.status(500).json({error: "User already signed in."});
        }

    });

    // Route for saving a ticker
    app.post("/saveTicker", function(request, response) {

        if (response.locals.user) {
            userData.saveTicker(response.locals.user._id, request.body.symbol).then(function(newSavedTickers) {
                response.json({result: newSavedTickers});
            }, function(errorMessage) {
                response.status(500).json({error: errorMessage});
            });
        } else {
            response.status(500).json({error: "User not signed in."});
        }

    });

    // Updates user info using the given request body
    app.put("/profile/editUserInfo", function(request, response) {

        // Only run editUserInfo function if the user is currently logged in
        if (response.locals.user) {

            userData.editUserInfo(response.locals.user._id, request.body).then(function(newProfile) {
                response.json({result: "Your account info has been successfully updated."});
            }, function(errorMessage) {
                response.status(500).json({ error: errorMessage });
            });
        } else {
            response.status(500).json({error: "User not signed in."});
        }

    });

    // search route
    app.put("/search", 
        function (request, response, next) {
            response.express_redis_cache_name = 'search-' + request.body.search;
            next();
        },
        cache.route({ expire: 60000 }),
        function(request, response) {

            // Check if the ticker is up to date in the database before querying yahoo finance
            tickerData.isTickerUpToDate(request.body.search).then(function(upToDate) {

                if (upToDate) {
                    // If the ticker is up to date, then just get the ticker info from the database and respond with it
                    tickerData.getTickerInfo(request.body.search).then(function(tickerInfo) {

                        tickerInfo.userSavedTickers = response.locals.user.savedTickers;

                        if (tickerInfo.ChangeinPercent.charAt(0) === '+') {
                            tickerInfo.change = "positive";
                        } else {
                            tickerInfo.change = "negative";
                        }

                        // Success respond with the ticker info
                        response.json({result: tickerInfo, upToDate: true});
                    });
                } else {
                    //response.redirect('/updateTicker');
                    // If the ticker is not up to date, then query yahoo finance and update it before responding
                    httpRequest('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22' + request.body.search + '%22)%0A%09%09&format=json&env=http%3A%2F%2Fdatatables.org%2Falltables.env&callback=', function (error, data, body) {
                        if (!error && data.statusCode == 200) {

                            var query = JSON.parse(body).query;
                            var lastQueried = new Date(query.created);
                            var info = query.results.quote;

                            // Check to see if actual data was recieved
                            if (info.Open) {

                                // Update the ticker in the database with the results from the Yahoo query
                                tickerData.refreshTicker(request.body.search, lastQueried, info).then(function(tickerInfo) {

                                    tickerInfo.userSavedTickers = response.locals.user.savedTickers;

                                    if (info.ChangeinPercent.charAt(0) === '+') {
                                        tickerInfo.change = "positive";
                                    } else {
                                        tickerInfo.change = "negative";
                                    }

                                    // Success respond the ticker info
                                    response.json({result: tickerInfo});
                                });
                            } else {
                                response.json({result: "Query returned no results.", notFound: true});
                            }
                        } else {
                            response.status(500).json({error: error});
                        }
                    });
                }

            }, function(errorMessage) {
                response.json({result: errorMessage, notFound: true});
            });

        });

    // search history
    app.put("/searchHistory", 
        function (request, response, next) {
            response.express_redis_cache_name = `history-${request.body.ticker}-${request.body.period}`;
            next();
        },
        cache.route({ expire: 60000 }),
        function(request, response) {

            historicalData.checkDates(request.body.ticker,request.body.start,request.body.end).then(function(result) {

                if(result === null){
                    //console.log("TICKER NOT FOUND");
                    var end = new Date();
                    var start = new Date();
                    start.setFullYear(end.getFullYear()-1);
                    start = start.toISOString().split('T')[0];
                    end = end.toISOString().split('T')[0];

                    var inputURL = "http://query.yahooapis.com/v1/public/yql"+
                                "?q=select%20*%20from%20yahoo.finance.historicaldata%20"+
                                "where%20symbol%20%3D%20%22"
                                +request.body.ticker+"%22%20and%20startDate%20%3D%20%22"
                                +start+"%22%20and%20endDate%20%3D%20%22"
                                +end+"%22&format=json&env=store%3A%2F%2F"
                                +"datatables.org%2Falltableswithkeys";

                    httpRequest(inputURL, function (error, data, body) {

                        if (!error && data.statusCode == 200) {

                            var query = JSON.parse(body).query;
                            var info = query.results.quote;
                            // Check to see if actual data was recieved
                            if (info) {
                            // Update the ticker in the database with the results from the Yahoo query
                                historicalData.addTicker(request.body.ticker,info).then(function() {
                                return  historicalData.getData(request.body.ticker,request.body.start,request.body.end)
                                }).then(function(data) {
                                    //console.log(data);
                                    response.json({result: data});
                                    });
                            } else {
                                response.json({result: "Query returned no results.", notFound: true});
                            }
                            } else {
                                response.status(500).json({error: error});
                            }
                    });
            }

            else if(result == request.body.end){
                //console.log("TICKER UP TO DATE");
                historicalData.getData(request.body.ticker,request.body.start,request.body.end).then(function(data) {
                    response.json({result: data});
                    });
            }
            else {
                var end = new Date();
                var start = new Date(result);
                start.setDate(start.getDate() + 1);
                start = start.toISOString().split('T')[0];
                end = end.toISOString().split('T')[0];
                //console.log("TICKER NEEDS UPDATING FROM " + start + " to " + request.body.end);
                var inputURL = "http://query.yahooapis.com/v1/public/yql"+
                                "?q=select%20*%20from%20yahoo.finance.historicaldata%20"+
                                "where%20symbol%20%3D%20%22"
                                +request.body.ticker+"%22%20and%20startDate%20%3D%20%22"
                                +start+"%22%20and%20endDate%20%3D%20%22"
                                +end+"%22&format=json&env=store%3A%2F%2F"
                                +"datatables.org%2Falltableswithkeys";

                httpRequest(inputURL, function (error, data, body) {

                    if (!error && data.statusCode == 200) {

                        var query = JSON.parse(body).query;

                        //console.log(info);
                        // Update the ticker in the database with the results from the Yahoo query
                        if(query.results){
                            var info = query.results.quote;
                            historicalData.addTicker(request.body.ticker,info).then(function() {
                            return  historicalData.getData(request.body.ticker,request.body.start,request.body.end)
                            }).then(function(data) {
                                //console.log(data);
                                response.json({result: data});
                                });
                        } else {
                            historicalData.getData(request.body.ticker,request.body.start,request.body.end).then(function(data) {
                                //console.log(data);
                                response.json({result: data});
                            });
                        }

                    } else {
                            response.status(500).json({error: error});
                        }
                });
            }

            }, function(errorMessage) {
                response.json({result: errorMessage, notFound: true});
            });
        });

    // update ticker route (for forced update with database check)
    app.put("/updateTicker", 
        function (request, response, next) {
            response.express_redis_cache_name = request.body.symbol;
            next();
        },
        cache.route({ expire: 60000 }),
        function(request, response) {
            httpRequest('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22' + request.body.symbol + '%22)%0A%09%09&format=json&env=http%3A%2F%2Fdatatables.org%2Falltables.env&callback=', function (error, data, body) {
                if (!error && data.statusCode == 200) {

                    var query = JSON.parse(body).query;
                    var lastQueried = new Date(query.created);
                    var info = query.results.quote;

                    // Update the ticker in the database with the results from the Yahoo query
                    tickerData.refreshTicker(request.body.symbol, lastQueried, info).then(function(tickerInfo) {

                        tickerInfo.userSavedTickers = response.locals.user.savedTickers;

                        if (info.ChangeinPercent.charAt(0) === '+') {
                            tickerInfo.change = "positive";
                        } else {
                            tickerInfo.change = "negative";
                        }

                        // Success respond the ticker info
                        response.json({result: tickerInfo});
                    });
                } else {
                    response.status(500).json({error: error});
                }
            });

        });

    // Route for removing a ticker
    app.delete("/removeTicker", function(request, response) {

        if (response.locals.user) {
            userData.deleteTicker(response.locals.user._id, request.body.symbol).then(function(newSavedTickers) {
                response.json({result: newSavedTickers});
            }, function(errorMessage) {
                response.status(500).json({error: errorMessage});
            });
        } else {
            response.status(500).json({error: "User not signed in."});
        }

    });

    app.use("*", function(request, response) {
        response.render('home', {});
    });
};

module.exports = constructorMethod;