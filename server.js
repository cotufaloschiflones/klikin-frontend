var express = require('express');
var app = express();


app.use('/js', express.static(__dirname + '/js'));
app.use('/www', express.static(__dirname + '/../www'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/views', express.static(__dirname + '/views'));

app.all('/*', function(req, res, next) {
    // Envío al index.html las otras rutas también que soportan HTML5Mode para que Angular sepa resolverlo
    res.sendFile('index.html', { root: __dirname });
});

app.listen(3003); 
console.log("RUNNING ON 3003");