[![Build Status](https://travis-ci.org/box/viewer.js.png?branch=master)](https://travis-ci.org/box/viewer.js)
[![Project Status](http://opensource.box.com/badges/stable.svg)](http://opensource.box.com/badges)

# Viewer.js

A viewer for documents converted with the [Box View API](http://developers.box.com/view/).

## Contents
* [Quick Start](#quick-start)
    - [Get the Source](#get-the-source)
    - [Loading a Simple Viewer](#loading-a-simple-viewer)
* [Logos](#logos)
* [Documentation](#documentation)
    - [Library Methods](#library-methods)
    - [Viewer Config](#viewer-config)
    - [Viewer Methods](#viewer-methods)
    - [Event Handling](#event-handling)
        + [Viewer Events](#viewer-events)
        + [Page Events](#page-events)
    - [Setting the Layout Mode](#setting-the-layout-mode)
        + [Built-in Layout Modes](#built-in-layout-modes)
        + [Other Layout Modes](#other-layout-modes)
    - [Styling Pages](#styling-pages)
    - [Presentation Transitions](#presentation-transitions)
    - [Realtime Page Streaming](#realtime-page-streaming)
    - [Plugins](#plugins)
    - [Data Providers](#data-providers)
    - [Text Documents](#text-documents)
        + [Syntax Highlighting](#syntax-highlighting)
* [Browser Support](#browser-support)
* [Contributing](#contributing)
* [Getting Started with the Code](#getting-started-with-the-code)
    - [Dev Dependenvies](#dev-dependencies)
    - [Git Hooks](#git-hooks)
    - [Grunt](#grunt)
    - [Logo Options](#logo-options)
* [Common Issues](#common-issues)
* [Change Log](#change-log)
* [Copyright and License](#copyright-and-license)

## Quick Start

### Get the Source

You can find the pre-built development and production source files in the `dist/` directory in this repository.

Viewer.js is available on [npm](http://npmjs.org) and [Bower](http://bower.io):

```
npm install viewer
```

```
bower install viewer
```

All stable versions of viewer.js are hosted on [CloudFlare's CDN, cdnjs](https://cdnjs.com/libraries/viewer.js). The unminified versions are available through the following URLs:

```
//cdnjs.cloudflare.com/ajax/libs/viewer.js/<VERSION>/crocodoc.viewer.css
```

```
//cdnjs.cloudflare.com/ajax/libs/viewer.js/<VERSION>/crocodoc.viewer.js
```

and the minified versions through:

```
//cdnjs.cloudflare.com/ajax/libs/viewer.js/<VERSION>/crocodoc.viewer.min.css
```

```
//cdnjs.cloudflare.com/ajax/libs/viewer.js/<VERSION>/crocodoc.viewer.min.js
```

For additional information, [please see the cdnjs website](https://cdnjs.com/libraries/viewer.js).

#### v0.10.8

**Development**

* [crocodoc.viewer.js](https://raw.githubusercontent.com/box/viewer.js/v0.10.8/dist/crocodoc.viewer.js) 230.1 kB
* [crocodoc.viewer.css](https://raw.githubusercontent.com/box/viewer.js/v0.10.8/dist/crocodoc.viewer.css) 14.8 kB

**Production**

* [crocodoc.viewer.min.js](https://raw.githubusercontent.com/box/viewer.js/v0.10.8/dist/crocodoc.viewer.min.js) 51.9 kB (10.7 kB gzipped)
* [crocodoc.viewer.min.css](https://raw.githubusercontent.com/box/viewer.js/v0.10.8/dist/crocodoc.viewer.min.css) 11.4 kB (2.5 kB gzipped)


### Loading a Simple Viewer

`Crocodoc.createViewer(element, config)`

Example
```html
<link rel="stylesheet" href="crocodoc.viewer.min.css" />
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="crocodoc.viewer.min.js"></script>
<div class="viewer" style="height: 400px"></div>
<script type="text/javascript">
    var viewer = Crocodoc.createViewer('.viewer', {
        url: 'https://view-api.box.com/1/sessions/3c6abc0dcf35422e8353cf9c27578d5c/assets/'
    });
    viewer.load();
</script>
```


## Logos

As per section 2.6 of our agreement of our [API terms](http://developers.box.com/box-view-terms/), we require that all apps using Box View with the Standard tier conspicuously display a Box logo when displaying Box View documents. We have included an [approved logo](src/images/logo.png) within this repository. If your Box View plan permits custom branding of the viewer, please refer to [Logo Options](#logo-options) for instructions on how to build the viewer without the Box logo or with a custom logo.


## Documentation

### Library Methods

**Crocodoc.createViewer(element, config)**

Create and return a viewer instance initialized with the given parameters.

* `element` the DOM element to initialize the viewer into
    - `string`: a query selector
    - `Element`: a DOM Element
    - `Object`: a jQuery object
* `config` the configuration object


**Crocodoc.addPlugin(pluginName, creatorFn)**

Register a new plugin with the framework. See [Plugins](#plugins) for more details.

* `pluginName` the name of the plugin
* `creatorFn` a function that creates and returns an instance of the plugin (which should be an object) when called


### Viewer Config

The only required config parameter is `url`. All others are optional.

**url (required)**

The `url` parameter specifies the base URL where the document assets are located. Viewer.js will look for document assets (including `info.json`, `stylesheet.css`, etc) in this path.


**layout**

The `layout` parameter specifies the layout mode to use. Default `Crocodoc.LAYOUT_VERTICAL`. See [Setting the Layout Mode](#setting-the-layout-mode) for available layouts.


**zoom**

The `zoom` parameter specifies the initial zoom level to use. Default `Crocodoc.ZOOM_AUTO`.

Possible values:
* `Crocodoc.ZOOM_FIT_WIDTH` - zooms to fit the width of the (largest) page within the viewport
* `Crocodoc.ZOOM_FIT_HEIGHT` - zooms to fit the height of the (largest) page within the viewport
* `Crocodoc.ZOOM_AUTO` - zooms to best fit the document within the viewport


**page**

The `page` parameter specifies the initial page number to show when the document loads. Default: `1`.


**enableTextSelection**

The `enableTextSelection` parameter specifies whether or not users can select text. If `true`, users can select text. Default: `true`. *Note: text selection is not supported in IE 8 see [Browser Support](#browser-support) for more information.*


**enableLinks**

The `enableLinks` parameter specifies whether or not hyperlinks are enabled. If `true`, hyperlinks are enabled. Default: `true`.


**enableDragging**

The `enableDragging` parameter specifies whether or not dragging is enabled. If `true`, click-and-drag scrolling/panning will be enabled for this document. Default: `false`. **NOTE: text selection is not fully supported when dragging is enabled. It is recommended that you disable text selection if you plan to enable dragging.**


**plugins**

The `plugins` parameter allows you to specify a map of plugin names to their respective configs. Plugin names specified in this object will be loaded when the viewer is initialized. See [Plugins](#plugins) for more details.

Example:
```js
{
    plugins: {
        // my-plugin will be initialized with the following config
        'my-plugin': {
            foo: 1,
            bar: 2
        }
    }
}
```

**queryParams**

The `queryParams` parameter allows you to specify query string parameters to append to each asset request (eg., `info.json` or `page-1.svg`). Can be an object or string. Default: `null`.

Examples:
```js
// as a string
{
    queryParams: 'hello=world&foo=bar'
}

// as an object
{
    queryParams: {
        hello: 'world',
        foo: ['bar', 'baz']
    }
}
```


**useWindowAsViewport**

The `useWindowAsViewport` parameter allows you to specify whether to use the browser window as the viewport for the document. This is useful when the document should take up the entire browser window (e.g., on mobile devices). Use this option on mobile devices to allow the browser to auto-hide browser chrome when scrolling. Default: `false`.


**dataProviders**

The `dataProviders` parameter allows you override default data providers by specifying names of replacement data providers. See [data providers](#data-providers) for more info.

Example:
```js
{
    dataProviders: {
        // page-svg data provider will be overridden by the 'my-page-svg' data provider
        'page-svg': 'my-page-svg'
    }
}
```



### Viewer Methods

**destroy()**

The `destroy` method removes and cleans up the viewer instance.


**on(name, handler)**

The `on` method binds an event handler for the specified event name fired by the viewer object. See [Event Handling](#event-handling) for available events.


**off(name[, handler])**

The `off` method unbinds an event handler for the specified event name and handler fired by the viewer object. If `handler` is not given, unbinds all event handlers on this viewer object with the given name.


**scrollTo(page)**

The `scrollTo` method scrolls the viewer to the specified page. The `page` argument may be one of the following:
* `(number)` - scroll the the specified page number
* `Crocodoc.SCROLL_PREVIOUS` - scroll to the previous page
* `Crocodoc.SCROLL_NEXT` - scroll to the next page

Examples
```js
// scroll to page 2
viewer.scrollTo(2);

// scroll to the next page
viewer.scrollTo(Crocodoc.SCROLL_NEXT);
```


**zoom(val)**

The `zoom` method sets the current zoom level of the document. Possible values:
* `Crocodoc.ZOOM_FIT_WIDTH` - zooms to fit the width of the (largest) page within the viewport
* `Crocodoc.ZOOM_FIT_HEIGHT` - zooms to fit the height of the (largest) page within the viewport
* `Crocodoc.ZOOM_AUTO` - zooms to best fit the document within the viewport
* `Crocodoc.ZOOM_IN` - zooms in
* `Crocodoc.ZOOM_OUT` - zooms out

Examples
```js
// zoom in
viewer.zoom(Crocodoc.ZOOM_IN);

// zoom to fit width
viewer.zoom(Crocodoc.ZOOM_FIT_WIDTH);
```


**setLayout(mode)**

The `setLayout` method sets the layout mode. See [Setting the Layout Mode](#setting-the-layout-mode) for available layouts.

Examples
```js
viewer.setLayout(Crocodoc.LAYOUT_PRESENTATION);
```


### Event Handling

The viewer object fires several different events. You can add and remove event listeners using the `on` and `off` methods.

Example
```js
// ready event fires when the document metadata has loaded
// and the viewer is ready to be interacted with
viewer.on('ready', function (event) {
    console.log('the viewer is ready, and the document has ' + event.data.numPages + ' pages');
});
```


#### Viewer Events

* `asseterror` Triggered if any asset fails to load. Event properties:
    * `error` - the error message
    * `resource` - the url of the resource that failed to load
    * `status` - the http status code
* `destroy` Triggered when the document viewer is purposely destroyed with the destroy method.
* `fail` Triggered if the document fails to load. Event properties:
    * `error` - the error details
* `ready` Triggered as soon as a document becomes viewable. Event properties:
    * `page` - the current page
    * `numPages` - total number of pages in the document
* `resize` Triggered when the viewer is resized. Event properties:
    * `width` - the viewport width
    * `height` - the viewport height
* `scrollstart` Triggered when the user starts scrolling. Event properties:
    * `scrollTop` - the scrollTop position of the viewport
    * `scrollLeft` - the scrollLeft position of the viewport
* `scrollend` Triggered when the user stops scrolling (or when the content stops moving if there is a momentum effect). Event properties:
    * `scrollTop` - the scrollTop position of the viewport
    * `scrollLeft` - the scrollLeft position of the viewport
* `zoom` Triggered when the zoom value changes. Event properties:
    * `zoom` - current zoom value
    * `zoomMode` - current zoom mode (string or null)
    * `canZoomOut` - whether the viewer is able to zoom out (boolean)
    * `canZoomIn` - whether the viewer is able to zoom in (boolean)

#### Page Events

* `pagefocus` Triggered whenever a new page is scrolled into view. Event properties:
    * `page` - page number
    * `numPages` - total number of pages in the document
    * `visiblePages` - an array of page numbers that are currently (fully or partially) visible in the viewport
* `pageload` Triggered whenever a page is loaded. Event properties:
    * `page` - page number
* `pageunload` Triggered whenever a page is unloaded to improve performance. Event properties:
    * `page` - page number
* `pagefail` Triggered if a page fails to load. Event properties:
    * `error` - the error details
    * `page` - page number of the failed page


### Setting the Layout Mode


#### Built-in Layout Modes

You can set a layout initially via the configuration object:

```js
var viewer = Crocodoc.createViewer('.viewer', {
    url: 'https://view-api.box.com/1/sessions/<session_id>/assets/',
    layout: Crocodoc.LAYOUT_HORIZONTAL
});
```

Or via the `setLayout` method:

```js
viewer.setLayout(Crocodoc.LAYOUT_PRESENTATION);
```

The currently supported layouts are:
* `Crocodoc.LAYOUT_VERTICAL` Pages are scrolled vertically and arranged into one or more columns depending upon the current zoom.
* `Crocodoc.LAYOUT_VERTICAL_SINGLE_COLUMN` Pages are scrolled vertically and arranged into a single column even when zoomed out.
* `Crocodoc.LAYOUT_HORIZONTAL` Pages within the viewer are horizontally and arranged into a single row.
* `Crocodoc.LAYOUT_PRESENTATION` One page is shown at a time with no scrolling. Custom transitions may be used to switch between pages.
* `Crocodoc.LAYOUT_PRESENTATION_TWO_PAGE` Two pages are shown at a time, side by side, with no scrolling. Custom transitions may be used to switch between pages.

#### Other Layout Modes

The above list are the modes that are included as part of the bundled viewer.js library. Here are some other layout modes that can be included alongside the library to add new layout functionality:

* `'vertical-two-page'` Behaves like `Crocodoc.LAYOUT_PRESENTATION_TWO_PAGE` for zooming and `Crocodoc.LAYOUT_VERTICAL` for scrolling ([gist](https://gist.github.com/lakenen/bfd2dd12b8b89489ff7f)).
* `'presentation-vertical'` Behaves like `Crocodoc.LAYOUT_PRESENTATION` for page layout (e.g., one page visible at a time) and `Crocodoc.LAYOUT_VERTICAL` for zooming ([gist](https://gist.github.com/lakenen/16136477a57c84eff224)).
* **\[Your layout here!\]** - if you have a layout you'd like to contribute, create a gist like the examples above, and we'd be happy to include it.


### Styling Pages

`.crocodoc-page` and `.crocodoc-page-content` classes can be used to style pages, but there are some important restrictions:
* `.crocodoc-page`: padding should be used to adjust page spacing (don't use margin for this)
* `.crocodoc-page`: background should be transparent - use `.crocodoc-page-content` for changing the background of pages (including adding a background-image, such as a loading indicator)

Examples:
```css
.crocodoc-page {
    /* 40px spacing around all sides of every page */
    padding: 40px;
}
.crocodoc-page {
    /* 40px spacing around the left and right sides of every page */
    padding: 0 40px;
}

/* the following can be used in a layout with pages that are side-by-side to remove spacing in the middle (e.g., custom layout 'vertical-two-page') */
.crocodoc-page {
    padding: 20px;
}
.crocodoc-page:nth-child(even) {
    padding-left: 0;
}
.crocodoc-page:nth-child(odd) {
    padding-right: 0;
}

/* add a box-shadow to pages */
.crocodoc-page-content {
    box-shadow: 1px 1px 2px #000;
}

/* change the background color of pages */
.crocodoc-page-content {
    background-color: papayawhip;
}

/* add a spinner image to loading pages */
.crocodoc-page-loading .crocodoc-page-content {
    background: #FFF url('../images/spinner.gif') center center no-repeat;
}

/* mirror all pages horizontally (?!) */
.crocodoc-page-content {
    -webkit-transform: scale(-1, 1);
    -ms-transform: scale(-1, 1);
    transform: scale(-1, 1);
}
```


### Presentation Transitions

With viewer.js in presentation (`Crocodoc.LAYOUT_PRESENTATION`) layout mode, it is possible to add custom page transitions using pure CSS. The viewer automatically applies CSS classes to the pages appropriately so that you can write CSS that will affect the current, previous, and next pages, as well as all pages before and after the current page.

To see some examples, look at the CSS files in ["presentations" example](examples/presentations) included with this repo.

The classes available are:

* `.crocodoc-current-page`: the current page
* `.crocodoc-preceding-page`: the last "current" page (i.e. the page that had the `crocodoc-current-page` class before the most recent `pagefocus` event)
* `.crocodoc-page-prev`: the previous page
* `.crocodoc-page-next`: the next page
* `.crocodoc-page-before`: any page before the current page (including the previous page)
* `.crocodoc-page-after`: any page after the current page (including the next page)


### Realtime Page Streaming

The Box View API conversion pipeline is optimized to minimize time to view the first page of a document. This means that a session can be created and a document can be viewed as soon as page 1 (and some metadata) is finished converting. It is now possible to use viewer.js to view documents as soon as the first page is ready by using the [realtime plugin](plugins/realtime). This plugin makes a connection to the Box View API's realtime channel (a link to which is provided in the `urls` parameter of the session creation response), which streams updates about the conversion progress of a document.


### Plugins

Plugins are reusable components that can hook into viewer.js instances to add functionality. Plugins are initialized when a viewer instance is created and have their own configuration options.

See [`/plugins`](plugins) for some plugin examples.

[//]: # (TODO: expand this section)

Example:
```js
// add a plugin that tracks how long a user was on each page
Crocodoc.addPlugin('analytics', function (scope) {
    var currentPage,
        startTime,
        config;

    function track(page) {
        var elapsed,
            now = Date.now();
        if (currentPage) {
            elapsed = now - startTime;
            if (typeof config.ontrack === 'function') {
                config.ontrack(currentPage, elapsed / 1000);
            }
        }
        startTime = now;
        currentPage = page;
    }

    return {
        // the messages property tells the viewer which messages this 
        // plugin is interested in
        messages: ['pagefocus'],

        // this onmessage method is called when a message listed above 
        // is broadcast within the viewer instance
        onmessage: function (name, data) {
            // in this case, we are only listening for one message type,
            // so we don't need to do any checking against the name value
            track(data.page);
        },

        // init is called when the viewer is initialized, and the plugin
        // config is passed as a parameter
        init: function (pluginConfig) {
            config = pluginConfig;
        }
    };
});

// When creating the viewer, just include analytics in the plugins config
var viewer = Crocodoc.createViewer('.viewer', {
    url: '/path/to/assets',
    plugins: {
        // config for the analytics plugin
        analytics: {
            ontrack: function (page, seconds) {
                console.log(seconds + 's spent on page ' + page);
            }
        }
    }
});
```


### Data Providers

See the [JS architecture overview](src/js/README.md#data-providers) for information about data providers.


### Text Documents

As of `v0.10.0`, viewer.js supports rendering text-based documents converted by the Box View API. This functionality is in beta until further notice, and many of the page-related API methods, events, and configuration properties in viewer.js will not have any affect on text documents. The viewer will automatically switch into text-based document mode when you provide it with a URL that points to a text document converted with the View API.

#### Syntax Highlighting

Many source code formats will be converted to HTML for use with viewer.js such that you can enable syntax highlighting. To enable syntax highlighting, simply include a [Pygments](http://pygments.org/)-compatible CSS stylesheet in the page with your viewer. The Box View iframe viewer uses a stylesheet similar to [this one](https://github.com/richleland/pygments-css/blob/master/github.css).


## Browser Support

Viewer.js is supported in all modern desktop and mobile browsers. It will fall back to raster images in older browsers that do not support SVG.

*NOTE: raster fall-back requires that `.png` representations have already been generated for the converted document.*

[//]: # (TODO: expand this section)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).


## Getting Started with the Code

### Dev Dependencies

To install the development dependencies, you'll need [node](http://nodejs.org/) and [npm](https://npmjs.org/). Most node installs come with npm pre-packaged.

Once you have npm, you'll need to install grunt-cli:
```
npm install -g grunt-cli
```

Then go to the viewer.js directory and run:
```
npm install
```

That's it! You should be setup with development dependencies and ready to go. 

### Git Hooks

Viewer.js comes with a pre-commit git hook that runs the unit tests before allowing a commit. This is a useful way to make sure you don't accidentally commit code that breaks unit tests. To install the git hook, just run:

```
./install-githooks.sh
```

### Grunt

* `grunt test` - runs `jshint` and `qunit` tests against the code
* `grunt doc` - runs `test` and `jsdoc` to generate documentation in `doc/`
* `grunt` (alias for `grunt default`) - runs `test` and `concat` to build the following files:
    - `dist/crocodoc.viewer.js`
    - `dist/crocodoc.viewer.css`
* `grunt build` - runs `default` as well as `cssmin` and `uglify` to build the following compressed files (in addition to the files built in `grunt default`):
    - `dist/crocodoc.viewer.min.js`
    - `dist/crocodoc.viewer.min.css`
* `grunt serve` - runs a static webserver for viewing examples and qunit tests
    - defaults to port 9000
    - examples: `http://localhost:9000/examples`
    - tests: `http://localhost:9000/test`

### Logo Options

There is an additional option that can be specified when running grunt tasks: `--no-logo`. If this flag is added, logos will not be embedded into the resulting CSS file (`dist/crocodoc.viewer(.min).css`).

If you would like to replace the Box logo with your own, you can simply replace `src/images/logo.png` and `src/images/logo@2x.png` with your own logos. Running `grunt` or `grunt build` will embed the images into the resulting CSS files.

**NOTE:** Make sure you are allowed to remove logos before building with this option. For more information, see [Logos](#logos) above.


For more information about the code, see the [JS architecture overview](src/js/README.md)


## Common Issues

**I did everything right! Why am I seeing a blank screen?**

1. If you don't see any errors in the JavaScript console, your viewer's container element might have a height of `0px`. Viewer.js does not force a height on its container element, so that needs to be set by the developer (whether it's a percent or explicit pixel value doesn't matter):

    ```html
    <div class="viewer" style="height: 560px"></div>
    ```

2. Are you loading assets from a `file://` URL? Many browsers' security policies block these requests, so viewer.js is unable to load assets. To resolve this issue, you can run a local server using `grunt serve` (see [Getting Started with the Code](#getting-started-with-the-code)) or save your assets to some remote server for testing.

3. If you are loading the assets from your own server, but the viewer is on a different origin (hostname), then you must include a [CORS](http://en.wikipedia.org/wiki/Cross-origin_resource_sharing) HTTP header with the served asset files. The quickest fix is to add the HTTP response header `Access-Control-Allow-Origin: *` (but you will almost certainly want to be more specific than `*`, or else to restrict access to your asset files in some other way).

4. IE 8 and 9 have a bug in the XHR/XDR implementation that causes requests to HTTPS domains to fail if they originate from an HTTP domain (with the error: "Access Denied"). If your domain is running on HTTP, Box View API URLs will fail on IE 8 and 9. At the moment, the View API only responds on HTTPS, so we have no workaround for this issue other than to recommend that you use SSL on your site.


## Change Log

See [CHANGELOG.md](CHANGELOG.md).


## Copyright and License

Copyright 2014 Box, Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
