#!/usr/bin/env node

const log = console.log;
const App = require('./app/run');
const cmd = process.argv[2];
const cmdArr = ['info', 'init', 'define'];

if (cmd === '--help') {
    log('Commands:', cmdArr.join(', '));
    process.exit(0);
} else if (cmdArr.indexOf(cmd) === -1) {
    log('Enter a command..');
    log('Commands:', cmdArr.join(', '));
    process.exit(1);
}

const args = process.argv.slice(2);

App(cmd, args);
