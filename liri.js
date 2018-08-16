require('dotenv').config();
var funcs = require('./functions.js');
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv;
var options = command.splice(3, command.length + 1);

switch (command[2]) {
  case 'my-tweets':
    funcs.getTweets(client);
    break;
  case 'spotify-this-song':
    funcs.getSong(spotify, options);
    break;
  case 'movie-this':
    funcs.getMovie(request, options);
    break;
  case 'do-what-it-says':
    funcs.obey();
    console.log('hi');
    break;
}
