#!/usr/bin/env node

'use strict';

var optimist = require('optimist');
var cli = require('../lib/cli.js');

optimist.usage('Create CSS documentation.\nUsage: $0 [cssfile|directory]... [OPTIONS]', {
    'o': {
        'type': 'string',
        'description': 'Output File',
        'alias': 'output',
    },
    't': {
        'type': 'string',
        'description': 'Template File',
        'alias': 'template'
    },
    'v': {
        'type': 'boolean',
        'description': 'Prints the current compiler version',
        'alias': 'version'
    },
    'w': {
        'type': 'boolean',
        'description': 'Watch source and template files for changes and automatically rebuild',
        'alias': 'watch'
    },
    'h': {
        'type': 'boolean',
        'description': 'Outputs this message',
        'alias': 'help'
    }
}).wrap(120);

var argv = optimist.argv;

if (argv.h || argv.help || argv._.length === 0) {
    optimist.showHelp();
} else {
    cli.run({
        files: argv._,
        template: argv.t || argv.template,
        output: argv.o || argv.output,
        watch: argv.w || argv.watch
    });
}
