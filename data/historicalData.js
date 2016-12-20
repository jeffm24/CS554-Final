var MongoClient = require('mongodb').MongoClient,
    settings = require('./config.js');

var fullMongoUrl = settings.mongoConfig.serverUrl + settings.mongoConfig.database;
var exports = module.exports = {};

// Create "tickers" collection if it does not already exist
MongoClient.connect(fullMongoUrl)
    .then(function(db) {
        db.createCollection("historicalData");
    });

// Exported mongo functions
MongoClient.connect(fullMongoUrl)
    .then(function(db) {
        var tickerCollection = db.collection("historicalData");

        exports.latestDate = function(symbol) {
            // Try to find ticker in the database
            return tickerCollection.find({Symbol: symbol}).sort({Date: -1}).limit(1).toArray().then(function(tickerData) {
                
                if (tickerData.length) {
                    return tickerData[0].Date;
                } else {
                    return null;
                }
            });
        };

        exports.addTicker = function(symbol, data) {
            // Map dates so that they are actual date objects
            data.map(function(ticker) {
                ticker.Date = new Date(ticker.Date);
                ticker.Date.setDate(ticker.Date.getDate() + 1);

                return ticker;
            });

            return tickerCollection.insertMany(data).then(function() {
                return tickerCollection.find().toArray();
            });
        };
        
        exports.getData = function(symbol, start, end) {
            return tickerCollection.find({Symbol: symbol, Date: {$gte: start, $lte: end}}).sort({Date: 1}).toArray();
        };

    });
