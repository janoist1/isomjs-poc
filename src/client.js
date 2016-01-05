'use strict';

var App = require('./app/app'),
    Router = require('./service/router'),
    state = window.appState || {};

var app = new App(new Router(false), document, state);

/**
 * Load DOM events (attach click event listeners for links)
 */
function loadDOMEvents() {
    if (document === undefined) {
        console.log('error: document is undefined'); // todo: throw an exception instead
        return;
    }

    // intercept click events on links
    document.addEventListener('click', function (e) {
        var el = e.target;
        var dataset = el && el.dataset;

        if (el && el.nodeName === 'A' && (dataset.passThru == null || dataset.passThru === 'false')) {
            app.router.setRoute(el.attributes.href.value);
            e.preventDefault();
            return false;
        }
    }, false);
}

window.onload = function () {
    loadDOMEvents();
};
