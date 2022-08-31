/*eslint-env es6, node */
'use strict';

const config = require('../config');
const Helper = require(`${config.path.app}/helper`);
const Define = require(`${config.path.app}/cmd/define`);
const fs = require('fs');
const path = require('path');
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

        function readdir(dir) {
          fs.readdirSync(dir).forEach((val) => {
              let file = `${dir}/${val}`;

              if (fs.lstatSync(file).isFile()) {
                const body = Helper.readFile(file);
                const tpl = _.template(body);
                const dest = path.normalize(`${info.path}/${val}`);
                log("Creating:", dest.cyan);
                Helper.writeFile(dest, tpl(props));
              } else if (fs.lstatSync(file).isDirectory()) {
                readdir(file);
              }
          });
        }
        readdir(source);
        resolve(true);
    });
    return res;
};

module.exports = App;
