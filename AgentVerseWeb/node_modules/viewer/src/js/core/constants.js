/*jshint unused:false*/

var CSS_CLASS_PREFIX         = 'crocodoc-',
    ATTR_SVG_VERSION         = 'data-svg-version',
    CSS_CLASS_VIEWER         = CSS_CLASS_PREFIX + 'viewer',
    CSS_CLASS_DOC            = CSS_CLASS_PREFIX + 'doc',
    CSS_CLASS_VIEWPORT       = CSS_CLASS_PREFIX + 'viewport',
    CSS_CLASS_LOGO           = CSS_CLASS_PREFIX + 'viewer-logo',
    CSS_CLASS_DRAGGABLE      = CSS_CLASS_PREFIX + 'draggable',
    CSS_CLASS_DRAGGING       = CSS_CLASS_PREFIX + 'dragging',
    CSS_CLASS_TEXT_SELECTED  = CSS_CLASS_PREFIX + 'text-selected',
    CSS_CLASS_TEXT_DISABLED  = CSS_CLASS_PREFIX + 'text-disabled',
    CSS_CLASS_LINKS_DISABLED = CSS_CLASS_PREFIX + 'links-disabled',
    CSS_CLASS_MOBILE         = CSS_CLASS_PREFIX + 'mobile',
    CSS_CLASS_IELT9          = CSS_CLASS_PREFIX + 'ielt9',
    CSS_CLASS_SUPPORTS_SVG   = CSS_CLASS_PREFIX + 'supports-svg',
    CSS_CLASS_WINDOW_AS_VIEWPORT = CSS_CLASS_PREFIX + 'window-as-viewport',
    CSS_CLASS_LAYOUT_PREFIX  = CSS_CLASS_PREFIX + 'layout-',
    CSS_CLASS_CURRENT_PAGE   = CSS_CLASS_PREFIX + 'current-page',
    CSS_CLASS_PRECEDING_PAGE = CSS_CLASS_PREFIX + 'preceding-page',
    CSS_CLASS_PAGE           = CSS_CLASS_PREFIX + 'page',
    CSS_CLASS_PAGE_INNER     = CSS_CLASS_PAGE + '-inner',
    CSS_CLASS_PAGE_CONTENT   = CSS_CLASS_PAGE + '-content',
    CSS_CLASS_PAGE_SVG       = CSS_CLASS_PAGE + '-svg',
    CSS_CLASS_PAGE_TEXT      = CSS_CLASS_PAGE + '-text',
    CSS_CLASS_PAGE_LINK      = CSS_CLASS_PAGE + '-link',
    CSS_CLASS_PAGE_LINKS     = CSS_CLASS_PAGE + '-links',
    CSS_CLASS_PAGE_AUTOSCALE = CSS_CLASS_PAGE + '-autoscale',
    CSS_CLASS_PAGE_LOADING   = CSS_CLASS_PAGE + '-loading',
    CSS_CLASS_PAGE_ERROR     = CSS_CLASS_PAGE + '-error',
    CSS_CLASS_PAGE_VISIBLE   = CSS_CLASS_PAGE + '-visible',
    CSS_CLASS_PAGE_AUTOSCALE = CSS_CLASS_PAGE + '-autoscale',
    CSS_CLASS_PAGE_PREV      = CSS_CLASS_PAGE + '-prev',
    CSS_CLASS_PAGE_NEXT      = CSS_CLASS_PAGE + '-next',
    CSS_CLASS_PAGE_BEFORE    = CSS_CLASS_PAGE + '-before',
    CSS_CLASS_PAGE_AFTER     = CSS_CLASS_PAGE + '-after',
    CSS_CLASS_PAGE_BEFORE_BUFFER = CSS_CLASS_PAGE + '-before-buffer',
    CSS_CLASS_PAGE_AFTER_BUFFER  = CSS_CLASS_PAGE + '-after-buffer',
    PRESENTATION_CSS_CLASSES = [
        CSS_CLASS_PAGE_NEXT,
        CSS_CLASS_PAGE_AFTER,
        CSS_CLASS_PAGE_PREV,
        CSS_CLASS_PAGE_BEFORE,
        CSS_CLASS_PAGE_BEFORE_BUFFER,
        CSS_CLASS_PAGE_AFTER_BUFFER
    ].join(' ');


var VIEWER_HTML_TEMPLATE =
    '<div tabindex="-1" class="' + CSS_CLASS_VIEWPORT + '">' +
        '<div class="' + CSS_CLASS_DOC + '"></div>' +
    '</div>' +
    '<div class="' + CSS_CLASS_LOGO + '"></div>';

var PAGE_HTML_TEMPLATE =
    '<div class="' + CSS_CLASS_PAGE + ' ' + CSS_CLASS_PAGE_LOADING + '" ' +
        'style="width:{{w}}px; height:{{h}}px;" data-width="{{w}}" data-height="{{h}}">' +
        '<div class="' + CSS_CLASS_PAGE_INNER + '">' +
            '<div class="' + CSS_CLASS_PAGE_CONTENT + '">' +
                '<div class="' + CSS_CLASS_PAGE_SVG + '"></div>' +
                '<div class="' + CSS_CLASS_PAGE_AUTOSCALE + '">' +
                    '<div class="' + CSS_CLASS_PAGE_TEXT + '"></div>' +
                    '<div class="' + CSS_CLASS_PAGE_LINKS + '"></div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';

// the width to consider the 100% zoom level; zoom levels are calculated based
// on this width relative to the actual document width
var DOCUMENT_100_PERCENT_WIDTH = 1024;


var ZOOM_FIT_WIDTH = 'fitwidth',
    ZOOM_FIT_HEIGHT = 'fitheight',
    ZOOM_AUTO = 'auto',
    ZOOM_IN = 'in',
    ZOOM_OUT = 'out',

    SCROLL_PREVIOUS = 'previous',
    SCROLL_NEXT = 'next',

    LAYOUT_VERTICAL = 'vertical',
    LAYOUT_VERTICAL_SINGLE_COLUMN = 'vertical-single-column',
    LAYOUT_HORIZONTAL = 'horizontal',
    LAYOUT_PRESENTATION = 'presentation',
    LAYOUT_PRESENTATION_TWO_PAGE = 'presentation-two-page',
    LAYOUT_TEXT = 'text',

    PAGE_STATUS_CONVERTING = 'converting',
    PAGE_STATUS_NOT_LOADED = 'not loaded',
    PAGE_STATUS_LOADING = 'loading',
    PAGE_STATUS_LOADED = 'loaded',
    PAGE_STATUS_ERROR = 'error';


var STYLE_PADDING_PREFIX = 'padding-',
    STYLE_PADDING_TOP = STYLE_PADDING_PREFIX + 'top',
    STYLE_PADDING_RIGHT = STYLE_PADDING_PREFIX + 'right',
    STYLE_PADDING_LEFT = STYLE_PADDING_PREFIX + 'left',
    STYLE_PADDING_BOTTOM = STYLE_PADDING_PREFIX + 'bottom',
    // threshold for removing similar zoom levels (closer to 1 is more similar)
    ZOOM_LEVEL_SIMILARITY_THRESHOLD = 0.95,
    // threshold for removing similar zoom presets (e.g., auto, fit-width, etc)
    ZOOM_LEVEL_PRESETS_SIMILARITY_THRESHOLD = 0.99;


var PAGE_LOAD_INTERVAL = 100, //ms between initiating page loads
    MAX_PAGE_LOAD_RANGE = 32,
    MAX_PAGE_LOAD_RANGE_MOBILE = 8,
    // the delay in ms to wait before triggering preloading after `ready`
    READY_TRIGGER_PRELOADING_DELAY = 1000;

/**
 * Creates a global method for loading svg text into the proxy svg object
 * @NOTE: this function should never be called directly in this context;
 * it's converted to a string and encoded into the proxy svg data:url
 * @returns {void}
 * @private
 */
function PROXY_SVG() {
    'use strict';
    window.loadSVG = function (svgText) {
        var domParser = new window.DOMParser(),
            svgDoc = domParser.parseFromString(svgText, 'image/svg+xml'),
            svgEl = document.importNode(svgDoc.documentElement, true);
        // make sure the svg width/height are explicity set to 100%
        svgEl.setAttribute('width', '100%');
        svgEl.setAttribute('height', '100%');

        if (document.body) {
            document.body.appendChild(svgEl);
        } else {
            document.documentElement.appendChild(svgEl);
        }
    };
}

// @NOTE: MAX_DATA_URLS is the maximum allowed number of data-urls in svg
// content before we give up and stop rendering them
var SVG_MIME_TYPE = 'image/svg+xml',
    HTML_TEMPLATE = '<style>html,body{width:100%;height:100%;margin:0;overflow:hidden;}</style>',
    SVG_CONTAINER_TEMPLATE = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"><script><![CDATA[('+PROXY_SVG+')()]]></script></svg>',

    // Embed the svg in an iframe (initialized to about:blank), and inject
    // the SVG directly to the iframe window using document.write()
    // @NOTE: this breaks images in Safari because [?]
    EMBED_STRATEGY_IFRAME_INNERHTML = 1,

    // Embed the svg with a data-url
    // @NOTE: ff allows direct script access to objects embedded with a data url,
    //        and this method prevents a throbbing spinner because document.write
    //        causes a spinner in ff
    // @NOTE: NOT CURRENTLY USED - this breaks images in firefox because:
    //        https://bugzilla.mozilla.org/show_bug.cgi?id=922433
    EMBED_STRATEGY_DATA_URL = 2,

    // Embed the svg directly in html via inline svg.
    // @NOTE: NOT CURRENTLY USED -  seems to be slow everywhere, but I'm keeping
    //        this here because it's very little extra code, and inline SVG might
    //        be better some day?
    EMBED_STRATEGY_INLINE_SVG = 3,

    // Embed the svg directly with an object tag; don't replace linked resources
    // @NOTE: NOT CURRENTLY USED - this is only here for testing purposes, because
    //        it works in every browser; it doesn't support query string params
    //        and causes a spinner
    EMBED_STRATEGY_BASIC_OBJECT = 4,

    // Embed the svg directly with an img tag; don't replace linked resources
    // @NOTE: NOT CURRENTLY USED - this is only here for testing purposes
    EMBED_STRATEGY_BASIC_IMG = 5,

    // Embed a proxy svg script as an object tag via data:url, which exposes a
    // loadSVG method on its contentWindow, then call the loadSVG method directly
    // with the svg text as the argument
    // @NOTE: only works in firefox because of its security policy on data:uri
    EMBED_STRATEGY_DATA_URL_PROXY = 6,

    // Embed in a way similar to the EMBED_STRATEGY_DATA_URL_PROXY, but in this
    // method we use an iframe initialized to about:blank and embed the proxy
    // script before calling loadSVG on the iframe's contentWindow
    // @NOTE: this is a workaround for the image issue with EMBED_STRATEGY_IFRAME_INNERHTML
    //        in safari; it also works in firefox
    EMBED_STRATEGY_IFRAME_PROXY = 7,

    // Embed in an img tag via data:url, downloading stylesheet separately, and
    // injecting it into the data:url of SVG text before embedding
    // @NOTE: this method seems to be more performant on IE
    EMBED_STRATEGY_DATA_URL_IMG = 8;
