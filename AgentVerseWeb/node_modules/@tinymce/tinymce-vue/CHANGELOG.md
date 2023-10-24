# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## 5.1.0 - 2023-04-05

### Added
- Exposed method `getEditor()` that return the current editor

## 5.0.1 - 2022-10-24

### Changed
- Use target element instead of selector for Editor configuration

### Fixed
- Updated dependencies
- Updated CI library to latest

## 5.0.0 - 2022-04-08

### Changed
- License changed to MIT
- Default cloud channel to '6'

## 4.0.7 - 2022-03-09

### Changed
- Storybook examples

## 4.0.6 - 2022-02-17

### Added
- Exposed method `rerender(initObject)` to change the editor configuration
- Watcher for tag name

## 4.0.5 - 2021-11-22

### Added
- Correct proptypes

### Fixed
- Update dependencies

## 4.0.2 - 2021-11-05

### Fixed
- Update dependencies

## 4.0.1 - 2021-11-05

### Added
- Adopt beehive-flow release process

## 4.0.0 - 2020-11-05

### Added
- Vue 3 support

## 3.2.4 - 2020-10-16

### Fixed
- Fixed handling of inline template event bindings

## 3.2.3 - 2020-09-16

### Changed
- Update dependencies
- Changed `keyup` to `input` for the events triggering sending out content to `v-model`.

## 3.2.2 - 2020-05-22

### Fixed
- Fixed v-model `outputFormat` resetting the editor content on every change

## 3.2.1 - 2020-04-30

### Fixed
- Upgraded jquery in dev dependencies in response to security alert.

## 3.2.0 - 2020-02-24

### Added
- Added new `tinymceScriptSrc` prop for specifying an external version of TinyMCE to lazy load

## 3.1.0 - 2020-01-31

### Added
- Added new `outputFormat` prop for specifying the format of the content emitted via the `input` event

## 3.0.1 - 2019-08-19

### Fixed
- Fixed incorrect module paths

## 3.0.0 - 2019-08-16

### Added
- Changed referrer policy to origin to allow cloud caching

### Changed
- Removed Vue as a dependency and added vue@^2.4.3 as a peer dependency

## 2.1.0 - 2019-06-05

### Changed
- Changed the CDN URL to use `cdn.tiny.cloud`

## 2.0.0 - 2019-02-11

### Changed
- Changed default cloudChannel to `'5'`.

## 1.1.2 - 2019-01-09

### Added
- Updated changelog to show how you have to add `.default` to commonjs require.

## 1.1.1 - 2019-01-09

### Changed
- Improved uuid function. Patch contributed by fureweb-com.

## 1.1.0 - 2018-10-01

### Added
- Added functionality to bind to `disabled` property to set editor into readonly state.

## 1.0.9 - 2018-09-03

### Fixed
- Fixed broken links in readme.

## 1.0.8 - 2018-05-10

### Added
- Added `undo` and `redo` to the events triggering sending out content to `v-model`.

## 1.0.7 - 2018-04-26

### Fixed
- Added null check before removing editor to check that tinymce is actually available.

## 1.0.6 - 2018-04-11

### Removed
- Removed `cloudChannel` prop validation.

## 1.0.5 - 2018-04-06

### Removed
- Removed onPreInit shorthand as it never worked.

## 1.0.4 - 2018-04-06

### Fixed
- Fixed bug with onInit never firing.

## 1.0.3 - 2018-04-03

### Fixed
- Fixed bug with value watcher getting out of sync.

## 1.0.2 - 2018-02-16

### Fixed
- Fixed bug where is wasn't possible to set inline in the init object, only on the shorthand.

## 1.0.1 - 2018-02-08

### Fixed
- Fixed binding timing issues by moving the binding to after the editor has initialized.

## 1.0.0 - 2018-01-16

### Added
- Initial release
