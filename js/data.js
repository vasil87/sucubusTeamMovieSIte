import * as requester from 'requester';

const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username';
const LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';

var setAuthHeader = function() {
    var token = localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY) || sessionStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY);
    return { "Authorization": token };
};

var transform = function(obj) {
    var str = [];
    for (var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    return str.join("&");
};

/* Users */

export function register(user) {

    var reqUser = {
        username: user.username,
        password: user.password,
        confirmpassword: user.password,
        email: user.email
    };
    var contentType = 'application/x-www-form-urlencoded';

    var body = transform(reqUser);

    return requester.postSql('api/account/register', {}, body, contentType);
}

export function addMoviesUser(user) {
    var reqUser = {
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        ismale: user.ismale
    };
    var contentType = 'application/json';

    var body = reqUser;

    return requester.postSqlStringify('api/users/Register', {}, body, contentType);
}


export function signIn(user) {
    var reqUser = {
        username: user.username,
        password: user.password,
        grant_type: "password"
    };

    var contentType = 'application/x-www-form-urlencoded';

    var body = transform(reqUser);

    var header = { "ContentType": "application/x-www-form-urlencoded" };
    //should check if to remember
    return requester.postSql('token', {}, body, contentType)
        .then(function(resp) {
            if (user.shouldRemember) {
                localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, resp.userName);
                localStorage.setItem(LOCAL_STORAGE_AUTHKEY_KEY, resp.token_type + " " + resp.access_token);
            } else {
                sessionStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, resp.userName);
                sessionStorage.setItem(LOCAL_STORAGE_AUTHKEY_KEY, resp.token_type + " " + resp.access_token);
            }

            return resp.userName;
        });
}

export function signOut() {
    var promise = new Promise(function(resolve, reject) {
        localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
        localStorage.removeItem(LOCAL_STORAGE_AUTHKEY_KEY);
        sessionStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
        sessionStorage.removeItem(LOCAL_STORAGE_AUTHKEY_KEY);
        resolve();
    });
    return promise;
}

export function hasUser() {
    return (!!localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY) &&
            !!localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)) ||
        (!!sessionStorage.getItem(LOCAL_STORAGE_USERNAME_KEY) &&
            !!sessionStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY));

}

export function getUserIdByEmail(email) {
    var header = setAuthHeader();
    header["contentType"] = 'application/json';
    var content = "application/json";

    return requester.postSql('api/users/GetUserIdByName', header, email, content);
}
export function getLogedUser() {
    return localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY) || sessionStorage.getItem(LOCAL_STORAGE_USERNAME_KEY);
}


// export function usersGet() {
//     return jsonRequester.get('api/users')
//         .then(function(res) {
//             return res.result;
//         });
// }

/* Movies */
export function getTopLikedOrDislikedMovies({ numberOfMovies, liked }) {
    var header = setAuthHeader();
    header["contentType"] = 'application/json';
    if (liked) {
        return requester.getSql('api/movies/GetTopLikedMovies/' + numberOfMovies, header);
    } else {
        return requester.getSql('api/movies/GetTopDisLikedMovies/' + numberOfMovies, header);
    }
}

export function getMovie(imdbId) {
    var header = setAuthHeader();
    header["contentType"] = 'application/json';

    return requester.getSql('api/movies/GetById/' + imdbId, header);

}

export function addMovie({ name, imdbId }) {
    var header = setAuthHeader();
    header["contentType"] = 'application/json';
    var content = 'application/json';

    return requester.postSqlStringify("api/movies/Add", header, { Name: name, ImdbID: imdbId }, content);
}

export function likeAMovieOrDislikeAMovie({ userId, imdbId, like }) {
    var header = setAuthHeader();
    header["contentType"] = 'application/json';
    var content = "application/json";

    if (like) {
        var likeAMovieObject = { UserId: userId, ImdbID: imdbId };

        return requester.postSqlStringify("api/movies/LikeAMovie", header, likeAMovieObject, content);
    } else {
        var likeAMovieObject = { UserId: userId, ImdbID: imdbId };

        return requester.postSqlStringify("api/movies/DislikeAMovie", header, likeAMovieObject, content);
    }
}


/* Comments */
export function getMoviesComments(imdbId) {
    var header = setAuthHeader();
    header["contentType"] = 'application/json';

    return requester.getSql('api/comments/GetAllCommentsForAMovie/' + imdbId, header);

}