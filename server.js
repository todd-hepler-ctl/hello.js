
var mysql = require('mysql');
var http = require('http');

// default connection info for local development
var connectionInfo = {
  user: 'admin',
  password: 'not-a-real-password',
  database: 'foo',
  host: 'todd-mysql.uc1.rdbs.ctl.io',
  port: '49247',
};

// set connection info from db service instance credentials from VCAP_SERVICES environment variable
// set by "cf cups" command
var vcapServices = process.env.VCAP_SERVICES;
if (vcapServices) {
  var services = JSON.parse(vcapServices);
  var userProvided = services['user-provided'];

  if (userProvided) {
    var node = userProvided[0];
    connectionInfo = {
        user: node.credentials.user,
        password: node.credentials.password,
        database: node.credentials.database,
        host: node.credentials.host,
        port: node.credentials.port,

//        ssl: {
//          ca: node.credentials.certificate
//        }
    };

  }
}

console.log(connectionInfo);
console.log(vcapServices);

http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    var connection = mysql.createConnection(connectionInfo);
    connection.query('SELECT id from foo AS id', function(err, rows, fields) {
        response.end('Hello World\nThis value came from a mysql db --> ' + rows[0].id);
    });
    connection.end();
}).listen(8080);

console.log('Server started');

