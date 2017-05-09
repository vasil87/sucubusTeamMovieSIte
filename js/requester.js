const URL_FOR_WEB_API = 'http://localhost:51443/';
// const URL_FOR_WEB_API = 'http://sucubus.apphb.com/';

function request(url, type, body) {
    const promise = new Promise((resolve, reject) => $.ajax({
        url,
        type,
        data: body,
        success: resolve,
        error: reject
    }));

    return promise;
}

// Headers and content Type isnt allowed on omdb....So u can just use the function requestSQL 
// TODO: uncomment:?

function requestSql(url, type, headers, body, contentType) {
    const promise = new Promise((resolve, reject) => $.ajax({
        url,
        type,
        data: body,
        contentType,
        headers,
        success: resolve,
        error: reject
    }));

    return promise;
}


function requestM(url) {
    let result;
    $.ajax({
        url: url,
        async: false,
        dataType: 'json',
        success: function(json) {
            result = json;
        }
    });

    return result;
}

export function getM(url) {
    let result = requestM(url);
    return result;
}

export function get(url) {
    return request(url, 'GET', '');
}

export function post(url, body) {
    return request(url, 'POST', JSON.stringify(body));
}

export function put(url, body) {
    return request(url, 'PUT', JSON.stringify(body));
}

export function getSql(url, headers) {
    return requestSql(URL_FOR_WEB_API + url, 'GET', headers);
}

export function postSql(url, headers, body, contentType) {
    return requestSql(URL_FOR_WEB_API + url, 'POST', headers, body, contentType);
}
export function postSqlStringify(url, headers, body, contentType) {
    return requestSql(URL_FOR_WEB_API + url, 'POST', headers, JSON.stringify(body), contentType);
}

export function putSql(url, headers, body, contentType) {
    return requestSql(URL_FOR_WEB_API + url, 'PUT', headers, JSON.stringify(body), contentType);
}