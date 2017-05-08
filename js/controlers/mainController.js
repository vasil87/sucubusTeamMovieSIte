class MainController {

    constructor(data) {

        this.cache = {
            getMoviesByActor: {},
            getMoviesByGenre: {},
            getMoviesByRating: {}
        };

        this.data = data;
    }

    getNewestMovies() {
        if (!this.cache.getNewestMovies) {
            let result = this.data.getNewestMovies();
            this.cache.getNewestMovies = result;
        }

        return this.cache.getNewestMovies;
    }

    getTopRatingMovies() {
        if (!this.cache.getTopRatingMovies) {
            let result = this.data.getTopRatingMovies();
            this.cache.getTopRatingMovies = result;
        }

        return this.cache.getTopRatingMovies;
    }

    getOscarMovies() {
        if (!this.cache.getOscarMovies) {
            let result = this.data.getOscarMovies();
            this.cache.getOscarMovies = result;
        }

        return this.cache.getOscarMovies;
    }

    getMoviesByActor(actorName) {
        if (!this.cache.getMoviesByActor[actorName]) {
            let result = this.data.getMoviesByActor(actorName);
            this.cache.getMoviesByActor[actorName] = result;
        }

        return this.cache.getMoviesByActor[actorName];
    }

    getMoviesByRating(rating) {
        if (!this.cache.getMoviesByRating[rating]) {
            let result = this.data.getMoviesByRating(rating);
            this.cache.getMoviesByRating[rating] = result;
        }

        return this.cache.getMoviesByRating[rating];
    }

    getMoviesByGenre(genre) {
        if (!this.cache.getMoviesByGenre[genre]) {
            let result = this.data.getMoviesByGenre(genre);
            this.cache.getMoviesByGenre[genre] = result;
        }

        return this.cache.getMoviesByGenre[genre];
    }

    getUpcomingMovies() {
        if (!this.cache.getUpcomingMovies) {
            let result = this.data.getUpcomingMovies();
            this.cache.getUpcomingMovies = result;
        }

        return this.cache.getUpcomingMovies;
    }

    clearCache() {
        this.cache = {
            getMoviesByActor: {},
            getMoviesByGenre: {},
            getMoviesByRating: {}
        };
    }
}

export { MainController };