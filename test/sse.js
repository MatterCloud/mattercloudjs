'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');
var EventSource = require('eventsource');

const options = {
    api_key: '',
    // api_url: 'http://localhost:3000',
    // api_url: 'https://api.mattercloud.net',
};

describe('#sse', () => {
    // Todo
    /*it('listen to events', async () => {
        var es = new EventSource('http://localhost:8081/stream');

        es.onmessage = function (event) {
            console.log('event', event);
        };

        es.addEventListener('any', function (event) {
            console.log('eventName', eventName, event);
        });
    });*/
});

