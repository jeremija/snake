RJS=node node_modules/.bin/r.js
BROWSER=google-chrome
SERVER=http-server -p 8080

all:
	rm -rf dist/
	mkdir dist/
	mkdir dist/js
	mkdir dist/css

	$(RJS) -o \
		name="../bower/almond/almond" \
		baseUrl="src/js" \
		include="index" \
		mainConfigFile="./src/js/require/config.js" \
		out="dist/js/snake.js" \
		preserveLicenseComments=false

	$(RJS) -o optimizeCss=standard \
		preserveLicenseComments=false \
		cssIn="src/css/style.css" \
		out="dist/css/style.css"

	cp src/index.html dist/index.src.html

	#sed -n '/foo/{:a;N;/bar/!bar;N;s/.*\n/REPLACEMENT\n/};p' file

	sed -e '/SCRIPT START/,/SCRIPT END/c\<script type="text/javascript" src="js/snake.js"></script>' \
		dist/index.src.html > dist/index.html

	rm dist/index.src.html


.PHONY: server
server:
	@echo visit http://localhost:8080/src/index.html to start the app
	@echo visit http://localhost:8080/test/test.html to run the tests
	$(SERVER)