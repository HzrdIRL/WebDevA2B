/**
 * Created by Hails on 28/09/2016.
 */
//Ajax add comment
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
            //Show new comment
            if(response.user){
                $('.comments').append(
                '<div class="comment">' +
                '<p class="commentBody">'+data.message +'</p><br>' +
                '<table class="commentTable"><tr class="commentTableRow">' +
                '<td class="time">'+response.date+'</td>' +
                '<td class="username">' + response.user + '' +
                '</td></tr></table></div></div>');
                $('#message').val('');
                $('.error').hide();
            }
            //Show errors or redirect
            else{
                if(response.redirect){
                    window.location = response.redirect;
                }
                if(response.errors){
                    $('.error').show();
                }
            }
        },// show errors
        error: function(response){
            $('.error').show();
        }
    });
}