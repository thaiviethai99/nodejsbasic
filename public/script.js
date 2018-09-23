var socket = io("http://localhost:8000");
socket.on('server_register_name_failed', function() {
    alert("Username da ton tai,vui long chon username khac");
});
socket.on('server_send_register_name_success',function(data){
	$('#currentUserName').html(data);
	$('#formRegister').hide();
	$('#chat_container').show();
});
socket.on('server_send_list_user_online',function(data){
    $("#listUserOnline").html('');
    data.forEach(function(item){
        var html=`<li class="left clearfix">
                     <span class="chat-img pull-left">
                     <img src="https://lh6.googleusercontent.com/-y-MY2satK-E/AAAAAAAAAAI/AAAAAAAAAJU/ER_hFddBheQ/photo.jpg" alt="User Avatar" class="img-circle">
                     </span>
                     <div class="chat-body clearfix">
                        <div class="header_sec">
                           <strong class="primary-font">${item}</strong> <strong class="pull-right">
                           09:45AM</strong>
                        </div>
                        <div class="contact_sec">
                           <strong class="primary-font">(123) 123-456</strong> <span class="badge pull-right">3</span>
                        </div>
                     </div>
                  </li>`;
        $("#listUserOnline").append(html);
    });
});

socket.on('server_send_message',function(data){
    var html=`<li class="left clearfix">
                     <span class="chat-img1 pull-left">
                     <img src="https://lh6.googleusercontent.com/-y-MY2satK-E/AAAAAAAAAAI/AAAAAAAAAJU/ER_hFddBheQ/photo.jpg" alt="User Avatar" class="img-circle">
                     </span>
                     <div class="chat-body1 clearfix">
                        <p><span>${data.username} : </span> ${data.content}</p>
                        <div class="chat_time pull-right">09:40PM</div>
                     </div>
                  </li>`;
    $('#listMessage').append(html);
});
$(function() {
    $('#btnRegisterName').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        socket.emit("client_send_register_name", $('#txtRegisterName').val());
        return false;
    });

    $('#btnLogout').click(function(){
        socket.emit('client_send_logout');
        $('#formRegister').show();
        $('#chat_container').hide();
        return false;
    });

    $('#btnSendMessage').click(function(){
        socket.emit('clien_send_message',$('#message').val());
        return false;
    });
})