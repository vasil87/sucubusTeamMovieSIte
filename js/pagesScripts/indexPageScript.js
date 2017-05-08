$(function() {
    const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username';
    const LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';
    if ((!!localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY) &&
            !!localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)) ||
        (!!sessionStorage.getItem(LOCAL_STORAGE_USERNAME_KEY) &&
            !!sessionStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY))) {
        $("#btn-login").addClass("hidden");
        $("#btn-logout").removeClass("hidden");
    } else {
        $("#btn-login").removeClass("hidden");
        $("#btn-logout").addClass("hidden");
    }
});


$("#navbar").on("click", "a", function() {
    var parent = $(this).parent().parent();
    var children = $(parent).find("a");
    var lenght = children.length;
    for (var i = 0; i < lenght; i += 1) {
        $(children[i]).removeClass("clickedNavBar");
    }
    $(this).addClass("clickedNavBar");
});