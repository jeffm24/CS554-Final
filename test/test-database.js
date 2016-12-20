const data = require('../data');
const userData = data.userData;
const tickerData = data.tickerData;
const historicalData = data.historicalData;

describe('User stories', () => {
    let username = 'test-user-' + (Math.floor(Math.random() * (1000000 - 1) + 1)).toString();
    let password = 'C0mpl4xp4$$w0rd'
    describe('when user does not have an account', () => {
        describe('create new user', () => {
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
            it('should not allow password and password confirmation to not match', (done) => {
                userData.addUser(username+'_2', password, password+'extra').then((val) => {
                    done(new Error('Password and password confirmation not matching should not be allowed'));
                }).catch((err) => {
                    if(err == 'Please make sure your passwords match.'){
                        done();
                    }else{
                        done(new Error(err));
                    }
                });
            });
        });
    });
    describe('user has an account', () => {
        let sessionID = undefined;
        describe('login attempt', () => {
            describe('info is correct for an existing user', () => {
                it('accept and return session ID', (done) => {
                    userData.logIn(username, password).then((sessID) => {
                        sessionID = sessID;
                        done();
                    }).catch((err) => {
                        done(new Error(err));
                    })
                });
            });
            describe('info is incorrect', () => {
                it('reject and return error', (done) => {
                    done();
                })
            })
        });
        describe('user is logged in', () => {
            describe('get user info by session ID', () => {
                it('should return user info for a valid ID', (done) => {
                    userData.getUserBySessionID(sessionID).then((user) => {
                        if(user){
                            done();
                        }else{
                            done(new Error('Bad session ID'));
                        }
                    }).catch((err)=>{
                        done(new Error(err));
                    })
                })
            })
        })
    });
});
