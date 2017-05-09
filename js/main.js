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
    .on('watch', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: true, callback: openNearestCinema, params }); })
    .on('users', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: true, callback: userControler.getAll, params }); })
    .on('movies', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: true, callback: mController.showNewestMovies, params }); })
    .on('login', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: true, callback: userControler.login, params }); })
    .on('logout', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: true, callback: userControler.logout, params }); })
    .on('movie/:moviedata', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: true, callback: mController.seeMovie, params }); })
    .on('movies/upcoming', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: true, callback: mController.getUpcomingMovies, params }); })
    .on('movies/actor', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: true, callback: mController.getByActor, params }); })
    .on('movies/genre', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: true, callback: mController.getByGenre, params }); })
    .on('profile', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: true, callback: userControler.userProfile, params }); })
    .on('users', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: true, callback: userControler.userProfile, params }); })
    .on('home', function(params) { checkIfThereIsLogedInUser({ allowAnonimous: true, callback: homeControler.loadHome, params }); });

$(window).on('load', () => router.navigate());
$(window).on('hashchange', () => router.navigate());