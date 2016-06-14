'use strict';

var fs = require('fs');
var path = require('path');
var stylescribe = require('stylescribe');
var log = require('./log');
var minify = require('./minify').minifyHtml;


function loadFile(filepath) {
    if (!fs.existsSync(filepath)) {
        log.error(new Error('"' + filepath + '" not found.'));
        process.exit();
    }
    return fs.readFileSync(filepath).toString();
}


function mergeTrees(src, dest) {
    var prop;

    for (prop in src) {
        if (dest[prop]) {
            if (Array.isArray(dest[prop])) {
                dest[prop] = dest[prop].concat(src[prop])
            } else if (typeof dest[prop] === 'string') {
                dest[prop] += src[prop];
            }
        } else {
            dest[prop] = src[prop];
        }
    }
}


module.exports.reportVerson = function() {
    log.write('cli: v' + require('../package.json').version);
    log.write('stylescribe: v' + stylescribe.version);
}


module.exports.run = function(options) {
    var outputPath = options.output || 'build.html';
    var templatePath = options.template || path.resolve(__dirname, '../templates/default.html.hbs');
    
    function build() {
        var template = loadFile(templatePath);
        var document = {};
        var error;
        
        options.files.forEach(function (file) {
            if (error) {
                return;
            }
            var cssText = loadFile(file);
            var tree;

            try {
                tree = stylescribe.parse(cssText);
                // Add `css` key to the document so we can embed it in 
                // a <style> tag when rendering the template
                tree.css = cssText;
                
                mergeTrees(tree, document);
            } catch (e) {
                e.fileName = file;
                error = e;
            }
        });
        
        if (error) {
            if (error instanceof stylescribe.ParserError) {
                log.error(error);
            } else {
                throw error;
                process.exit();
            }
        } else {
            fs.writeFile(outputPath, minify(stylescribe.renderDocument(document, template)));
            log.notice('Document compiled successfully.');
        }
    }

    build();

    if (options.watch) {
        options.files.forEach(function (file) {
            fs.watch(file, build);
        });
        fs.watch(templatePath, build);
    }

};
