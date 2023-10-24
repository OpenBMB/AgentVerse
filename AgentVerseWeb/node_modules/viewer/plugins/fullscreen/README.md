# Fullscreen Plugin

Enables fullscreen functionality in viewer.js.

## Contents
* [Usage](#usage)
* [Options](#options)
* [API Methods](#api-methods)
* [Events](#events)


## Usage

Include `fullscreen.css` and `fullscreen.js` in your page.

Example:
```js
var viewer = Crocodoc.createViewer('.viewer', {
    // ...
    plugins: {
        fullscreen: {
            element: '.viewer-container',
            useFakeFullscreen: true
        }
    }
});
```


## Options

The following configuration options are available:

**element**

A selector or DOM element to use as the fullscreen element. If using `useWindowAsViewport` option on the viewer, this option is ignored (and `document.documentElement` is used). Default: the viewer element.

**useFakeFullscreen**

If true, fallback to "fake fullscreen" mode for browsers that do not support native HTML fullscreen. This adds the class `fakefullscreen` to the viewer element, which forces the element to take up the full window. Default: `true`.


## API Methods

The following methods are added to the viewer API when using the fullscreen plugin:

**enterFullscreen()**

Enter fullcreen mode.

**exitFullscreen()**

Exit fullscreen mode.

**isFullscreen()**

Returns true if currently in fullscreen mode.

**isFullscreenSupported()**

Returns true if native fullscreen is supported.

Example:
```js
if (viewer.isFullscreenSupported()) {
    viewer.enterFullscreen(); // enter fullscreen mode
}
```


## Events

The following events will be fired on the viewer object:

* `fullscreenchange` - fired when the fullscreen mode changes
* `fullscreenenter` - fired when entering fullscreen mode
* `fullscreenexit` - fired when exiting fullscreen mode

Example:
```js
viewer.on('fullscreenenter', function () {
    alert('welcome to fullscreen mode!');
});
```

