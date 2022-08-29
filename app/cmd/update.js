/*eslint-env es6, node */
'use strict';

const config = require('../config');
const Helper = require(`${config.path.app}/helper`);
const Info = require(`${config.path.app}/cmd/info`);
const Init = require(`${config.path.app}/cmd/init`);
const inquirer = require('inquirer');
const colors = require('colors');
const log = console.log;

class Update {

    constructor() {

    }

    set() {

        const info = Info.get();

        if (!info.current) {
            return log('This path currently has no modulr application!');
        }

        log('** Warning: you are about to update this package! Proceed with caution! **'.red);
        Helper.displayInfo(info);

        const currProps = (info.current && info.current.data) ? info.current.data : {};

        Init.getProps('update', currProps).then((props) => {

            if (props.uid) {
                currProps.uid = props.uid;
                updateUId(info, currProps.uid);
            }
        });

        // todo:
        // modify
    }

}

function updateUId(info, uid) {
    const base = info.current.path;
    let paths = Helper.listDir(base);
    console.log(paths);
}

function replaceUId(path, old, uid) {
    log('updating:', path.cyan);
    let content = Helper.readFile(path);
    let re = new RegExp(`(${old})\:`, 'g');
    content = content.replace(re, `${uid}:`);
    Helper.readFile(path, content);
}

module.exports = new Update();
