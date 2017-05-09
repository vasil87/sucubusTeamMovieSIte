import * as data from 'data';
import { templatesLoader } from 'templatesLoader';

export function addComments(target) {
    templatesLoader.get('comments')
        .then(template => {
            var imdbId = $(target).data("id");
            data.getUserIdByEmail(data.getLogedUser())
                .then(function(userID) {
                    data.getAllCommentsForAMovie(imdbId)
                        .then(function(comments) {
                            comments.map(function(x) {
                                if (x.UsersId === userID) {
                                    x["owner"] = 1;
                                }
                                return x;
                            });
                            let result = template(comments);
                            $("#comments-container").html(result);
                            $("#ul-comments").on("click", 'button', function() {
                                var target = this;
                                data.deleteComment($(this).data("id"))
                                    .then(function() {
                                        $(target).parent().remove();
                                    })
                                    .catch(function(err) {
                                        console.log(err);
                                    });
                            });
                            $("#btn-commit-comment").on("click", function(e) {
                                e.preventDefault();
                                var input = $("#comment-text").val().trim();
                                if (input) {
                                    //data get logged user is not a promise;

                                    data.addAComment({ UserId: userID, ImdbId: imdbId, Text: input })
                                        .then(function(commentId) {
                                            $("#ul-comments").append('<li class="list-group-item list-group-item-success comment-item" data-id="' + commentId + '">' +
                                                '<button type="button" data-id="' + commentId + '" class="close comment-close" data-dismiss="modal">&times;</button>' +
                                                input + '</li>');
                                            $("#comment-text").val("");
                                        })
                                        .catch(function(err) {
                                            console.log(err);
                                        });

                                }
                            });
                        })
                        .catch(function(error) {
                            console.log("error");
                        });

                });
        });
}