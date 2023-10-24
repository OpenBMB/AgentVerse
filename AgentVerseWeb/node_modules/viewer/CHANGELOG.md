# Change Log #

Viewer.js uses [semantic versioning](http://semver.org/) for its version numbers.

----
* **0.10.11**
  * Improve chrome rendering issue
* **0.10.10**
  * Fix a bug with useSVG option
* **0.10.9**
  * Add experimental useSVG option
* **0.10.8**
  * Handle 202s/retry-after header in ajax utility
* **0.10.7**
  * Fix [#185](https://github.com/box/viewer.js/issues/185)
  * Fix [#178](https://github.com/box/viewer.js/issues/178)
  * Added CORS info to the 'Common Issues' section of docs
* **0.10.6**
  * Modify the subpx util to wrap around text layer instead of inside
  * Fix [#165](https://github.com/box/viewer.js/issues/165)
  * Fix [#174](https://github.com/box/viewer.js/issues/174)
  * Fix [#171](https://github.com/box/viewer.js/issues/171)
  * Fix realtime tests on travis CI
* **0.10.5**
  * Ignore npm-debug.log
  * Update dev dependencies
  * (internal) Fix CSS link replacement in SVG data provider
* **0.10.4**
  * Fix [#157](https://github.com/box/viewer.js/issues/157)
* **0.10.3**
  * Fix [#152](https://github.com/box/viewer.js/issues/152) - calculateVisiblePages bug when viewer is display:none
  * Add better resize-checking and remove polling/requestAnimationFrame
  * Add file size and dist links in readme
  * Fix bug with destroyComponent in a component's destroy method (see [#150](https://github.com/box/viewer.js/pull/150))
  * Update grunt release command for better release automation
  * Updated README.me with cdnjs information
  * Add configurable viewer and page templates
* **0.10.2**
  * Fix unnecessary horizontal scrollbar in IE 9 when using window as viewport
* **0.10.1**
  * Fix `autoloadFirstPage` option when conversion is not complete
* **0.10.0**
  * Add support for rendering text-based (non-paged) files
* **0.9.0**
  * Add option to disable auto-loading of first page assets at `load()`
* **0.8.0**
  * Add support for 2xx response codes in ajax utility
  * Add download plugin
* **0.7.0**
  * Add `.crocodoc-preceding-page` class for easier transition effects in presentation layout
* **0.6.1**
  * Simplify and add comments to the presentation transition examples
  * Fix [#125](https://github.com/box/viewer.js/issues/125) - Pages are shifted right in IE 7
  * Fix [#124](https://github.com/box/viewer.js/issues/124) - JSON is not defined in IE 7
  * Remove npm postinstall script
  * Fix [#118](https://github.com/box/viewer.js/issues/118) - Error when switching between layouts
  * Fix issue with images not showing up in Safari 6
* **0.6.0**
  * Add support for common JS `require()` syntax via exports
* **0.5.6**
  * Fix [#110](https://github.com/box/viewer.js/issues/110) - check for hidden iframe throws for cross-domain frame
  * Fix isCrossDomain check for relative URLs in IE7
  * Fix [#106](https://github.com/box/viewer.js/issues/106) - text selection styles
  * Fix documentation issues
  * Add slider example
  * Add `Crocodoc.getViewer()`
  * Fix [#100](https://github.com/box/viewer.js/issues/100) - text-disabled class not properly applied in IE < 9
* **0.5.5**
  * Fix [#93](https://github.com/box/viewer.js/issues/93) - "fail" event is never fired when json/css fail to load
  * Fix [#94](https://github.com/box/viewer.js/issues/94) - isCrossDomain returns false positive in IE
  * Fix errors caused by destroying a viewer while pages are loading
  * Refactor AJAX util to allow headers and data
  * Add url.appendQueryParams()
  * Add getUtilityForTest and getFrameworkForTest
  * Fix [#74](https://github.com/box/viewer.js/issues/74) - zoom broken for viewer in hidden iframe in Firefox
* **0.5.4**
  * Fix [#70](https://github.com/box/viewer.js/issues/70) - IE 11 crashes when unloading pages
* **0.5.3**
  * Fix IE9 issue with box-sizing: initial
  * LazyLoader: only load visible pages initially to improve initial load performance
* **0.5.2**
  * Fix issue with optimistic asset prefetching in non-svg browsers (e.g., IE 8)
* **0.5.1**
  * Preload page 1 assets ASAP to reduce time to view page 1.
  * Fix a bug where requests for text layer assets could be duplicated unnecessarily
* **0.5.0**
  * Add realtime plugin
  * Add data providers
  * Fixed some browser warnings 
* **0.4.5**
  * Fix [#49](https://github.com/box/viewer.js/issues/49) - Centering broken if Bootstrap css loaded
  * Fix [#40](https://github.com/box/viewer.js/issues/40) - Hidden document viewer does not load pages in Firefox
  * Fix [#37](https://github.com/box/viewer.js/issues/37) - exceptions thrown in AJAX request handler are swallowed
  * Fix [#24](https://github.com/box/viewer.js/issues/24) - Enable request to local files
* **0.4.4**
  * Fix issue where PNG fallback breaks zooming on mobile devices
  * Add `linkclick` viewer event
  * Fix an issue in IE 10 where the text layer could lose its font when the same document is loaded multiple times in the lifetime of a page
  * Fix an issue where embedded images don't display in iOS 6.1 Safari
  * Add fullscreen plugin
* **0.4.3**
  * Add npm and bower support
* **0.4.2**
  * Add support for non-native XMLHTTP in IE
  * Simplify DOM structure to improve performance and maintainability
  * Add `useWindowAsViewport` option to allow mobile optimizations for full-page viewers
  * Fix fullscreen issue in IE11
  * Fix issue where npm install fails when cloned as git submodule
  * Fix issue where empty URL hash causes pages to focus on load in Chrome/Safari
* **0.4.1**
  * Fix a bug with asset preloading
* **0.4.0**
  * Add [plugins](README.md#plugins)
  * Add presentation transition examples
  * Improve lazy-loading and preloading of assets
  * Fix an issue with layout (page position calculation)
  * Fix a CORS issue in IE8/9
  * Simplified viewer API
  * Fix an issue with enabling text selection after initializing a viewer with `enableTextSelection: false`
  * Fix zooming issues in IE7
  * Fix AJAX issue in IE9
  * Fix a page loading bug in IE9 and most mobile devices
  * Many other minor bug fixes
* **0.3.2**
  * Fix an issue with `setLayout()`
  * Add preloading of SVG content
  * Add `fullyVisiblePages` property of `zoom` and `pagefocus` event data
* **0.3.1**
  * Fix an issue with stylesheet loading in IE 10
  * Fix pageavailable methods to queue and broadcast appropriately if received before viewer is ready
  * Add `jQuery.noConflict()` support
* **0.3.0**
  * Rename `ready` option to `conversionIsComplete`
  * Improve zoom performance and simplify zooming
  * Fix an issue with images in Firefox
  * Add dragging support (via `enableDragging`)
  * Add support for string values to `queryParams` option
  * Improve performance on edge-case documents
  * Fix an issue with text highlight color
* **0.2.0**
  * Add examples directory for demos and sample code
  * Add scrollstart and scrollend events
  * Add CORS support for IE 8/9
  * Add CONTRIBUTING.md, CHANGELOG.md, and LICENSE
  * Fix several bugs related to SVG embeds
  * Fix links in IE <= 9
  * Improve rendering performance of complicated documents
  * Remove pageerror event in favor of pagefail and asseterror
  * Auto-retry certain asset requests if they fail
* **0.1.3**
  * Add grunt to replace build.sh
  * Improve memory usage and scrolling performance
  * Fix several bugs with layout, SVG embedding
* **0.1.2**
  * Add support for png fallback in browsers that do not support SVG
  * Add basic support for IE 7 and 8
  * Fix regression that caused pages not to load in Firefox ~20
  * Improve scrolling and page rendering performance
  * Improve error handling for page load errors
  * Fix numerous minor bugs
* **0.1.1**
  * Fix image loading issues in Firefox and Safari
* **0.1.0**
  * Initial alpha release
