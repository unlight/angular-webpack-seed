const sixflix = require('sixflix');

if (!global.Promise) {
    global.Promise = require('promise-polyfill');
}

if (!sixflix() || !Object.assign) {
    require.ensure([], () => {
        require('core-js/es6');
        require('./main');
    }, 'es6');
} else {
    require('./main');
}
