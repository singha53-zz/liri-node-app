# liri-node-app

A command line interface application using nodeJS, LIRI: LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

## Installing

```shell
$ git clone https://github.com/singha53/node-liri-app.git
$ cd node-liri-app/
```

## Getting started

1) Return my recent 20 tweets (from @asingh_22g)

```shell
$ node liri.js my-tweets
-----------------------
Fri Jun 22 00:09:43 +0000 2018: RT @DavidFajgenbaum: Excited to see our new @SomaLogic proteomic study on #CastlemanDisease and #TAFRO syndrome published in AJH, revealing…
-----------------------
.
.
.
-----------------------
Wed Nov 22 12:39:42 +0000 2017: @jeremyhirota Lol yes it is. 😀 Congrats on your new CRC @jeremyhirota
-----------------------
```
2a) Search for a song from Spotify (returns artist(s), song's name, song url and albumn)

```shell
$ node liri.js spotify-this-song thriller
----------------------
----------------------
Artists(s):
Michael Jackson
----------------------
----------------------
Song's name:
Thriller
----------------------
----------------------
Preview link:
https://p.scdn.co/mp3-preview/9f288fba4d3380b1ae25e7f88a2054d7fac0bf2d?cid=06eef2ced23844c39eabaa503f3e14d8
----------------------
----------------------
Album:
Scream
----------------------
----------------------
```
2b) default behaviour if no song is inputted

```shell
$ node liri.js spotify-this-song
----------------------
----------------------
Artists(s):
Ace of Base
----------------------
----------------------
Song's name:
The Sign
----------------------
----------------------
Preview link:
https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=06eef2ced23844c39eabaa503f3e14d8
----------------------
----------------------
Album:
The Sign (US Album) [Remastered]
----------------------
----------------------
```

## Scripting/Programming Languages

- HTML, CSS (including Bootstrap), JavaScript (jQuery, Firebase)

## Features

- using Firebase to player game live!
- live messaginng

## Contributing

If you'd like to contribute, please fork the repository and use a feature
branch. Pull requests are warmly welcome.

## Links

Even though this information can be found inside the project on machine-readable
format like in a .json file, it's good to include a summary of most useful
links to humans using your project. You can include links like:

- Game homepage: http://amritsingh.ca/RPS-Multiplayer/
- Repository: https://github.com/singha53/RPS-Multiplayer/

## Licensing

The code in this project is licensed under MIT license.
