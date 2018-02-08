/*eslint-env es6, node */
'use strict';

const config = require('./config');
const Helper = require(`${config.path.app}/helper`);
const Initialize = require(`${config.path.app}/cmd/init`);
const Define = require(`${config.path.app}/cmd/define`);
const Info = require(`${config.path.app}/cmd/info`);
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
    }



};
