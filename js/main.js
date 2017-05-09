/*jshint esversion: 6 */
import { MyRouter } from 'router';
import * as userControler from 'userControler';
import { openNearestCinema } from 'watchControler';
import * as mController from 'movieControler';
import { checkIfThereIsLogedInUser } from 'authenticator';
import * as homeControler from 'homeControler';

let router = new MyRouter();


router
    .on('register', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: true, callback: userControler.register, params }); })
    .on('watch', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: false, callback: openNearestCinema, params }); })
    .on('movies', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: false, callback: mController.showNewestMovies, params }); })
    .on('login', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: true, callback: userControler.login, params }); })
    .on('logout', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: false, callback: userControler.logout, params }); })
    .on('movie/:moviedata', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: false, callback: mController.seeMovie, params }); })
    .on('movies/upcoming', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: false, callback: mController.getUpcomingMovies, params }); })
    .on('movies/actor', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: false, callback: mController.getByActor, params }); })
    .on('movies/genre', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: false, callback: mController.getByGenre, params }); })
    .on('profile', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: false, callback: userControler.userProfile, params }); })
    .on('users', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: false, callback: userControler.getAll, params }); })
    .on('home', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: false, callback: homeControler.loadHome, params }); });

$(window).on('load', () => router.navigate());
$(window).on('hashchange', () => router.navigate());