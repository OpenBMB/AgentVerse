# Realtime Plugin

Enables realtime page-streaming functionality for Box View conversions in viewer.js. This plugin will automatically load pages as necessary when they finish converting.

The realtime plugin is meant to be used with Box View [webhooks](http://developers.box.com/view-webhooks/) to create viewing sessions before the document has completely finished converting (i.e., when the `document.viewable` notification fires).

## Contents
* [Dependencies](#dependencies)
* [Usage](#usage)
* [Options](#options)
* [Events](#events)


## Dependencies

The realtime plugin depends on the [EventSource polyfill](https://github.com/Yaffle/EventSource). You can also get a copy of the polyfill on npm:

```
npm install event-source-polyfill
```

Just include `eventsource.js` in your app along with `realtime.js`.


## Usage

Include `realtime.js` in your page, and load the plugin as follows:

Example:
```js
var viewer = Crocodoc.createViewer('.viewer', {
    // ...
    plugins: {
        // the Box View realtime URL received when requesting a session
        realtime: {
            url: '<the realtime URL>'
        }
    }
});
```


## Options

The following configuration options are available:

**url**

The URL to the Box View realtime endpoint associated with the viewing session. This would be available in the View API session response under `urls.realtime`.

For example, with a session response as follows, the URL would be `'https://view-api.box.com/sse/4fba9eda0dd745d491ad0b98e224aa25'`.

```js
{
    'type': 'session',
    'id': '4fba9eda0dd745d491ad0b98e224aa25',
    'expires_at': '3915-10-29T01:31:48.677Z',
    'urls': {
        'view': 'https://view-api.box.com/1/sessions/4fba9eda0dd745d491ad0b98e224aa25/view',
        'assets': 'https://view-api.box.com/1/sessions/4fba9eda0dd745d491ad0b98e224aa25/assets/',
        'realtime': 'https://view-api.box.com/sse/4fba9eda0dd745d491ad0b98e224aa25'
    }
 }
```

## Events

The following events will be fired on the viewer object:

* `realtimeupdate` - fired when a new realtime update arrives. Event properties:
    * `page` - the page that has become available
* `realtimeerror` - fired when the an error occurs with realtime. Event properties:
    * `error` - the error details
* `realtimecomplete` - fired when the conversion is complete (we have been notified of all pages being available)

Example:
```js
viewer.on('realtimeupdate', function (event) {
    // some magic function that updates a conversion progress bar
    updateConversionProgress(event.data.page);
});

viewer.on('realtimecomplete', function () {
    alert('the document is finished converting!');
});
```
