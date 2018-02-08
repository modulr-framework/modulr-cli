/*eslint-env es6, node */
'use strict';

const config = require('../config');
const Helper = require(`${config.path.app}/helper`);
const Define = require(`${config.path.app}/cmd/define`);
const GenerateTemplate = require(`${config.path.app}/generate/template`);
const Info = require(`${config.path.app}/cmd/info`);
const inquirer = require('inquirer');
const colors = require('colors');
const log = console.log;

class Initialize {

    constructor() {

    }

    set() {

        const info = Info.get();

        // if (info.current) {
        //     log('** Cannot initialize, this path currently has an initialization **'.red);
        //     return Helper.displayInfo(info);
        // }

        this.getProps().then((props) => {

            props = Object.assign({}, props, {
                baseDomain: ((domain) => {
                    let res = `'//' + window.location.host`;
                    if (domain) {
                        res = Helper.setBaseDomain(domain);
                        res = `"${res}"`;
                    }
                    return res;
                })(props.baseDomain),
                baseUrl: props.baseUrl || '[BASE_URL_REQUIRED]',
                basePath: '/app'
            });

            GenerateTemplate(info, props).then(() => {
                const appBaseFolder = info.path + props.basePath;
                log('Creating app base folder:', appBaseFolder.cyan);
                Helper.createDir(appBaseFolder);
                Define.set({
                    uid: props.uid,
                    filename: 'main',
                    dest: appBaseFolder
                }, true);
            });
        });
    }

    getProps() {

        const questions = [
            {
                type: 'input',
                name: 'uid',
                message: 'Enter the unique Id:',
                validate: (val) => {
                    if (!val) { return 'Can\'t be empty'; }
                    let invalid = val.match(/[^A-Za-z0-9_\-\.]+/);
                    let ret;
                    if (invalid) {
                        ret = `Character not allowed: ${invalid[0]}`;
                    } else {
                        ret = true;
                    }
                    return ret;
                }
            },
            {
                type: 'input',
                name: 'baseDomain',
                message: 'Enter the app base url domain (optional):',
                validate: (val) => {
                    let ret = true;
                    if (val) {
                        if (!Helper.validateUrl(val)) {
                            ret = [
                                'Invalid path.. needs to start with a protocol, //, or relative path.',
                                'Example:',
                                '  https://www.mybasedomain.com',
                                '  //www.mybasedomain.com'
                            ].join('\n');
                        }
                    }
                    return ret;
                }
            },
            {
                type: 'input',
                name: 'baseUrl',
                message: 'Enter the app base pathname (optional):',
                validate : (val) => {
                    let ret = true;
                    if (val) {
                        // cannot start with a protocol
                        if (Helper.validateUrl(val)) {
                            ret = desc();
                        } else if (!/^\//.test(val)) {
                            ret = desc();
                        }
                    }
                    function desc() {
                        let res = [
                            'Invalid entry.. needs to be a relative path to your url domain.',
                            'Example:',
                            '  /path/to/my-app'
                        ].join('\n');
                        return res;
                    }
                    return ret;
                }
            },
            {
                type: 'input',
                name: 'masterFile',
                message: 'Enter the master file path (optional):',
                validate: (val) => {
                    let ret = true;
                    if (val) {
                        if (!Helper.validateUrl(val)) {
                            // invalid but not a relative path
                            if (!/^\//.test(val)) {
                                ret = desc();
                            }
                        } else if (!/^\//.test(val)) {
                            ret = desc();
                        }
                    }
                    function desc() {
                        let res = [
                            'Invalid path.. needs to start with a protocol, //, or relative path.',
                            'Example:',
                            '  https://www.mybasedomain.com/path/to/master/file.js',
                            '  /path/to/master/file.js'
                        ].join('\n');
                        return res;
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
