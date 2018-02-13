/*eslint-env es6, node */
'use strict';

const dir = __dirname;
const config = {};

config.path = {
    app: dir,
    template: `${dir}/template`
};

config.defaults = {
    // default base path assumed if none defined
    // in previous initializations, or manual entries
    // of the .modulrc config
    basePath: '/app'
};

module.exports = config;
