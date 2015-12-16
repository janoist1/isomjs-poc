'use strict';

var view = require('../resources/views/main/index.hbs');

module.exports = function Index() {
    this.app.render(view, {
        platform: this.isServer ? 'server' : 'client'
    });
};
