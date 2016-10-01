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
                $('.error').hide();
            }
            else{
                window.location = response.redirect;
            }
        },
        error: function(response){
            $('.error').show();
        }
    });
}