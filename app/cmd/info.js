/*eslint-env es6, node */
'use strict';

const config = require('../config');
const Helper = require(`${config.path.app}/helper`);
const log = console.log;

class Initialize {

    constructor() {

    }

    get(display) {

        const path = Helper.shellCmd('pwd -P');

        const info = {
            path: path
        };

        // check for existing modulr
        const configFile = Helper.getConfigPath(path);
        if (configFile) {
            const confData = JSON.parse(Helper.readFile(configFile));
            const appPath = configFile.replace(/\/\.modulrc$/, '');
            const confBasePath = confData.basePath || config.defaults.basePath;

            // get information
            info.current = {
                // uid
                uid: confData.uid,
                // the path to the instance
                path: appPath,
                // the path to the instance base application folder
                baseAppPath: appPath + ((!/^\//.test(confBasePath)) ? '/' : '') + confBasePath,
                data: confData
            };
        }

        if (display) {
            Helper.displayInfo(info);
        }

        return info;
    }



}

module.exports = new Initialize;
