import { templatesLoader } from 'templatesLoader';
import { DataOMDBController } from "dataOMDBManager";
import * as constantManager from 'constants';
import * as data from 'data';
import * as commentsControler from 'commentsControler';

const OMDBController = new DataOMDBController();
const $contentDiv = $('#content-container');
const keyWords = constantManager.getWords();


export function getOscarMovies() {
    templatesLoader.get('searchedMovies')
        .then(template => {
            let movies = OMDBController.getOscarMovies();
            console.log(movies);
            let result = template(movies);
            $("#movie-container").html(result);
            addMovieImgClick(movies);
        });
}

export function getUpcomingMovies() {
    templatesLoader.get('searchedMovies')
        .then(template => {
            let movies = OMDBController.getUpcomingMovies();
            console.log(movies);
            let result = template(movies);
            $("#movie-container").html(result);
            addMovieImgClick(movies);
        });
}

export function getByActor() {

    let actorName = $('.actor').val();

    if (actorName !== "") {
        templatesLoader.get('searchedMovies')
            .then(template => {
                let movies = OMDBController.getMoviesByActor(actorName);
                console.log(movies);
                let result = template(movies);
                $("#movie-container").html(result);
                $('.genre').val("");
                location.hash = "#/movies/actor/search";
                addMovieImgClick(movies);
            });
    } else {
        location.hash = "#/movies";
    }
}

export function getByGenre() {

    let genreName = $('.genre').val();

    if (genreName !== "") {
        templatesLoader.get('searchedMovies')
            .then(template => {
                let movies = OMDBController.getMoviesByGenre(genreName);
                console.log(movies);
                let result = template(movies);
                $("#movie-container").html(result);
                $('.actor').val("");
                location.hash = "#/movies/genre/search";
                addMovieImgClick(movies);
            });
    } else {
        location.hash = "#/movies";
    }
}

export function showNewestMovies() {
    templatesLoader.get('movies')
        .then(template => {
            let movies = OMDBController.getAllMovies();
            // console.log(movies);
            let result = template(movies);
            $contentDiv.html(result);
            addMovieImgClick(movies);
        });
}


export function seeMovie(param) {
    var movie = JSON.parse(param["moviedata"]);
    data.getMovie(movie.imdbID)
        .then(function(res) {
            var movieData = res;
            //only needs moviedata for comments like and dislikes
            // movie["comments"] = comments;
            movie["numberOfLikes"] = movieData.LikesNumber;
            movie["numberOfDislikes"] = movieData.DislikesNumber;
            // console.log(comments);
            // console.log(movieData);
            console.log(movie);
            templatesLoader.get('movie')
                .then(function(template) {
                    var movies = [];
                    movies.push(movie);
                    $contentDiv.html(template(movies));

                    addMovieClickLogic();
                });
        });
}

/*PRIVATE METHODS*/
function getTopLikedOrDislikedMoviesSorted({ numberOfMovies, liked }) {
    var dataToUse;
    return data.getTopLikedOrDislikedMovies({ numberOfMovies, liked });
}


var addMovieClickLogic = function() {
    /*Like logic*/
    $("#like").on("click", function() {
        var imdbId = $(this).data("id");
        data.getUserIdByEmail(data.getLogedUser())
            .then(function(logedUserId) {
                //check if it is in the database =>if not add it to base
                data.getMovie(imdbId)
                    .then(function(res) {
                        if (res) {
                            data.likeAMovieOrDislikeAMovie({ userId: logedUserId, imdbId, like: true })
                                .then(function(numberOflikes) {
                                    $("#number-of-likes").html(numberOflikes);
                                })
                                .catch(function(res) {
                                    toastr.error(res.responseText);
                                });

                        } else {
                            data.addMovie({ name: movie.Title, imdbId })
                                .then(function() {
                                    data.likeAMovieOrDislikeAMovie({ userId: logedUserId, imdbId, like: true })
                                        .then(function(numberOflikes) {
                                            $("#number-of-likes").html(numberOflikes);
                                        })
                                        .catch(function(res) {
                                            toastr.error(res.responseText);
                                        });
                                });
                        }
                    });
            })
            .catch(function(err) {});
    });

    /*Dislike logic */

    $("#dislike").on("click", function() {
        var imdbId = $(this).data("id");
        data.getUserIdByEmail(data.getLogedUser())
            .then(function(logedUserId) {
                //check if it is in the database =>if not add it to base
                data.getMovie(imdbId)
                    .then(function(res) {
                        if (res) {
                            data.likeAMovieOrDislikeAMovie({ userId: logedUserId, imdbId, like: false })
                                .then(function(numberOfdislikes) {
                                    $("#number-of-dislikes").html(numberOfdislikes);
                                })
                                .catch(function(res) {
                                    toastr.error(res.responseText);
                                });

                        } else {
                            data.addMovie({ name: movie.Title, imdbId })
                                .then(function() {
                                    data.likeAMovieOrDislikeAMovie({ userId: logedUserId, imdbId, like: false })
                                        .then(function(numberOfdislikes) {
                                            $("#number-of-dislikes").html(numberOfdislikes);
                                        })
                                        .catch(function(res) {
                                            toastr.error(res.responseText);
                                        });
                                });
                        }
                    });
            })
            .catch(function(err) {});
    });


    /*Comments logic*/
    $("#comments").on("click", function() {
        if ($("#comment-form").length) {
            $("#comments-container").toggle();
        } else {
            commentsControler.addComments(this);
        }

    });

};

var addMovieImgClick = function(movies) {
    getTopLikedOrDislikedMoviesSorted({ numberOfMovies: 5, liked: true })
        .then(function(res) {
            templatesLoader.get('topMovies')
                .then(function(template) {
                    if (res) {
                        //take top movies from all movies array
                        var dataToRender = movies.filter(x => res.indexOf(x["imdbID"]) >= 0);
                        if (dataToRender.length !== 0) {
                            $("#top-movies").html(template(dataToRender));
                        } else {
                            $("#top-movies").html("<h2 class='title center'>Currently no Top Movies</h2>");
                        }
                    } else {
                        $("#top-movies").html("<h2 class='title center'>Currently no Top Movies</h2>");
                    }

                    $(".current-movie.clickable,.movie-poster-container.clickable").on("click", function() {
                        var movieDataString = $(this).children("div.data").text();
                        var movieData = JSON.parse(movieDataString);
                        //if it is from topmovies it means it is already in the base
                        if ($(this).hasClass("topMovie")) {
                            window.location.href = "#/movie/" + encodeURIComponent(movieDataString);
                        } else {
                            var imdbId = movieData.imdbID;
                            //check if it is in the base
                            data.getMovie(imdbId)
                                .then(function(res) {
                                    if (res) {
                                        window.location.href = "#/movie/" + encodeURIComponent(movieDataString);
                                    } else {
                                        data.addMovie({ name: movieData.Title, imdbId: movieData.imdbID })
                                            .then(function() {
                                                window.location.href = "#/movie/" + encodeURIComponent(movieDataString);
                                            })
                                            .catch(function(err) {
                                                console.log(err);
                                            });
                                    }
                                });
                        }
                    });
                });
        });
};

// function getAllMovies() {
//     const resultArray = [];

//     keyWords.forEach(word => {
//         let currentRequestURL = `http://www.omdbapi.com/?t=${word}&y=2017&type=movie`;
//         let currentMovies = OMDBController.getNewestMovies(currentRequestURL);
//         resultArray.push(currentMovies);
//     });

//     //filter for n/a props
//     return resultArray.map(function(x) {
//         for (var i in x) {
//             if (x[i] === "N/A") {
//                 delete x[i];
//             }
//         }
//         x["data"] = JSON.stringify(x);
//         return x;
//     });
// }