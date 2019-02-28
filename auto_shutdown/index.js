const shutdown = require('shutdown-computer');
const fs = require('fs');
const fetch = require('node-fetch');

function writePlayers(noOfMinecraftPlayers) {
  fs.writeFile('playerCount', noOfMinecraftPlayers.toString(), function(err) {
    if (err) {
      return console.log(err);
    }
    console.log('The file was saved!');
  });
}

function checkPlayers() {
  fetch('https://mcapi.us/server/status?ip=prepareeminecraft.duckdns.org').then(
    res =>
      res.json().then(results => {
        const noOfMinecraftPlayers = results.players.now;
        writePlayers(noOfMinecraftPlayers);
        console.log(
          'There are ' + noOfMinecraftPlayers + ' minecraft players online.'
        );
        if (noOfMinecraftPlayers === 0) {
          fs.readFile('playerCount', 'utf8', function(err, contents) {
            if (contents === undefined) {
              console.log('No file found');
              writePlayers(0);
            }
            console.log(contents);
            const savedPlayers = parseInt(contents);
            if (savedPlayers === 0) {
              shutdown.shutDownComputer();
            }
          });
        } else {
          writePlayers(noOfMinecraftPlayers);
        }
      })
  );
}

checkPlayers();
