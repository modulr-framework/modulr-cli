/*eslint-env es6, node */
'use strict';

const config = require('../config');
const Helper = require(`${config.path.app}/helper`);
const Define = require(`${config.path.app}/cmd/define`);
const recursive = require('recursive-readdir');
const colors = require('colors');
const _ = require('lodash');
const log = console.log;

const App = (info, props) => {

    // /default for now
    const source = `${config.path.template}/default`;

    const res = new Promise((resolve, reject) => {
        if (!Helper.isPathExists(source)) {
            return resolve(false);
        }
        recursive(source, (err, files) => {
            // Files is an array of filename
            files.forEach((file) => {
                const body = Helper.readFile(file);
                const path = file.replace(source, "");
                const tpl = _.template(body);
                const dir = path.slice(0, path.lastIndexOf("/"));
                const dest = info.path + path;
                log("Creating:", dest.cyan);
                Helper.writeFile(dest, tpl(props));
            });
            resolve(true);
        });
    });
    return res;
};

module.exports = App;
