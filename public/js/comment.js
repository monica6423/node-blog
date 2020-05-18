//add comment
function buildTodo(comment) {
    var commentHtml = '<div class="todo parent wrap" id="'
        + comment._id + '"><span class="comment box"> ' + comment.name
        + '</span> <p class="box"> 💬: ' + comment.body
        + '</p></div>';

    return commentHtml;
}


$(document).ready(function () {

    $('.todo-container').on('submit', function (e) {
        e.preventDefault();
        console.log(e.target);

        var formData = $(e.target).serialize();
        $('#create-todo').trigger("reset");

        $.ajax({
            url: '/posts/addcomment',
            type: 'post',
            data: formData
        })

        .done(function (data) {
            console.log(data);
            var todo = buildTodo(data);
            $('.chat-messages').append(todo);
            //scroll down
            document.querySelector('.chat-messages').scrollTop = document.querySelector('.chat-messages').scrollHeight;
        })
        .fail(function (data) {
            console.log("post route failed :", data);
        })
           
     
    })



});

