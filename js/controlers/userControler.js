import * as data from 'data';
import { templatesLoader } from 'templatesLoader';
import * as requester from 'requester';

const $contentDiv = $('#content-container');

const LOCALSTORAGE_AUTH_KEY_NAME = 'authkey';
const AUTH_KEY_HEADER = 'x-auth-key';
const WEB_API_SQL = 'http://localhost:51443/';

export function register() {
    templatesLoader.get('register')
        .then(template => {
            $contentDiv.html(template());
            // $("#btn-reg").on("click", function() {
            $('#registerForm').validator().on('submit', function(e) {
                if (e.isDefaultPrevented()) {
                    // handle the invalid form...
                } else {
                    var user = {
                        firstname: $("#firstName").val(),
                        lastname: $("#familyName").val(),
                        username: $("#username").val(),
                        password: $("#inputPassword").val(),
                        ismale: ($('input[name=gender]:checked').val() === 'true') ? true : false,
                        email: $("#email").val()
                    };
                    data.register(user)
                        .then(function(res) {
                            console.log(res);
                            if (!res) {
                                data.addMoviesUser(user)
                                    .then(function(res) {
                                        var userMoviesId = res; //as string  
                                        window.location.href = "#/login";
                                        toastr.success(`User created Successfully!Please login`);

                                    })
                                    .catch(function(err) {
                                        toastr.error(JSON.stringify(err.message));
                                    });
                            }
                        })
                        .catch(function(err) {
                            toastr.error(JSON.stringify(err.responseText));
                        });
                }

            });
        });
}

export function login() {
    templatesLoader.get('login')
        .then(template => {
            $contentDiv.html(template());

            $("#btn-log").on("click", function() {
                var user = {
                    username: $("#userName-log").val(),
                    password: $("#password-log").val(),
                    shouldRemember: $("#remember-me").is(":checked")
                };
                data.signIn(user)
                    .then(function(res) {
                        window.location.href = "#/watch";
                        $("#btn-login").addClass("hidden");
                        $("#btn-logout").removeClass("hidden");
                        toastr.success("Hello" + " " + res);

                    })
                    .catch(function(err) {
                        toastr.error(err.responseText);
                    });


            });
        });
}

export function logout() {
    data.signOut()
        .then(function(res) {
            location.href = '#/login';
            $("#btn-login").removeClass("hidden");
            $("#btn-logout").addClass("hidden");
            toastr.success('Logged out');
        })
        .catch(function(err) {
            toastr.error(err.responseText);
        });

}

//todo remake
export function getAll() {
    var token = 'Bearer' + "sdfsdfsdf";
    //  sessionStorage.getItem('token');
    var header = new Object();
    header.Authorization = token;
    requester.getSql(WEB_API_SQL + 'api/users/get', token)
        .then(result => {
            $contentDiv.html(result);
        });
    // loadTemplate('auth')
    //     .then(template => {
    //         $appContainer.html(template());
    //     });
}