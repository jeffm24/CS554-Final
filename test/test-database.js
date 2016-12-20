const data = require('../data');
const userData = data.userData;
const tickerData = data.tickerData;
const historicalData = data.historicalData;

describe('User tests', () => {
    let username = 'test-user-' + (Math.floor(Math.random() * (1000000 - 1) + 1)).toString();
    let password = 'C0mpl4xp4$$w0rd'
    describe('> when user does not have an account', () => {
        describe('> create new user', () => {
            it('should not allow password and password confirmation to not match', (done) => {
                userData.addUser(username+'_2', password, 'badMatch').then((val) => {
                    done(new Error('Password and password confirmation not matching should not be allowed'));
                }).catch((err) => {
                    if(err == 'Please make sure your passwords match.'){
                        done();
                    }else{
                        done(new Error(err));
                    }
                });
            });
            it('should accept valid credentials', (done) => {
                userData.addUser(username, password, password).then((val) => {
                    done();
                }).catch((err) => {
                    done(new Error(err));
                })
            });
            it('should not accept a username that already exists', (done) => {
                userData.addUser(username, password, password).then((val) => {
                    done(new Error('Creating a new user with a username that already exists should not be allowed'));
                }).catch((err) => {
                    if(err == 'A user with that username already exists.'){
                        done();
                    }else{
                        done(new Error(err));
                    }
                });
            });
        });
    });
    describe('> user has an account', () => {
        let sessionID = undefined;
        describe('> login', () => {
            describe('> info is incorrect for existing user', () => {
                it('reject and return error', (done) => {
                    userData.logIn(username, 'notPassword').then((sessID) => {
                        done(new Error('Bad password should not be accepted'));
                    }).catch((err) => {
                        if(err=='Incorrect password.'){
                            done();
                        }else{
                            done(new Error(err));
                        }
                    })
                })
            })
            describe('> info for non-existing user', () => {
                it('reject and return error', (done) => {
                    userData.logIn('notusername', password).then((sessID) => {
                        done(new Error('Bad username should not be accepted'));
                    }).catch((err) => {
                        if(err=='A user with that username does not exist.'){
                            done();
                        }else{
                            done(new Error(err));
                        }
                    })
                })
            })
            describe('> info is correct for an existing user', () => {
                it('accept and return session ID', (done) => {
                    userData.logIn(username, password).then((sessID) => {
                        if(sessID){
                            sessionID = sessID;
                            done();
                        }else{
                            done(new Error('No session ID returned'));
                        }
                    }).catch((err) => {
                        done(new Error(err));
                    })
                });
            });
        });
        let userInfo = undefined;
        describe('> user is logged in', () => {
            describe('> get user info by session ID', () => {
                it('should not return user info for invalid ID', (done) => {
                    userData.getUserBySessionID('bad-session-id').then((user) => {
                        if(user){
                            done(new Error('INvalid session ID should not return user info'));
                        }else{
                            done();
                        }
                    }).catch((err)=>{
                        done(new Error(err));
                    })
                })
                it('should return user info for a valid ID', (done) => {
                    userData.getUserBySessionID(sessionID).then((user) => {
                        if(user){
                            userInfo = user
                            done();
                        }else{
                            done(new Error('Bad session ID'));
                        }
                    }).catch((err)=>{
                        done(new Error(err));
                    })
                })
            })
            let ticker = 'MMM'
            describe('> save a ticker for the user', () => {
                it('should return the saved tickers for the user, including the new ticker', (done) => {
                    userData.saveTicker(userInfo._id, ticker).then((tickerList) => {
                        if(tickerList.indexOf(ticker) >= 0){
                            done();
                        }else{
                            done(new Error("Ticker list not returned properly"));
                        }
                    }).catch((err) => {
                        done(new Error(err));
                    })
                })
                it('should reject on bad user ID', (done) => {
                    userData.saveTicker('bad-id', ticker).then((tickerList) => {
                        done(new Error('Ticker accepted with bad user ID'));
                    }).catch((err) => {
                        done();
                    })
                })
            })
            describe('> delete a ticker for the user', () => {
                it('should return the saved tickers for the user, without the given ticker', (done) => {
                    userData.deleteTicker(userInfo._id, ticker).then((tickerList) => {
                        if(tickerList.indexOf(ticker) >= 0){
                            done(new Error('Ticker not properly removed'));
                        }else{
                            done();
                        }
                    }).catch((err) => {
                        done(new Error(err));
                    })
                })
                it('should reject on bad user ID', (done) => {
                    userData.deleteTicker('bad-id', ticker).then((tickerList) => {
                        done(new Error('Ticker removed for bad user ID'));
                    }).catch((err) => {
                        done();
                    })
                })
            })
            describe('> log out', () => {
                it('should return true for valid login user ID', (done) => {
                    userData.logOut(null).then((resp) => {
                        if(resp){
                            done(new Error('Log out returned true for bad ID'));
                        }else{
                            done();
                        }
                    }).catch((err) => {
                        if(err == 'Invalid argument(s).'){
                            done();
                        }else{
                            done(new Error(err));
                        }
                    })
                })
                it('should return true for valid login user ID', (done) => {
                    userData.logOut(userInfo._id).then((resp) => {
                        if(resp==true){
                            done();
                        }else{
                            done(new Error('Bad return value'))
                        }
                    }).catch((err) => {
                        done(new Error(err));
                    })
                })
            })
        })
    });
});
