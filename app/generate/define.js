/*eslint-env es6, node */
'use strict';

const config = require('../config');
const Helper = require(`${config.path.app}/helper`);
const Define = require(`${config.path.app}/cmd/define`);
const colors = require('colors');
const _ = require('lodash');
const log = console.log;

const App = (info, props) => {

    const source = `${config.path.template}/define.js`;

    const res = new Promise((resolve, reject) => {
        const dest = `${props.dest}/${props.filename}.js`;
        const tpl = _.template(Helper.readFile(source));
        log("Creating:", dest.cyan);
        Helper.writeFile(dest, tpl(props));
    });
    return res;
};

module.exports = App;
