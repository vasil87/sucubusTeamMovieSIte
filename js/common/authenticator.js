import * as data from 'data';
export function checkIfThereIsLogedInUser({ allowAnonimous, callback, params }) {
    if (allowAnonimous) {
        if (params) {
            return callback(params);
        }
        return callback();
    } else {
        if (data.hasUser()) {
            if (params) {
                return callback(params);
            }
            return callback();
        } else {
            window.location.href = "#/login";
            $("#btn-login").trigger("click");
            toastr.error("Please log in first");
        }
    }
}