/**
 * Created by Hails on 28/09/2016.
 */
function onComment(movie){
    event.preventDefault();
    var data = {}
    data.message = $("#message").val();
    $.ajax({
        type: "POST",
        url:  "/movies/"+ movie +'/comments',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success : function(response){
            if(response.user){
                $('.comments').append(
                '<div class="comment">' +
                '<p class="commentBody">'+data.message +'</p><br>' +
                '<table class="commentTable"><tr class="commentTableRow">' +
                '<td class="time">'+response.date+'</td>' +
                '<td class="username">' + response.user + '' +
                '</td></tr></table></div></div>');
                $('#message').val('');
                $('.commentError').hide();
            }
            else{
                if(response.redirect){
                    window.location = response.redirect;
                }
                if(response.errors){
                    $('.commentError').show();
                }
            }
        },
        error: function(response){
            $('.commentError').show();
        }
    });
}

function onReply(movie, comment){
    event.preventDefault();
    var data = {}
    data.message = $("#reply").val();
    $.ajax({
        type: "POST",
        url:  "/movies/"+ movie +'/comments/' + comment + "/reply",
        data: JSON.stringify(data),
        contentType: 'application/json',
        success : function(response){
            if(response.user){
                $('.replies').append(
                    '<div class="comment">' +
                    '<p class="commentBody">'+data.message +'</p><br>' +
                    '<table class="commentTable"><tr class="commentTableRow">' +
                    '<td class="time">'+response.date+'</td>' +
                    '<td class="username">' + response.user + '' +
                    '</td></tr></table></div></div>');
                $('#reply').val('');
                $('.replyError').hide();
            }
            else{
                if(response.redirect){
                    window.location = response.redirect;
                }
                if(response.errors){
                    $('.replyError').show();
                }
            }
        },
        error: function(response){
            $('.replyError').show();
        }
    });
}

function replyControl(){
    $(".replyToggle").toggle();
}