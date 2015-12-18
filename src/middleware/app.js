'use strict';

var App = require('../app/app'),
    Router = require('../service/router'),
    jsdom = require('jsdom');

// stringify - todo: this needs to be reviewed ..
require('stringify').registerWithRequire({
    extensions: ['.hbs', '.html'],
    minify: false
    //minifier: {
    //    extensions: ['.html'],
    //    options: {
    //        // html-minifier options
    //    }
    //}
});

// load the layout into a "fake" dom
var layout = require('../resources/views/layout.html');
var document = jsdom.jsdom(layout, {});

// create app & pass the dom
var app = new App(new Router(true), document, true);

// make the response object accessible
var response;

// lets send the page content once the content is rendered
app.on('render', function send() {
    console.log('server.send');

    response.status(200).send(jsdom.serializeDocument(document));

    // todo: reset app or pass over a state or do something here :)
});

// export app middleware
module.exports = function (req, res, next) {
    app.router.dispatch(req, res, function (err) {
        if (err == undefined || err) {
            next();
        }
    });

    response = res;
};