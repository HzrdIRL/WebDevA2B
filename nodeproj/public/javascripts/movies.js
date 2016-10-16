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
                '<td class="username">' + response.user + '</td>' +
                '</tr>' +
                '<tr class="commentTableRow">' +
                '<td>' +
                '</td>' +
                '<td>' +
                '<button class="btn btn-reply '+response.comment._id+'", onclick="replyControl('+response.comment._id+')"> Replies '+
                '</button>' +
                '<button class="btn btn-reply '+response.comment._id+'", onclick="replyControl('+response.comment._id+')", style="display: none"> Hide '+
                '</button>' +
                '</td></tr></table></div></div>' +
                '<br/><div class="replyError", style="display:none"><p>Comment must not be blank</p></div>'+
                '<div class="replies '+ response.comment._id +'", id="'+response.comment._id+'", style="display: none">' +
                '<form class="form-group replyForm" id="theForm", action="javascript:;", onsubmit="onReply(' + movie + ',' + response.comment._id +')">' +
                '<textarea class="commentText", id="reply'+response.comment._id +'", name="reply"></textarea><br/>' +
                '<button class="btn btn-primary btn-comment", type="submit">Reply</button>' +
                '</form></div>');
                $('#message').val('');
                $('.commentError').hide();
            }
            //Show errors or redirect
            else{
                if(response.redirect){
                    window.location = response.redirect;
                }
                if(response.errors){
                    $('.commentError').show();
                }
            }
        },// show errors
        error: function(response){
            $('.commentError').show();
        }
    });
}

//Ajax add reply
function onReply(movie, comment){
    event.preventDefault();
    var data = {};
    console.log(comment);
    data.message = $("#reply"+comment).val();
    $.ajax({
        type: "POST",
        url:  "/movies/"+ movie +'/comments/' + comment + "/reply",
        data: JSON.stringify(data),
        contentType: 'application/json',
        success : function(response){
            // Show new reply
            if(response.user){
                $('#'+comment).append(
                    '<div class="comment">' +
                    '<p class="commentBody">'+data.message +'</p><br>' +
                    '<table class="commentTable"><tr class="commentTableRow">' +
                    '<td class="time">'+response.date+'</td>' +
                    '<td class="username">' + response.user + '' +
                    '</td></tr></table></div></div>');
                $("#reply"+comment).val('');
                $('.replyError').hide();
            }
            //Show errors or redirect
            else{
                if(response.redirect){
                    window.location = response.redirect;
                }
                if(response.errors){
                    console.log(response.errors);
                    $('.replyError').show();
                }
            }
        },
        //show errors
        error: function(response){
            console.log('ajax error');
            $('.replyError').show();
        }
    });
}

//Handles animation for show/hide replies
function replyControl(id){
    $("."+id).toggle();
}