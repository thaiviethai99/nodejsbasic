const express = require('express')
var bodyParser = require('body-parser');
const app = express()

var server = require('http').Server(app);
var io = require('socket.io')(server);

var mysql = require('mysql'); // include thêm module mysql
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies
app.use(require('./controller/midleware.js'));
// for parsing multipart/form-data
//app.use(multer());
var PhepTinh=require('./model/PhepTinh');

// Tạo kết nối với Database
var pool = mysql.createPool({
host: 'localhost',
user: 'root',
password: null,
database: 'realtime'
});

server.listen(8000, () => console.log('Example app listening on port 8000!'))
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/public/a.html');
    //res.render('test');
    res.render('chat');
});


//app.get('/', (req, res) => res.send('Hello World dsfda!'))
app.get('/test', function(req, res) {
    var user_id = req.param('id');
    var token = req.param('token');
    var geo = req.param('geo');
    res.send(user_id + ' ' + token + ' ' + geo);
});
// http://localhost:8080/api/1
app.get('/api/:version', function(req, res) {
    res.send(req.params.version);
});

app.post('/api/users', function(req, res) {
    var name = req.body.name;
    var age = req.body.age;
    res.send(name + ' ' + age);
});
var arrUser=[];

io.on('connection',function(socket){
	console.log('co nguoi ket noi voi id la : ' + socket.id);
	socket.on('disconnect',function(){
		console.log(socket.id + "ngat ket noi");
	})
	socket.on('client_send_register_name',function(username){
        if(arrUser.indexOf(username)>=0){
            //username da ton tai
            socket.emit('server_register_name_failed');
        }else {
            //username chua ton tai
            arrUser.push(username);
            socket.Username=username;
            socket.emit('server_send_register_name_success',username);
            io.sockets.emit('server_send_list_user_online',arrUser);
        }
	});
    socket.on('client_send_logout',function(){
        arrUser.splice(arrUser.indexOf(socket.Username),1);
        socket.broadcast.emit('server_send_list_user_online',arrUser);
    });

    socket.on('clien_send_message',function(data){
        var messages={username:socket.Username,content:data};
        io.sockets.emit('server_send_message',messages);
    })
});

app.get('/user', function(req, res){
    // Viết câu truy vấn sql
    var sql = 'SELECT * FROM `users`';// Thực hiện câu truy vấn và show dữ liệu
    pool.query(sql, function(error, result){
        if (error) throw error;
        console.log('– USER TABLE — ' , result);
        res.json(result); // Trả kết quả về cho client dưới dạng json
    });
});


app.get('/tinh/:pheptinh/:soa/:sob', function(req, res){
  var {pheptinh, soa, sob} = req.params;
  var pt = new PhepTinh(pheptinh, soa, sob);
  res.send(pt.getOutput());
});

app.get('/list', require('./controller/list.js'));
app.get('/listperson', require('./controller/listperson.js'));
