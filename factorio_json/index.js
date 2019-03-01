const Rcon = require('rcon');
const restify = require('restify');
const argv = require('minimist')(process.argv.slice(2));
console.dir(argv);
const conn = new Rcon('localhost', 34343, argv[0]);

serverAnswer = undefined;

conn
  .on('auth', function() {
    console.log('Authed!');
  })
  .on('response', function(str) {
    console.log('Got response: ' + str);
    serverAnswer = str;
  })
  .on('end', function() {
    console.log('Socket closed!');
    process.exit();
  });

conn.connect();

function respond(req, res, next) {
  conn.send('players');
  while (serverAnswer === undefined) {}
  res.send(serverAnswer);
  serverAnswer = undefined;
  next();
}

var server = restify.createServer();
server.get('/', respond);

server.listen(55555, function() {
  console.log('%s listening at %s', server.name, server.url);
});
