$(function(){

  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      var html = `<div class="chat-main__message-list__message-contents">
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
      var html = `<div class="chat-main__message-list__message-contents">
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
  })
});