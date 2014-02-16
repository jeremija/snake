#!/usr/bin/env node

/**
 * Replaces the <!-- CUSTOM SNIPPETS --> string in `dist/index.html` and
 * adds the custom snippets found in the same directory.
 *
 * The files should have an extension `.snippet`. The snippets will be appended
 * to inside the <head> tag.
 * @author jeremija
 */
var fs = require('fs');

ROOT = __dirname + '/..';
INDEX_HTML = 'dist/index.html';
INDEX_COMMENT = '<!-- CUSTOM SNIPPETS -->';
SNIPPET_REGEX = /.snippet$/;

var files = fs.readdirSync(__dirname);

// filter snippets
files = files.filter(function(file) {
    return file.match(SNIPPET_REGEX) ? true : false;
});

/**
 * All snippets concatted together
 * @type {String}
 */
var allSnippets = '';

files.forEach(function(file) {
    // read each snippet
    var snippet = fs.readFileSync(__dirname + '/' + file, 'utf8');
    // concat the snippets together
    allSnippets += snippet;
});

console.log('read ' + files.length + ' snippet' + (files.length > 1 ? 's': ''));

var indexFilename = ROOT + '/' + INDEX_HTML;
var indexData = fs.readFileSync(indexFilename, 'utf8');
// check if the comment exists
if (!indexData.match(INDEX_COMMENT)) {
    throw new Error(INDEX_COMMENT + ' not found in ' + indexFilename);
}

// replace the comment with snippets
console.log('replacing ' + INDEX_COMMENT + ' with snippets');
var newIndexData = indexData.replace(INDEX_COMMENT, allSnippets);
// write to disk
console.log('writing to disk...');
fs.writeFileSync(indexFilename, newIndexData, {
    encoding: 'utf8'
});

console.log('snippets replaced in ' + indexFilename);