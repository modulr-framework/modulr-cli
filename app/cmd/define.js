/*eslint-env es6, node */
'use strict';

const config = require('../config');
const Helper = require(`${config.path.app}/helper`);
const GenerateDefine = require(`${config.path.app}/generate/define`);
const Info = require(`${config.path.app}/cmd/info`);
const inquirer = require('inquirer');
const log = console.log;
const _ = require('lodash');

class Initialize {

    constructor() {

    }

    set(props, initialization) {
        props = props || {};
        const info = Info.get();

        // check if this is a modulr application path
        if (!info.current) {
            log('** Cannot create a module **'.red);
            log('This path currently has no initialization!');
            return Helper.displayInfo(info);
        }

        const res = new Promise((resolve,reject) => {
            // from initialize command
            if (initialization) {
                next();
            } else {
                // check whether this is a path after the base application path
                if (getDefinePath(info.path) === null) {
                    log('** Cannot define a module **'.red);
                    log('Looks like you are not on the application base path..');
                    log('You can only define modules inside the base application folder..');
                    log('* Your current folder path :', info.path.red);
                    log('* Base application folder  :', info.current.baseAppPath.cyan);
                    resolve(false);
                } else {
                    this.getProps(info).then(next);
                }
            }

            function next(vals) {
                props = (vals) ? Object.assign({}, props, vals) : props;
                // set module definition path
                props.definePath = getDefinePath(props.dest || info.path).replace(/^(\/)+/, '');
                // set uid
                props.uid = (!props.uid) ? info.current.uid : props.uid;
                // destination folder
                props.dest = (!props.dest) ? info.path : props.dest;
                // module path
                props.modulePath = (props.definePath) ? ([props.definePath, props.filename].join('/')) : props.filename;
                GenerateDefine(info, props).then(resolve);
            }
        });

        function getDefinePath(dest) {
            return (dest.indexOf(info.current.baseAppPath) > -1) ? dest.replace(info.current.baseAppPath, '') : null;
        }

        return res;
    }

    getProps(info) {
        const questions = [
            {
                type: 'input',
                name: 'filename',
                message: 'Enter module name:',
                validate: (val) => {
                    if (!val) { return 'Can\'t be empty'; }
                    let invalid = val.match(/[^A-Za-z0-9_\-\.]+/);
                    let ret;
                    if (invalid) {
                        ret = `Character not allowed: ${invalid[0]}`;
                    } else {
                        ret = true;
                    }

                    // make sure there are no existing file
                    if (ret) {
                        if (Helper.isFileExists(`${info.path}/${val}.js`)) {
                            ret = `Filename ${val}.js already exists in this path!`;
                        }
                    }
                    return ret;
                }
            }
        ];

        const res = new Promise((resolve, reject) => {
            inquirer.prompt(questions).then(answers => {
                resolve(answers);
            });
        });
        return res;
    }


}

module.exports = new Initialize;
