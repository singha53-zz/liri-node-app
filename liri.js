require('dotenv').config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var expr = process.argv[2];

switch (expr) {
  case 'my-tweets':
    getTweets();
    break;
  case 'spotify-this-song':
    getSong();
    break;
  case 'movie-this':
    getMovie();
    break;
  case 'do-what-it-says':
    obey();
    console.log('hi');
    break;
}

function getTweets() {
  var params = { q: '#nodejs', count: 20, result_type: 'recent', lang: 'en' };
  client.get('statuses/user_timeline', params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      for (tweet in tweets) {
        console.log(
          `----------------------- \n${tweets[tweet].created_at}: ${
            tweets[tweet].text
          }\n`
        );
      }
    }
  });
}

function getSong() {
  var songName = process.argv[3];
  if (songName === undefined) {
    songName = "The Sign";
  } else {
    songName = songName.split(' ').join('+');
  }
  spotify.search({ type: 'track', query: songName, limit:1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(JSON.stringify(data)); 
  });
}

function getMovie() {
  var movieName = process.argv[3];
  if (movieName === undefined) {
    movieName = 'Mr.+Nobody';
  } else {
    movieName = movieName.split(' ').join('+');
  }

  var queryUrl =
    'http://www.omdbapi.com/?t=' +
    movieName +
    '&y=&plot=short&apikey=' +
    process.env.OMDB_API_KEY;
  console.log(queryUrl);
  request(queryUrl, function(error, response, body) {
    // If the request is successful
    // error first callback
    if (!error && response.statusCode === 200) {
      var movieData = JSON.parse(body);

      // Parse the body of the site
      var data = {
        Title: movieData.Title,
        'Year of release': movieData.Released.split(' ')[2],
        'IMDB Rating': movieData.imdbRating,
        'Rotten Tomatoes Rating': movieData.Ratings[1].Source,
        Country: movieData.Country,
        Language: movieData.Language,
        Plot: movieData.Plot,
        Actors: movieData.Actors
      };

      // display data
      for (var item in data) {
        console.log(`${item}: ${data[item]}`);
      }
    }
  });
}
function obey() {}
