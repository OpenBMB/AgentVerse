/**
 * @fileoverview ajax utility definition
 * @author lakenen
 */

Crocodoc.addUtility('ajax', function (framework) {

    'use strict';

    var util = framework.getUtility('common'),
        support = framework.getUtility('support'),
        urlUtil = framework.getUtility('url');

    /**
     * Creates a request object to call the success/fail handlers on
     * @param {XMLHttpRequest} req The request object to wrap
     * @returns {Object} The request object
     * @private
     */
    function createRequestWrapper(req) {
        var status,
            statusText,
            responseText;
        try {
            status = req.status;
            statusText = req.statusText;
            responseText = req.responseText;
        } catch (e) {
            status = 0;
            statusText = '';
            responseText = null;
        }
        return {
            status: status,
            statusText: statusText,
            responseText: responseText,
            rawRequest: req
        };
    }

    /**
    * Returns true if the url is referencing a local file
    * @param   {string}  url The URL
    * @param   {Boolean}
    */
    function isRequestToLocalFile(url) {
        return urlUtil.parse(url).protocol === 'file:';
    }

    /**
     * Return true if the given status code looks successful
     * @param   {number}  status The http status code
     * @returns {Boolean}
     */
    function isSuccessfulStatusCode(status) {
        return status >= 200 && status < 300 || status === 304;
    }

    /**
     * Parse AJAX options
     * @param   {Object} options The options
     * @returns {Object}         The parsed options
     */
    function parseOptions(options) {
        options = util.extend(true, {}, options || {});
        options.method = options.method || 'GET';
        options.headers = options.headers || [];
        options.data = options.data || '';

        if (typeof options.data !== 'string') {
            options.data = $.param(options.data);
            if (options.method !== 'GET') {
                options.data = options.data;
                options.headers.push(['Content-Type', 'application/x-www-form-urlencoded']);
            }
        }
        return options;
    }

    /**
     * Set XHR headers
     * @param {XMLHttpRequest} req The request object
     * @param {Array} headers      Array of headers to set
     */
    function setHeaders(req, headers) {
        var i;
        for (i = 0; i < headers.length; ++i) {
            req.setRequestHeader(headers[i][0], headers[i][1]);
        }
    }

    /**
     * Make an XHR request
     * @param   {string}   url     request URL
     * @param   {string}   method  request method
     * @param   {*}        data    request data to send
     * @param   {Array}    headers request headers
     * @param   {Function} success success callback function
     * @param   {Function} fail    fail callback function
     * @returns {XMLHttpRequest}   Request object
     * @private
     */
    function doXHR(url, method, data, headers, success, fail) {
        var req = support.getXHR();
        req.open(method, url, true);
        req.onreadystatechange = function () {
            var status;
            if (req.readyState === 4) { // DONE
                // remove the onreadystatechange handler,
                // because it could be called again
                // @NOTE: we replace it with a noop function, because
                // IE8 will throw an error if the value is not of type
                // 'function' when using ActiveXObject
                req.onreadystatechange = function () {};

                try {
                    status = req.status;
                } catch (e) {
                    // NOTE: IE (9?) throws an error when the request is aborted
                    fail(req);
                    return;
                }

                // status is 0 for successful local file requests, so assume 200
                if (status === 0 && isRequestToLocalFile(url)) {
                    status = 200;
                }

                if (isSuccessfulStatusCode(status)) {
                    success(req);
                } else {
                    fail(req);
                }
            }
        };
        setHeaders(req, headers);
        req.send(data);
        return req;
    }

    /**
     * Make an XDR request
     * @param   {string}   url     request URL
     * @param   {string}   method  request method
     * @param   {*}        data    request data to send
     * @param   {Function} success success callback function
     * @param   {Function} fail    fail callback function
     * @returns {XDomainRequest} Request object
     * @private
     */
    function doXDR(url, method, data, success, fail) {
        var req = support.getXDR();
        try {
            req.open(method, url);
            req.onload = function () { success(req); };
            // NOTE: IE (8/9) requires onerror, ontimeout, and onprogress
            // to be defined when making XDR to https servers
            req.onerror = function () { fail(req); };
            req.ontimeout = function () { fail(req); };
            req.onprogress = function () {};
            req.send(data);
        } catch (e) {
            return fail({
                status: 0,
                statusText: e.message
            });
        }
        return req;
    }

    return {
        /**
         * Make a raw AJAX request
         * @param   {string}     url               request URL
         * @param   {Object}     [options]         AJAX request options
         * @param   {string}     [options.method]  request method, eg. 'GET', 'POST' (defaults to 'GET')
         * @param   {Array}      [options.headers] request headers (defaults to [])
         * @param   {*}          [options.data]    request data to send (defaults to null)
         * @param   {Function}   [options.success] success callback function
         * @param   {Function}   [options.fail]    fail callback function
         * @returns {XMLHttpRequest|XDomainRequest} Request object
         */
        request: function (url, options) {
            var opt = parseOptions(options),
                method = opt.method,
                data = opt.data,
                headers = opt.headers;

            if (method === 'GET' && data) {
                url = urlUtil.appendQueryParams(url, data);
                data = '';
            }

            /**
             * Function to call on successful AJAX request
             * @returns {void}
             * @private
             */
            function ajaxSuccess(req) {
                if (util.isFn(opt.success)) {
                    opt.success.call(createRequestWrapper(req));
                }
                return req;
            }

            /**
             * Function to call on failed AJAX request
             * @returns {void}
             * @private
             */
            function ajaxFail(req) {
                if (util.isFn(opt.fail)) {
                    opt.fail.call(createRequestWrapper(req));
                }
                return req;
            }

            // is XHR supported at all?
            if (!support.isXHRSupported()) {
                return opt.fail({
                    status: 0,
                    statusText: 'AJAX not supported'
                });
            }

            // cross-domain request? check if CORS is supported...
            if (urlUtil.isCrossDomain(url) && !support.isCORSSupported()) {
                // the browser supports XHR, but not XHR+CORS, so (try to) use XDR
                return doXDR(url, method, data, ajaxSuccess, ajaxFail);
            } else {
                // the browser supports XHR and XHR+CORS, so just do a regular XHR
                return doXHR(url, method, data, headers, ajaxSuccess, ajaxFail);
            }
        },

        /**
         * Fetch an asset, retrying if necessary
         * @param {string} url      A url for the desired asset
         * @param {number} retries  The number of times to retry if the request fails
         * @returns {$.Promise}     A promise with an additional abort() method that will abort the XHR request.
         */
        fetch: function (url, retries) {
            var req,
                aborted = false,
                ajax = this,
                $deferred = $.Deferred();

            /**
             * If there are retries remaining, make another attempt, otherwise
             * give up and reject the deferred
             * @param   {Object} error The error object
             * @returns {void}
             * @private
             */
            function retryOrFail(error) {
                if (retries > 0) {
                    // if we have retries remaining, make another request
                    retries--;
                    req = request();
                } else {
                    // finally give up
                    $deferred.reject(error);
                }
            }

            /**
             * Make an AJAX request for the asset
             * @returns {XMLHttpRequest|XDomainRequest} Request object
             * @private
             */
            function request() {
                return ajax.request(url, {
                    success: function () {
                        var retryAfter,
                            req;

                        if (!aborted) {
                            req = this.rawRequest;
                            // check status code for 202
                            if (this.status === 202 && util.isFn(req.getResponseHeader)) {
                                // retry the request
                                retryAfter = parseInt(req.getResponseHeader('retry-after'));
                                if (retryAfter > 0) {
                                    setTimeout(request, retryAfter * 1000);
                                    return;
                                }
                            }
                            if (this.responseText) {
                                $deferred.resolve(this.responseText);
                            } else {
                                // the response was empty, so consider this a
                                // failed request
                                retryOrFail({
                                    error: 'empty response',
                                    status: this.status,
                                    resource: url
                                });
                            }
                        }
                    },
                    fail: function () {
                        if (!aborted) {
                            retryOrFail({
                                error: this.statusText,
                                status: this.status,
                                resource: url
                            });
                        }
                    }
                });
            }

            req = request();
            return $deferred.promise({
                abort: function() {
                    aborted = true;
                    req.abort();
                }
            });
        }
    };
});
