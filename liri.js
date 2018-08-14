require('dotenv').config();
var keys = require('./keys.js');
var Spotify = require("node-spotify-api")

var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

var expr = process.argv[2]

switch(expr){
  case "my-tweets":
  console.log("hi")
  break;
  case "spotify-this-song":
  var songName = process.argv[3]
  console.log(songName)
  break;
  case "movie-this":
  var movieName = process.argv[3]
  console.log("hi")
  break;
  case "do-what-it-says":
  console.log("hi")
  break;
}