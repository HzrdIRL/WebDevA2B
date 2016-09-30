/**
 * Created by Hails on 28/09/2016.
 */
function onComment(movie){
    event.preventDefault();
    //var data = $('#theForm').serialize();
    var data = {};
    data.body = "hello"
    console.log(data);
    $.ajax({
        type: "POST",
        url:  "/movies/"+ movie +'/comments',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success : function(){
            console.log("success");
            $('.comments').append($('.comment').html(result));
        }
    });
}