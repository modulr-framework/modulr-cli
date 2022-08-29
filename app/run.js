/*eslint-env es6, node */
'use strict';

const config = require('./config');
const Helper = require(`${config.path.app}/helper`);
const Initialize = require(`${config.path.app}/cmd/init`);
const Define = require(`${config.path.app}/cmd/define`);
const Info = require(`${config.path.app}/cmd/info`);
const Update = require(`${config.path.app}/cmd/update`);
const log = console.log;

module.exports = (cmd, args) => {

    switch (cmd) {
        case 'info':
            Info.get(true);
            break;
        case 'init':
            Initialize.set();
            break;
        case 'define':
            Define.set();
            break;
        case 'update':
            Update.set();
            break;
        case '--version':
            logVersion();
            break;
    }

    function logVersion() {
        const pkg = JSON.parse(Helper.readFile(`${config.path.app}/../package.json`));
        log(`v${pkg.version}`);
    }

};
