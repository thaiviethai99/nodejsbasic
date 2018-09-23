var socket = io("http://localhost:8080");
socket.on('server_register_name_failed', function() {
    alert("Username da ton tai,vui long chon username khac");
});
socket.on('server_send_register_name_success',function(data){
	$('#currentUserName').html(data);
	$('#formRegister').hide();
	$('#chat_container').show();
})
$(function() {
    $('#btnRegisterName').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        socket.emit("client_send_register_name", $('#txtRegisterName').val());
        return false;
    });
})