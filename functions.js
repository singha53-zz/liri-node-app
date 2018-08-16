function getTweets(client) {
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

function getSong(spotify, options) {
  var songName = options;

  if (songName === '') {
    songName = 'The Sign';
  } else {
    songName = songName.split(' ').join('+');
  }

  spotify.search({ type: 'track', query: songName, limit: 1 }, function(
    err,
    data
  ) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    var data = {
      'Artists(s)': data.tracks.items[0].artists.map(d => {
        return d.name;
      }),
      "Song's name": data.tracks.items[0].name,
      'Preview link': data.tracks.items[0].preview_url,
      Album: data.tracks.items[0].album.name
    };

    // display data
    console.log('----------------------');
    console.log('----------------------');
    for (var item in data) {
      console.log(`${item}:`);
      console.log(`${data[item]}`);
      console.log('----------------------');
      console.log('----------------------');
    }
  });
}

function getMovie(request, options) {
  var movieName = options;

  if (movieName === '') {
    movieName = 'Mr.+Nobody';
  } else {
    movieName = movieName.split(' ').join('+');
  }

  var queryUrl =
    'http://www.omdbapi.com/?t=' +
    movieName +
    '&y=&plot=short&apikey=' +
    process.env.OMDB_API_KEY;

  request(queryUrl, function(error, response, body) {
    // If the request is successful
    // error first callback
    if (!error && response.statusCode === 200) {
      
      var movieData = JSON.parse(body);
      if (movieData.hasOwnProperty('Error')) {
        console.log(movieData.Error);
      } else {
        // Check if rotten tomatoes rating exists
        var rottenTomatoes;
        if (movieData.Ratings[1] === undefined) {
          rottenTomatoes = 'No rating available';
        } else {
          rottenTomatoes = movieData.Ratings[1].Value;
        }

        // Parse the body of the site
        var data = {
          Title: movieData.Title,
          'Year of release': movieData.Released.split(' ')[2],
          'IMDB Rating': movieData.imdbRating,
          'Rotten Tomatoes Rating': rottenTomatoes,
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
    } else {
      console.log(error);
    }
  });
}
function obey() {}

module.exports = {
  getTweets: getTweets,
  getSong: getSong,
  getMovie: getMovie,
  obey: obey
};
