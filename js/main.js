/*jshint esversion: 6 */
import { MyRouter } from 'router';
import * as userControler from 'userControler';
import { openNearestCinema } from 'watchControler';
import * as mController from 'movieControler';
import { checkIfThereIsLogedInUser } from 'authenticator';
// import * as homeController from 'homeController';
// import * as myCookieController from 'myCookieController';
// import * as userController from 'userController';

// istances
let router = new MyRouter();
// let controller = new MainController(data);


router.on('register', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: true, callback: userControler.register, params }); })
    .on('watch', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: false, callback: openNearestCinema, params }); })
    .on('users', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: false, callback: userControler.getAll, params }); })
    .on('movies', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: false, callback: mController.showNewestMovies, params }); })
    .on('login', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: true, callback: userControler.login, params }); })
    .on('logout', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: false, callback: userControler.logout, params }); })
    .on('movie/:moviedata', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: false, callback: mController.seeMovie, params }); })
    .on('movies/upcoming', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: false, callback: mController.getUpcomingMovies, params }); })
    .on('movies/actor', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: false, callback: mController.getByActor, params }); })
    .on('movies/genre', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: false, callback: mController.getByGenre, params }); });

$(window).on('load', () => router.navigate());
$(window).on('hashchange', () => router.navigate());