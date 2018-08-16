// show your last 20 tweets and when they were created at in your terminal/bash window
function getTweets(client) {
  var params = {
    q: '#nodejs',
    screen_name: 'asingh_22g',
    count: 20,
    result_type: 'recent',
    lang: 'en'
  };
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

// This will show the following information about the song in your terminal/bash window
//      * Artist(s)
//      * The song's name
//      * A preview link of the song from Spotify
//      * The album that the song is from
function getSong(spotify, options) {
  var songName = options;

  if (songName === '') {
    songName = 'The+Sign';
  } else {
    songName = songName.split(' ').join('+');
  }
  console.log(songName);

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

// * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
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

// run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`
function runCommandInFile(spotify, fs) {
  fs.readFile("random.txt", "utf8", function(error, data){
    getSong(spotify, data.split(",")[1])
  })
}

module.exports = {
  getTweets: getTweets,
  getSong: getSong,
  getMovie: getMovie,
  runCommandInFile: runCommandInFile
};
