const express = require('express')
var bodyParser = require('body-parser');
const app = express()

var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(8080, () => console.log('Example app listening on port 8080!'))
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/public/a.html');
    res.render('test');
});
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

// for parsing multipart/form-data
//app.use(multer());

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

io.on('connection',function(socket){
	console.log('co nguoi ket noi voi id la : ' + socket.id);
	socket.on('disconnect',function(){
		console.log(socket.id + "ngat ket noi");
	})
	socket.on('client_send_color',function(data){
		io.sockets.emit('server_send_color',data);
	})
});