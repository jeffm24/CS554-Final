const httpRequest = require('request');
const fs = require('fs');

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

    // Middleware to authenticate recaptcha response if one has been set
    app.use(function(request, response, next) {

        if (request.body.recaptchaResponse) {
            httpRequest("https://www.google.com/recaptcha/api/siteverify?secret=" + RECAP_KEY + "&response=" + request.body.recaptchaResponse + "&remoteip=" + request.client.remoteAddress, function(error, data, body) {
                if (error) {
                    response.locals.recaptcha = false;
                } else {
                    response.locals.recaptcha = true;
                }

                next();
            });
        } else {
            next();
        }

    });
