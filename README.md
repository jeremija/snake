Snake
=====

Classic snake game written in javascript using `knockout.js` and `require.js`. Tested on Chrome 32.

Click [here for a preview](http://steinerize.com/snake).

Install
-------

Prerequisites: `bower` and a HTTP server of your choice. In this example `http-server` available via `npm` will be used.

    # clone the repository
    git clone https://github.com/jeremija/snake.git
    cd snake
    # install bower dependencies
    bower install
    cd src/
    # install and run the http-server
    npm install -g http-server
    http-server

Now you should be able to navigate to `http://localhost:8080/src/index.html` in your browser.

Testing
-------

Follow the install guide, open your browser and navigate to `http://localhost:8080/test/test.html`.

Building
--------

    # install requirejs optimizer
    npm install
    # install bower dependencies
    bower install
    # initiate build
    make

A new folder called `/dist` should be created.