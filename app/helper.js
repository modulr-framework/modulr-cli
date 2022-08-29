/*eslint-env es6, node */
'use strict';

const CLIHelper = require('cli-helper').constructor;
const colors = require('colors');
const log = console.log;
const fs = require('fs');

class Helper extends CLIHelper {

    constructor() {
        super();
    }

    getConfigPath(currDir) {
        const self = this;
        let done = false;
        let ret = null;

        while (!done) {
            let cpath = `${currDir}/.modulrc`;
            if (!self.isFileExists(cpath)) {
                // one level down
                let sp = currDir.split('/');
                sp.pop();
                if (sp.length === 0) {
                    done = true;
                } else {
                    currDir = sp.join('/');
                }
            } else {
                ret = cpath;
                done = true;
            }
        }
        return ret;

    }

    displayInfo(info) {
        const configFile = (info.current) ? true : false;
        log('*********************************'.grey);
        log('Current path information:'.green);
        log('* Current path:', info.path.cyan);
        log('* Initialized:', ((configFile) ? 'yes' : 'no').cyan);
        if (configFile) {
            log('* Application path:', info.current.path.cyan);
            log('* Application base folder:', info.current.baseAppPath.cyan);
            log('* Coniguration Details:');
            for (let id in info.current.data) {
                log(`  - ${id} =`, ('' + info.current.data[id]).cyan );
            }
        }
        log('*********************************'.grey);
    }

    setBaseDomain(val) {
        if (!this.validateUrl(val)) {
            val = `//${val}`;
        }
        return val;
    }

    validateUrl(val) {
        let res = true;
        // if it does not start with a protocol
        if (!/^http(|s)\:\/\//i.test(val)) {
            // if doesn not start with proper protocol-less //
            if (!/^\/\//.test(val)) {
                res = false;
            }
        }
        return res;
    }

    listDir(path) {
        const self = this;

        let files = [];
        let paths = [];

        fs.readdir(path, function(err, items) {
            items.forEach((val) => {
                if (self.isFileExists(val)) {
                    if (/\.js$/i.test(val)) {
                        files.push(val);
                    }
                } else if (self.isPathExists(val)) {
                    paths.push(val);
                }
            });
        });

        return {
            files: files,
            paths: paths
        };
    }
}

module.exports = new Helper;
