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
                $('.comments').append("<div class='comment'><h1>" + response.user + "</h1><p>" + data.message + "</p><p>" + response.date + "</p></div>");
            }
            else{
                window.location = response.redirect;
            }
        },
        error: function(response){
            $('.comments').append("<p>please login to comment</p>");
        }
    });
}