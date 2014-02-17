Snake
=====

Classic snake game written in JavaScript. Uses [knockout.js](http://knockoutjs.com) and [require.js](http://requirejs.org). Also uses [Hammer.js](eightmedia.github.io/hammer.js/) for gestures on devices with touchscreens.

![snake screencast](http://i.imgur.com/89WuGNq.gif)

Click [here to try it](http://steinerize.com/snake). Use arrow keys to move if you are on a desktop computer, or swipe gestures if you are on a mobile device.

Tested on
---------

* Chrome 32, Firefox 27 on Ubuntu 13.10
* IE9 on Windows 7
* Chrome 32, Browser (Chrome 30) on Android 4.4 (Nexus 4)
* Chrome 32 on iOS 6 (iPhone 4)

Drag/swipe gestures are sometimes not regstered by Chrome on Android devices and that's most probably because of [this bug](https://code.google.com/p/chromium/issues/detail?id=152913).

Cloning and setting up
----------------------

Prerequisites: [npm](https://www.npmjs.org/) and [bower](http://bower.io/) installed globally or their location must be added to the `$PATH` environment variable.

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

You can also run the tests by typing `make test`. This will use [mocha-phantomjs](https://www.npmjs.org/package/mocha-phantomjs) as the test runner.

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
