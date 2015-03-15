/* jshint -W020 */
if(typeof window === 'undefined') {
    window = {};
} else {
    global = window;
}

if(typeof location === 'undefined') {
    location = {};
}
/* jshint +W020 */

window._httpinvoke = window.httpinvoke;

// basic
window._cfg = {
    proxyPath: '/dummyserver',
    dummyserverPort: 1337,
    dummyserverPortAlternative: 1338,
    host: location.hostname,
    setCookie: function(cookie) {
        'use strict';
        if(global.document) {
            global.document.cookie = cookie;
        }
    },
    port: Number(location.port) || (location.protocol === 'https:' ? 443 : 80),
    /* # Statuses from RFC 2616
     *
     * ## Not tested statuses, with reasons
     *
     * 100 Continue: technical status, not semantic, irrelevant for practical use
     * 101 Switching Protocols: technical status, not semantic, irrelevant for practical use
     * 205 Reset Content: Roy T. Fielding: "The most common use of 205 is within custom HTTP systems, not browsers.": http://w3-org.9356.n7.nabble.com/p2-deprecating-205-Reset-Content-tp253298p253354.html
     * 401 Unauthorized: Chrome 29.0 throws an authorization dialog, when the mandatory header 'WWW-Authenticate' is set
     * 407 Proxy Authentication Required: not useful, Chrome 29.0 sends "some type" of network error
     * 411 Length Required: Content-Length is always sent by browsers
     * 417 Expectation Failed: the required header 'Expect' is not allowed by browsers
     *
     * ## Statuses that should work, but should not be used, with reasons
     *
     * ### 3XX with Location header set
     *
     * Causes various unexpected behaviors - browsers are supposed to redirect,
     * also Karma test runner proxy failure.
     *
     * ### 3XX without Location header set
     *
     * 301, 302, 303, 307 GET same-origin:
     * - IE 8.0 returns status 12150, which is WinInet error code ERROR_HTTP_HEADER_NOT_FOUND The requested header could not be located
     *
     * 301, 302, 303, 307 POST:
     * - fails ("write EPIPE" error) on node
     *
     * 300, 305 POST:
     * - Karma test runner proxy failure
     *
     * 305 GET:
     * - Opera 12.10 responseText: <HTML><HEAD><TITLE>Redirect to alternative proxy</TITLE></HEAD><BODY>The server tried to redirect Opera to the alternative proxy "". For security reasons this is no longer supported.<BR><BR><HR>Generated by Opera &copy;</BODY></HTML>
     *
     * 300 GET:
     * - Opera 12.10 times out
     *
     * 304 POST:
     * - By RFC2616 impossible
     *
     */
    status: {
        // OK
        '200': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: true
            }]
        },
        // Created
        '201': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: true
            }]
        },
        // Accepted
        '202': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: true
            }]
        },
        // Non-Authoritative Information
        '203': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: true
            }]
        },
        // No Content
        '204': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: false
            }],
            PATCH: [{
                requestEntity: true,
                partialResponse: false,
                responseEntity: false
            }]
        },
        // Partial Content
        '206': {
            GET: [{
                requestEntity: false,
                partialResponse: true,
                responseEntity: true
            }]
        },
        // Not Modified
        '304': {
            GET: [{
                ifModified: true,
                requestEntity: false,
                partialResponse: false,
                responseEntity: false
            }]
        },
        // Bad Request
        '400': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: false
            }]
        },
        // Payment Required
        '402': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: false
            }]
        },
        // Forbidden
        '403': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: false
            }]
        },
        // Not Found
        '404': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: false
            }]
        },
        // Method Not Allowed
        '405': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: false
            }]
        },
        // Not Acceptable
        '406': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: false
            }]
        },
        // Request Timeout
        '408': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: false
            }]
        },
        // Conflict
        '409': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: false
            }]
        },
        // Gone
        '410': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: false
            }]
        },
        // Precondition Failed
        '412': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: false
            }]
        },
        // Request Entity Too Large
        '413': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: false
            }]
        },
        // Request-URI Too Long
        '414': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: false
            }]
        },
        // Unsupported Media Type
        '415': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: false
            }]
        },
        // Requested Range Not Satisfiable
        '416': {
            GET: [{
                requestEntity: false,
                partialResponse: true,
                responseEntity: false
            }]
        },
        // Internal Server Error
        '500': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: false
            }]
        },
        // Not Implemented
        '501': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: false
            }]
        },
        // Bad Gateway
        '502': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: false
            }]
        },
        // Service Unavailable
        '503': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: false
            }]
        },
        // Gateway Timeout
        '504': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: false
            }]
        },
        // HTTP Version Not Supported
        '505': {
            GET: [{
                requestEntity: false,
                partialResponse: false,
                responseEntity: false
            }]
        }
    },
    makeTextFinished: function(done) {
        'use strict';
        var cfg = require('./dummyserver-config');
        return function(err, output) {
            if(err) {
                return done(err);
            }
            if(typeof output !== 'string') {
                return done(new Error('Received output is not a string'));
            }
            if(output !== cfg.textTest()) {
                return done(new Error('Received output ' + output + ' is not equal to expected output ' + cfg.textTest()));
            }
            done();
        };
    },
    makeByteArrayFinished: function(done) {
        'use strict';
        var cfg = require('./dummyserver-config');
        return function(err, output) {
            if(err) {
                return done(err);
            }
            var expected = cfg.bytearrayTest();
            if(typeof output !== 'object' || output === null) {
                return done(new Error('Received output is not a non-null object'));
            }
            if(output.length !== expected.length) {
                return done(new Error('Received output length ' + output.length + ' is not equal to expected output length ' + expected.length));
            }
            var failures = [];
            for(var i = 0; i < output.length; i += 1) {
                if(output[i] !== expected[i]) {
                    failures.push(i + 'th byte: ' + output[i] + ' !== ' + expected[i]);
                }
            }
            if(failures.length > 0) {
                return done(new Error('Some received bytes differ from expected: ' + failures.join(',')));
            }
            done();
        };
    },
    eachBase: function(fn) {
        'use strict';
        var httpinvoke = require('./httpinvoke-node');
        if(httpinvoke.cors) {
            try {
                fn(' (cross-origin)', window._cfg.corsURL, true);
            } catch(_) {
            }
        }
        try {
            fn(' (same-origin)', window._cfg.url, false);
        } catch(_) {
        }
    },
    jsonTest: function() {
        'use strict';
        return [{
            a: 0,
            b: false,
            c: 'false',
            d: null
        }];
    },
    jsonTestPasses: function(json) {
        'use strict';
        if(typeof json !== 'object' || json === null) {
            return false;
        }
        if(!(json instanceof Array)) {
            return false;
        }
        if(typeof json[0] !== 'object' || json === null) {
            return false;
        }
        if(!(json[0] instanceof Object)) {
            return false;
        }
        if(json[0].a !== 0) {
            return false;
        }
        if(json[0].b !== false) {
            return false;
        }
        if(json[0].c !== 'false') {
            return false;
        }
        if(json[0].d !== null) {
            return false;
        }
        return true;
    },
    textTest: function() {
        'use strict';
        return 'ąčęėįšųū„“–ž1234567890-=!@#$%^&*()_+´¬¿,./;[]';
    },
    bytearrayTest: function() {
        'use strict';
        var i, bytes = [];
        for(i = 0; i < 64; i += 1) {
            bytes.push(0);
        }
        for(i = 255; i >= 0; i -= 1) {
            bytes.push(i);
        }
        for(i = 0; i <= 255; i += 1) {
            bytes.push(i);
        }
        return bytes;
    }
};
if(location.protocol === 'app:') {
    window._cfg.host = 'localhost';
    window._cfg.port = window._cfg.dummyserverPort;
}
// generated
window._cfg.corsURL = 'http://' + window._cfg.host + ':' + (window._cfg.port === window._cfg.dummyserverPort ? window._cfg.dummyserverPortAlternative : window._cfg.dummyserverPort) + '/';
window._cfg.url = 'http://' + window._cfg.host + ':' + window._cfg.port + (window._cfg.port === window._cfg.dummyserverPort ? '' : window._cfg.proxyPath) + '/';

window.require = function(module) {
    'use strict';
    if(module === '../dummyserver-config' || module === './dummyserver-config') {
        return window._cfg;
    }
    return window._httpinvoke;
};

if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = window._cfg;
}

if(!global.console) {
    global.console = {
        _log: [],
        log: function() {
            'use strict';
            this._log.push([].slice.call(arguments));
        }
    };
}
