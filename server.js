
var mysql = require('mysql');
var http = require('http');

// default connection info for local development
var connectionInfo = {
  user: 'admin',
  password: 'Savvis123!',
  database: 'foo',
  host: 'todd-mysql.uc1.rdbs.ctl.io',
  port: '49247',
};

// set connection info from db service instance credentials from VCAP_SERVICES environment variable
// set by "cf cups" command
if (process.env.VCAP_SERVICES) {
  var services = JSON.parse(process.env.VCAP_SERVICES);
  var userProvided = services['user-provided'];

  if (userProvided) {
    var node = userProvided[0];
//    connectionInfo = {
//        user: node.credentials.username,
 //       password: node.credentials.password,
  //      database: node.credentials.database,
   ////     host: node.credentials.host,
     //   port: node.credentials.port,

//        ssl: {
//          ca: node.credentials.certificate
//        }
//    };

  }
}

console.log(connectionInfo);
// create function 'query' for SQL statement execution against MySQL database
//query = function(query, callback) {
//  var connection = mysql.createConnection(connectionInfo);
//  connection.query(query, function(queryError, result) {
//    callback(queryError, result);
//  });
//  connection.end();
//};


http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
//    response.end('Hello World Too\n' + process.env.VCAP_SERVICES);
    var connection = mysql.createConnection(connectionInfo);
    var x = 42;
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
        var y = rows[0].solution;
        response.end('Hello World Too\n' + y + '\nI think I connected to a db\n');
    });
//    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//    });
    connection.end();
    
//    response.write(connetionInfo + '\n');
}).listen(8080);

console.log('Server started');

