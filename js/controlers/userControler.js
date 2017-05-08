import * as data from 'data';
import { templatesLoader } from 'templatesLoader';
import * as requester from 'requester';

const $contentDiv = $('#content-container');

const LOCALSTORAGE_AUTH_KEY_NAME = 'authkey';
const AUTH_KEY_HEADER = 'x-auth-key';
const WEB_API_SQL = 'http://localhost:51443/';
const cities = ['Blagoevgrad', 'Burgas', 'Gabrovo', 'Haskovo', 'Jambol', 'Kjustendil', 'Lovech', 'Montana', 'Pazardzhik', 'Pernik', 'Pleven', 'Plovdiv', 'Razgrad', 'Ruse', 'Silistra', 'Sliven', 'Smoljan', 'Sofia', 'Stara Zagora', 'Shumen', 'Targovishte', 'Varna', 'Veliko Turnovo', 'Vidin', 'Vraca'];

export function register() {
    templatesLoader.get('register')
        .then(template => {
            $contentDiv.html(template());
            $(function() {
                $("#city").autocomplete({
                    source: cities
                });
            });
            // $("#btn-reg").on("click", function() {
            $('#registerForm').validator().on('submit', function(e) {
                if (e.isDefaultPrevented()) {
                    // handle the invalid form...
                } else {
                    e.preventDefault();
                    var cityVal;
                    if ($("#city").val().trim()) {
                        cityVal = $("#city").val();
                    } else {
                        cityVal = null;
                    }
                    var user = {
                        firstname: $("#firstName").val(),
                        lastname: $("#familyName").val(),
                        username: $("#username").val(),
                        city: cityVal,
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
                                        toastr.error(JSON.stringify(err.responseText.Message));
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
            $("#btn-log").on("click", function(e) {
                e.preventDefault();
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

export function userProfile() {
    var username = data.getLogedUser();
    data.getUserIdByEmail(username)
        .then(function(id) {
            data.getUserInfo(id)
                .then(function(userInfo) {
                    var userData = [];
                    userData.push(userInfo);
                    // console.log(userInfo);
                    templatesLoader.get('profile')
                        .then(template => {
                            $contentDiv.html(template(userData));
                            $(function() {
                                $("#city").autocomplete({
                                    source: cities
                                });
                            });
                            if (userData[0].isMale) {
                                $('#maleRadio').attr('checked', true);
                            } else {
                                $('#femaleRadio').attr('checked', true);
                            }
                            $("#btn-change-user-info").on("click", function(e) {
                                e.preventDefault();
                                var newpassword = $("#newPassword").val();
                                var oldpassword = $("#currentPassword").val();
                                if ((newpassword.trim() && oldpassword.trim()) || (!newpassword.trim() && !oldpassword.trim())) {
                                    var newUserInfo;
                                    newUserInfo = {
                                        FirstName: $("#firstName").val().trim() ? $("#firstName").val() : userData[0].FirstName,
                                        LastName: $("#familyName").val().trim() ? $("#familyName").val() : userData[0].LastName,
                                        UserName: $("#username").val().trim() ? $("#username").val() : userData[0].UserName,
                                        City: $("#city").val().trim() ? $("#city").val() : null,
                                        isMale: ($('input[name=gender]:checked').val() === 'true') ? true : false,
                                        Email: $("#email").val().trim() ? $("#email").val() : userData[0].Email
                                    };

                                    data.updataMovieUser(newUserInfo)
                                        .then(function() {
                                            if (newpassword.trim()) {
                                                var newPasswords = {
                                                    OldPassword: oldpassword,
                                                    NewPassword: newpassword,
                                                    ConfirmPassword: newpassword
                                                };
                                                data.changeUserPassword(newPasswords)
                                                    .then(function() {
                                                        toastr.success("Succesfully changed user info and password!");
                                                    })
                                                    .catch(function(err) {
                                                        console.log(err);
                                                    });
                                            } else {
                                                toastr.success("Succesfully changed user info!");
                                            }
                                        })
                                        .catch(function(err) {
                                            console.log(err);
                                        });
                                } else {
                                    toastr.error("Please fill both passwords or leave them both empty")
                                }

                            });
                        });
                });
        });
}

//todo remake
export function getAll() {
    data.getAllUsers()
        .then(function(users) {
            var userData = users;
            templatesLoader.get('users')
                .then(template => {
                    $contentDiv.html(template(userData));
                });
        });
}