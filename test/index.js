import * as requester from '../js/requester.js';
import * as data from './data.js';
import * as sinon from "../node_modules/sinon/pkg/sinon.js";
import * as util from './sethAuth';
// import '../node_modules/sinon-chai/lib/sinon-chai';
const chai = require('chai');
var sinonChai = require("sinon-chai");
chai.use(sinonChai);
const expect = chai.expect;

const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username';
const LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';

describe('Data layer tests', () => {
    describe('User tests', () => {
        describe('Register tests', () => {
            var jsonRequesterPostStub;
            const user = {
                username: 'vasil',
                password: '123456',
                email: "vasil@abv.bg"
            };

            const calledWith = {
                username: 'vasil',
                password: '123456',
                confirmpassword: '123456',
                email: "vasil@abv.bg"
            };

            const transfered = "username=vasil&password=123456&confirmpassword=123456&email=vasil%40abv.bg";

            beforeEach(() => {
                jsonRequesterPostStub = sinon.stub(requester, 'postSql');

            });
            afterEach(() => {
                jsonRequesterPostStub.restore();
            });

            it('expect register to make a POST SQL request', (done) => {

                jsonRequesterPostStub.returns(Promise.resolve());

                data.register(user)
                    .then(() => {
                        expect(jsonRequesterPostStub).to.have.been.calledOnce;
                    })
                    .then(done, done);
            });

            it('expect register to make a POST SQL request to api/account/register', (done) => {

                jsonRequesterPostStub.returns(Promise.resolve());

                data.register(user)
                    .then(() => {
                        expect(jsonRequesterPostStub).to.have.been.calledWith('api/account/register');
                    })
                    .then(done, done);
            });


            it('expect register to call requester with transfered as body', (done) => {

                jsonRequesterPostStub.returns(Promise.resolve());

                data.register(user)
                    .then(() => {
                        var actual = jsonRequesterPostStub.args[0][2];
                        expect(actual).to.equal(transfered);
                    })
                    .then(done, done);
            });

            it('expect register to call requester with right contenttype', (done) => {

                var expected = 'application/x-www-form-urlencoded';
                jsonRequesterPostStub.returns(Promise.resolve());

                data.register(user)
                    .then(() => {
                        var actual = jsonRequesterPostStub.args[0][3];
                        expect(actual).to.have.string(expected);
                    })
                    .then(done, done);
            });

            it('expect register function to return a Promise', () => {

                jsonRequesterPostStub.returns(Promise.resolve());

                const promise = data.register(user);
                expect(promise).to.be.an.instanceof(Promise);
            });
        });

        describe('Transform tests', () => {
            it('expect transform to return right value', () => {
                const calledWith = {
                    username: 'vasil',
                    password: '123456',
                    confirmpassword: '123456',
                    email: "vasil@abv.bg"
                };

                const expected = "username=vasil&password=123456&confirmpassword=123456&email=vasil%40abv.bg";

                var actual = data.transform(calledWith);

                expect(actual).to.equal.expected;

            });

        });

        describe('Add Movie User tests', () => {
            var RequesterPostStrinbgStub;
            let user = {
                username: 'vasil',
                email: 'v123',
                firstname: 'vasil',
                lastname: 'kamburov',
                city: 'Burgas',
                ismale: true
            };

            beforeEach(() => {
                RequesterPostStrinbgStub = sinon.stub(requester, 'postSqlStringify');
            });
            afterEach(() => {
                RequesterPostStrinbgStub.restore();
            });

            it('expect addMovieUser to make a postSqlStringify request', (done) => {

                RequesterPostStrinbgStub.returns(Promise.resolve());

                data.addMoviesUser(user)
                    .then(() => {
                        expect(RequesterPostStrinbgStub).to.have.been.calledOnce;
                    })
                    .then(done, done);
            });

            it('expect addMovieUser to make a postSqlStringifyL request to api/users/Register', (done) => {

                RequesterPostStrinbgStub.returns(Promise.resolve());

                data.addMoviesUser(user)
                    .then(() => {
                        expect(RequesterPostStrinbgStub).to.have.been.calledWith('api/users/Register');
                    })
                    .then(done, done);
            });


            it('expect addMovieUser to call requester with right body', (done) => {

                RequesterPostStrinbgStub.returns(Promise.resolve());

                data.addMoviesUser(user)
                    .then(() => {
                        var actual = RequesterPostStrinbgStub.args[0][2];
                        expect(actual).to.deep.equal(user);
                    })
                    .then(done, done);
            });

            it('expect addMovieUser to call requester with right contenttype', (done) => {

                var expected = 'application/json';
                RequesterPostStrinbgStub.returns(Promise.resolve());

                data.addMoviesUser(user)
                    .then(() => {
                        var actual = RequesterPostStrinbgStub.args[0][3];
                        expect(actual).to.have.string(expected);
                    })
                    .then(done, done);
            });

            it('expect addMovieUser function to return a Promise', () => {

                RequesterPostStrinbgStub.returns(Promise.resolve());

                const promise = data.addMoviesUser(user);
                expect(promise).to.be.an.instanceof(Promise);
            });

        });

        describe('getUserIdByEmail tests', () => {
            var postSqlStub,
                setAuthStub;

            var email = "test@abv.bg";

            beforeEach(() => {
                postSqlStub = sinon.stub(requester, 'postSql');
                setAuthStub = sinon.stub(util, "setAuthHeader")

            });
            afterEach(() => {
                postSqlStub.restore();
                setAuthStub.restore();
            });

            it('expect addMovieUser to make a postSql request', (done) => {

                setAuthStub.returns({});
                postSqlStub.returns(Promise.resolve());

                data.getUserIdByEmail(email)
                    .then(() => {
                        expect(postSqlStub).to.have.been.calledOnce;
                    })
                    .then(done, done);
            });

            it('expect addMovieUser to make a postSql request to api/users/GetUserIdByName', (done) => {

                setAuthStub.returns({});
                postSqlStub.returns(Promise.resolve());

                data.getUserIdByEmail(email)
                    .then(() => {
                        expect(postSqlStub).to.have.been.calledWith('api/users/GetUserIdByName');
                    })
                    .then(done, done);
            });


            it('expect addMovieUser to call requester with right body', (done) => {

                postSqlStub.returns(Promise.resolve());
                setAuthStub.returns({});

                data.getUserIdByEmail(email)
                    .then(() => {
                        var actual = postSqlStub.args[0][2];
                        expect(actual).to.have.string(email);
                    })
                    .then(done, done);
            });

            it('expect addMovieUser to call requester with right contenttype', (done) => {

                setAuthStub.returns({});
                var expected = 'application/json';
                postSqlStub.returns(Promise.resolve());

                data.getUserIdByEmail(email)
                    .then(() => {
                        var actual = postSqlStub.args[0][3];
                        expect(actual).to.have.string(expected);
                    })
                    .then(done, done);
            });

            it('expect addMovieUser to call requester with right header', (done) => {

                setAuthStub.returns({});
                var expected = 'application/json';
                postSqlStub.returns(Promise.resolve());

                data.getUserIdByEmail(email)
                    .then(() => {
                        var actual = postSqlStub.args[0][1];
                        expect(actual.contentType).to.have.string(expected);
                    })
                    .then(done, done);
            });

            it('expect addMovieUser function to return a Promise', () => {

                postSqlStub.returns(Promise.resolve());
                setAuthStub.returns({});

                const promise = data.getUserIdByEmail(email);
                expect(promise).to.be.an.instanceof(Promise);
            });

        });

    });
});