# Download Plugin

A simple plugin that initiates a download for the original document from the Box View API.

## Contents
* [Usage](#usage)
* [Options](#options)
* [API Methods](#api-methods)

## Usage

Include `download.js` in your page.

Example:
```js
var viewer = Crocodoc.createViewer('.viewer', {
    // ...
    plugins: {
        download: {
            url: '<the download URL>'
        }
    }
});
```


## Options

The following configuration options are available:

**url**

The URL to the Box View download endpoint associated with the viewing session. This would be available in the View API session response under `urls.download` if the session was created with the `is_downloadable` flag.


## API Methods

The following method is added to the viewer API when using the download plugin:

**download()**

Initiate a download for the document.
