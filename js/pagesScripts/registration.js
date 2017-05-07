// $('#btn-reg').on('click', function() {
//     var isEmpty = function(str) {
//         return (!str || 0 === str.length);
//     };
//     var errors = $('.error').remove();
//     var agreedToTearms = $('#terms').is(":checked");
//     if (!agreedToTearms) {
//         if (!$('#termsError').length)
//             $('#terms').parent().append("<div id='termsError' class='error' style='color:red'>Please agree with tearms<div>");
//     }
//     debugger;
//     var names = ['firstName', 'familyName', 'username', 'email', 'password', 'confirm-password'];
//     for (var i = 0; i < names.length; i += 1) {
//         var id = names[i];
//         var element = $('#' + id).val().trim();
//         if (isEmpty(element)) {
//             $('#' + id).parent().prepend("<span class='error' style='color:red'>*</span>");
//         }
//     }
//     //check same passwords

// });