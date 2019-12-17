$(function(){

  function buildHTML(message){
    if (message.image) {
      var html = `<div class="chat-main__message-list__message-contents" data-message_id= ${message.id}>
                    <div class="chat-main__message-list__message-contents__user-info">
                      <div class="chat-main__message-list__message-contents__user-info__user-name">
                        ${message.name}
                      </div>
                      <div class="chat-main__message-list__message-contents__user-info__user-update">
                        ${message.date}
                      </div>
                    </div>
                    <div class="chat-main__message-list__message-contents__user-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                    </div>
                    <div class="chat-main__message-list__message-contents__user-message">
                        <img src= ${ message.image } , class = "lower-message__image">
                    </div>
                  </div>
                 `
    } else {
      var html = `<div class="chat-main__message-list__message-contents" data-message_id= ${message.id}>
                    <div class="chat-main__message-list__message-contents__user-info">
                      <div class="chat-main__message-list__message-contents__user-info__user-name">
                        ${message.name}
                      </div>
                      <div class="chat-main__message-list__message-contents__user-info__user-update">
                        ${message.date}
                      </div>
                    </div>
                    <div class="chat-main__message-list__message-contents__user-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                    </div>
                  </div>
                 `
    }
    return html
  }


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.new_message')[0].reset()
    })
    .fail(function(){
      alert('エラー');
    })
    .always(function(){
      $(".new_message__message-btn").removeAttr("disabled");
      });
  });

  var reloadMessages = function() {
    var group_id = $(".chat-main__message-list__message-contents").attr('data-group_id');
    if(location.pathname == `/groups/${group_id}/messages`){
      last_message_id = $('.chat-main__message-list__message-contents').last().attr('data-message_id');
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      })
      .fail(function() {
        alert('更新失敗');
      });
    };
  };
  setInterval(reloadMessages, 7000);
});