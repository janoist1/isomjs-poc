'use strict';

var App = require('./app/app'),
    Router = require('./service/router'),
    state = window.appState || {};

new App(new Router(), document, state).startClient();
