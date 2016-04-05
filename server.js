
var mysql = require('mysql');
var http = require('http');

// default connection info for local development
var connectionInfo = {
  user: 'user',
  password: 'myP@ssW0rd',
  database: 'myappdb'
};

// set connection info from db service instance credentials from VCAP_SERVICES environment variable
// set by "cf cups" command
if (process.env.VCAP_SERVICES) {
  var services = JSON.parse(process.env.VCAP_SERVICES);
  var userProvided = services['user-provided'];

  if (userProvided) {
    var node = userProvided[0];
    connectionInfo = {
        host: node.credentials.host,
        port: node.credentials.port,
        user: node.credentials.username,
        password: node.credentials.password,
        database: node.credentials.dbname,
        ssl: {
          ca: node.credentials.certificate
        }
    };
  }
}

// create function 'query' for SQL statement execution against MySQL database
exports.query = function(query, callback) {
  var connection = mysql.createConnection(connectionInfo);
  connection.query(query, function(queryError, result) {
    callback(queryError, result);
  });
  connection.end();
};


http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
}).listen(8080);

console.log('Server started');

