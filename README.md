Snake
=====

Classic snake game written in javascript using [knockout.js](http://knockoutjs.com) and [require.js](http://requirejs.org). Tested on Chrome 32.

![snake screencast](http://i.imgur.com/89WuGNq.gif)

Click [here to try it](http://steinerize.com/snake).

Cloning and setting up
----------------------

Prerequisites: [bower](http://bower.io/) and a HTTP server of your choice. In this example [http-server](https://www.npmjs.org/package/http-server) available via [npm](https://www.npmjs.org/) will be used.

```bash
# clone the repository
git clone https://github.com/jeremija/snake.git
cd snake
# install bower and npm dependencies
bower install
npm install
# start the server
make server
```

Now you should be able to navigate to [http://localhost:8080/src/index.html](http://localhost:8080/src/index.html) in your browser.

Testing
-------

Follow the setting up guide, open your browser and navigate to [http://localhost:8080/test/test.html](http://localhost:8080/test/test.html).

Building
--------

```bash
# install dependencies if not already
npm install
bower install
# initiate build
make
```

and a `./dist` folder should be created.

If you wish to build the documentation, run:

```bash
make docs
```

This should create a new folder: `./docs`.

License
-------
MIT license.
