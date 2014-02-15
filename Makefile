RJS=node node_modules/.bin/r.js
BROWSER=google-chrome
SERVER_PORT=8080
SERVER=http-server -p $(SERVER_PORT)
JSDOC=node node_modules/.bin/jsdoc
JSHINT=node node_modules/.bin/jshint
SOURCE=src/js/**/*.js

.PHONY: all
all: check build

.PHONY: check
check:
	@echo running jshint...
	@$(JSHINT) $(SOURCE)
	@echo jshint reported no errors!

.PHONY: build
build:

	@echo cleaning old directory
	rm -rf dist/
	mkdir dist/
	mkdir dist/js
	mkdir dist/css

	@echo running r.js optimizer for js
	@$(RJS) -o \
		name="../bower/almond/almond" \
		baseUrl="src/js" \
		include="index" \
		mainConfigFile="./src/js/require/config.js" \
		out="dist/js/snake.js" \
		preserveLicenseComments=false

	@echo running r.js optimizer for css
	@$(RJS) -o optimizeCss=standard \
		preserveLicenseComments=false \
		cssIn="src/css/style.css" \
		out="dist/css/style.css"

	@echo copying fonts
	@cp -r src/fonts dist/

	@echo copying index.html
	@cp src/index.html dist/index.src.html

	@echo replacing index.html \<script\> tags
	@sed -e '/SCRIPT START/,/SCRIPT END/c\<script type="text/javascript" src="js/snake.js"></script>' \
		dist/index.src.html > dist/index.html

	@rm dist/index.src.html

	@echo "build successfully finished!"


.PHONY: server
server:
	@echo visit http://localhost:$(SERVER_PORT)/src/index.html to start the app
	@echo visit http://localhost:$(SERVER_PORT)/test/test.html to run the tests
	$(SERVER)

.PHONY: docs
docs:
	rm -rf docs/
	$(JSDOC) -d docs/ src/js/**/*.js
