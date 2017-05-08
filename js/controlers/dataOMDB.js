import * as requester from 'requester';
import * as constantManager from 'constants';

class DataOMDBController {

    addDataAndRemoveNAFields(array) {
        return array.map(function(x) {
            //delete all props that are n/a
            for (var i in x) {
                if (x[i] === "N/A") {
                    delete x[i];
                }
            }
            x["data"] = JSON.stringify(x);
            return x;
        });
    }

    getAllMovies() {
        const keyWords = constantManager.getWords();
        const resultArray = [];

        keyWords.forEach(word => {
            let currentRequestURL = `https://www.omdbapi.com/?t=${word}&y=2017&type=movie`;
            let currentMovies = requester.getM(currentRequestURL);
            if (currentMovies.Poster != "N/A" && currentMovies.Poster != "") {
                resultArray.push(currentMovies);
            }
        });

        return this.addDataAndRemoveNAFields(resultArray);
    }


    getOscarMovies() {
        const keyWords = constantManager.getWords();
        const resultArray = [];

        keyWords.forEach(keyWord => {
            var currentRequestURL = `https://www.omdbapi.com/?t=${keyWord}&type=movie`;
            let currentMovies = requester.getM(currentRequestURL);

            if (currentMovies.Awards && currentMovies.Awards != "N/A" && currentMovies.Poster != "N/A" && currentMovies.Poster != "") {
                let result = currentMovies.Awards;
                if (result.indexOf("Oscar") > -1) {
                    resultArray.push(currentMovies);
                }
            }
        });

        return this.addDataAndRemoveNAFields(resultArray);
    }

    getUpcomingMovies() {
        const keyWords = constantManager.getWords();
        const resultArray = [];

        keyWords.forEach(word => {
            let currentRequestURL = `https://www.omdbapi.com/?t=${word}&y=2018&type=movie`;
            let currentMovies = requester.getM(currentRequestURL);
            if (currentMovies.Poster != "N/A" && currentMovies.Poster != "") {
                resultArray.push(currentMovies);
            }
        });

        return this.addDataAndRemoveNAFields(resultArray);
    }

    getMoviesByActor(actorName) {
        const keyWords = constantManager.getWords();
        const resultArray = [];

        keyWords.forEach(word => {
            let currentRequestURL = `https://www.omdbapi.com/?t=${word}&type=movie`;
            let currentMovies = requester.getM(currentRequestURL);
            if (currentMovies.Poster != "N/A" && currentMovies.Poster != "") {
                if (currentMovies.Actors && currentMovies.Actors.toLowerCase().includes(actorName.toLowerCase())) {
                    resultArray.push(currentMovies);
                }
            }
        });

        return this.addDataAndRemoveNAFields(resultArray);
    }

    getMoviesByGenre(genre) {
        const keyWords = constantManager.getWords();
        const resultArray = [];

        keyWords.forEach(word => {
            let currentRequestURL = `https://www.omdbapi.com/?t=${word}&type=movie`;
            let currentMovies = requester.getM(currentRequestURL);
            if (currentMovies.Poster != "N/A" && currentMovies.Poster != "") {
                if (currentMovies.Genre && currentMovies.Genre.toLowerCase().includes(genre.toLowerCase())) {
                    resultArray.push(currentMovies);
                }
            }
        });

        return this.addDataAndRemoveNAFields(resultArray);
    }



    getMoviesFromPreviousYears(previousYear) {
        let resultMovies = [];

        this.keyWordsToSearch.forEach(keyWord => {
            var currentRequestURL = `https://www.omdbapi.com/?t=${keyWord}&y=${previousYear}}&type=movie`;

            requester.get(currentRequestURL)
                .then(result => {
                    resultMovies.push(result);
                });
        });

        return this.addDataAndRemoveNAFields(resultArray);
    }



    getMoviesByRating(rating) {
        let resultMovies = [];

        this.keyWordsToSearch.forEach(keyWord => {
            var currentRequestURL = `https://www.omdbapi.com/?t=${keyWord}&type=movie`;

            requester.get(currentRequestURL)
                .then(result => {
                    if (result.Poster && result.imdbRating == rating)
                        resultMovies.push(result);
                });
        });

        return this.addDataAndRemoveNAFields(resultArray);
    }

    getTopRatingMovies() {
        let resultMovies = [];

        this.keyWordsToSearch.forEach(keyWord => {
            var currentRequestURL = `https://www.omdbapi.com/?t=${keyWord}&type=movie`;

            requester.get(currentRequestURL)
                .then(result => {
                    if (result.Poster && result.imdbRating >= 8)
                        resultMovies.push(result);
                });
        });

        return this.addDataAndRemoveNAFields(resultArray);
    }
}

export { DataOMDBController };