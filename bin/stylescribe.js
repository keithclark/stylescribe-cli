#!/usr/bin/env node

'use strict';

var optimist = require('optimist');
var cli = require('../lib/cli.js');

optimist.usage('Usage: $0 [cssfile]... [OPTIONS]', {
    'o': {
        'type': 'string',
        'description': 'Path the output file (default `build.html`)',
        'alias': 'output',
    },
    't': {
        'type': 'string',
        'description': 'Path a custom template file',
        'alias': 'template'
    },
    'w': {
        'type': 'boolean',
        'description': 'Watch source and template files for changes and automatically rebuild',
        'alias': 'watch'
    },
    'v': {
        'type': 'boolean',
        'description': 'Show the stylescribe version information',
        'alias': 'version'
    },
    'h': {
        'type': 'boolean',
        'description': 'Show this message',
        'alias': 'help'
    }
}).wrap(120);

var argv = optimist.argv;

if (argv.v || argv.version) {
    cli.reportVerson();
} else if (argv.h || argv.help || argv._.length === 0) {
    optimist.showHelp();
} else {
    cli.run({
        files: argv._,
        template: argv.t || argv.template,
        output: argv.o || argv.output,
        watch: argv.w || argv.watch
    });
}
