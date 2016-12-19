var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended:false});
var pg= require('pg');
var port = process.env.PORT || 8080;

var connectionString = 'postgres://localhost:5432/theList';

var todos = [];

app.listen( port, function( req, res ){
  console.log( 'server listening on', port );
}); // end spin up server

// base url
app.get( '/', function( req, res ){
  res.sendFile( path.resolve( 'views/index.html' ) );
}); // end base url

//POST
app.post('/addTask', urlEncodedParser, function(req,res){
  console.log('new task added: ', req.body);
  todos.push(req.body);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else {
      console.log('connected to DB: ', req.body);
      client.query('INSERT INTO tasks(task, completed) values($1, $2)', [req.body.task, req.body.completed]);
      done();
      res.send('Woohoo');
    }
  });
});

//GET
app.get('/getTask', function(req,res){
  console.log('GET hit');
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else {
      var query = client.query('SELECT task FROM tasks');
      query.on('row', function(row){
        todos.push(row);
      });
      query.on('end', function(){
        done();
        console.log(todos);
        res.send(todos);
      });
    }
  });
});//end GET



// static folder
app.use( express.static( 'public' ) );
