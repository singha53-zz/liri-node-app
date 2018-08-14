require('dotenv').config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var request = require('request');

var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

var expr = process.argv[2];

switch (expr) {
  case 'my-tweets':
    getTweets();
    console.log('hi');
    break;
  case 'spotify-this-song':
    var songName = process.argv[3];
    getSong();
    console.log(songName);
    break;
  case 'movie-this':
    getMovie();
    break;
  case 'do-what-it-says':
    obey();
    console.log('hi');
    break;
}

function getTweets() {}
function getSong() {}
function getMovie() {
  var movieName = process.argv[3];
  if (movieName === undefined) {
    movieName = 'Mr.+Nobody';
  } else {
    movieName = movieName.split(' ').join('+');
  }

  var queryUrl =
    'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey='+process.env.OMDB_API_KEY;
  console.log(queryUrl);
  request(queryUrl, function(error, response, body) {
    // If the request is successful
    // error first callback
    if (!error && response.statusCode === 200) {
      var movieData = JSON.parse(body)

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      // console.log(response)
      console.log(`Title: ${movieData.Title}`);
      console.log(`Year of release: ${movieData.Released.split(' ')[2]}`);
      console.log(`IMDB Rating: ${movieData.imdbRating}`);
      console.log(`Rotten Tomatoes Rating: ${movieData.Ratings[1].Source}`);
      console.log(`Country: ${movieData.Country}`);
      console.log(`Language: ${movieData.Language}`);
      console.log(`Plot: ${movieData.Plot}`);
      console.log(`Actors: ${movieData.Actors}`);
      console.log('Release Year: ' + JSON.parse(body).Year);
    }
  });
}
function obey() {}
