var cfg = require('../dummyserver-config');
var httpinvoke = require('../httpinvoke-node');

describe('"err" argument in "finished" callback', function() {
    this.timeout(10000);
    cfg.eachBase(function(postfix, url, crossDomain) {
        it('is set to the same error that input converter threw' + postfix, function(done) {
            var err = new Error();
            httpinvoke(url, 'POST', {
                inputType: 'foobar',
                input: '',
                converters: {
                    'foobar text': function() {
                        throw err;
                    }
                }
            }, function(_err) {
                if(typeof err !== 'object' || err === null || !(err instanceof Error)) {
                    return done(new Error('error was not received'));
                }
                if(_err !== err) {
                    return done(new Error('expected the error to be the same as thrown by converter, but received: ' + err.message));
                }
                done();
            });
        });
        it('is set to the same error that output converter threw' + postfix, function(done) {
            var err = new Error();
            httpinvoke(url, {
                outputType: 'foobar',
                converters: {
                    'text foobar': function() {
                        throw err;
                    }
                }
            }, function(_err) {
                if(typeof err !== 'object' || err === null || !(err instanceof Error)) {
                    return done(new Error('error was not received'));
                }
                if(_err !== err) {
                    return done(new Error('expected the error to be the same as thrown by converter, but received: ' + err.message));
                }
                done();
            });
        });
        it('is set to Error("abort") when abort is called' + postfix, function(done) {
            var abort = httpinvoke(url, function(err) {
                if(typeof err !== 'object' || err === null || !(err instanceof Error)) {
                    return done(new Error('error was not received'));
                }
                if(err.message !== 'abort') {
                    return done(new Error('expected message to be "abort", but got: ' + err.message));
                }
                done();
            });
            abort();
        });
        if(httpinvoke.cors) {
            it('is set to Error("network error") when url is not reachable' + postfix, function(done) {
                httpinvoke('http://non-existant.url/foobar', 'GET', function(err) {
                    if(typeof err !== 'object' || err === null || !(err instanceof Error)) {
                        return done(new Error('error was not received'));
                    }
                    if(err.message !== 'network error') {
                        return done(new Error('expected message to be "network error", but got: ' + err.message));
                    }
                    done();
                });
            });
        }
        it('is set to Error("network error") when connection ends before sending headers' + postfix, function(done) {
            httpinvoke(url + 'immediateEnd', 'GET', {
                finished: function(err) {
                    if(typeof err !== 'object' || err === null || !(err instanceof Error)) {
                        return done(new Error('error was not received'));
                    }
                    if(err.message !== 'network error') {
                        return done(new Error('expected message to be "network error", but got: ' + err.message));
                    }
                    done();
                }
            });
        });
        it('is set to Error("network error") when connection ends after sending headers' + postfix, function(done) {
            httpinvoke(url + 'endAfterHeaders', 'GET', {
                finished: function(err) {
                    if(typeof err !== 'object' || err === null || !(err instanceof Error)) {
                        return done(new Error('error was not received'));
                    }
                    if(err.message !== 'network error') {
                        return done(new Error('expected message to be "network error", but got: ' + err.message));
                    }
                    done();
                }
            });
        });
    });
});
