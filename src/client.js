'use strict';

var App = require('./app/app'),
    Router = require('./service/router'),
    state = window.appState || {};

window.onload = function () {
    new App(new Router(false), document, state).startClient();
};
