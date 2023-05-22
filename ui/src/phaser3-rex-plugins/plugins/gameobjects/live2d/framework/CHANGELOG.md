# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [4-r.4] - 2021-12-09

### Fixed

* Fix useless void 0.
* Fix a warning when `SegmentType` could not be obtained when loading motion.
* Fix return correct error values for out-of-index arguments in cubismjson by [@cocor-au-lait](https://github.com/cocor-au-lait).
* Fix a bug that motions currently played do not fade out when play a motion.


## [4-r.3] - 2021-06-10

### Fixed

* Fix motion event time value from Int to Float.


## [4-r.3-beta.1] - 2021-05-13

### Added

* Implement a function to get the correct value when the time axis of the Bezier handle cannot be linear.


## [4-r.2] - 2021-03-09

### Fixed

* Fix implementation of `iterator#increment` in `csmmap` and `csmvector`.
* Fix delay in starting fade-out for expressions.
* Fix Physics input reflect flag on evaluate.
* Fix reference size of model matrix.
* Fix `Int` to `Float` when getting `PhysicsSettings.Vertices.Radius` in `physics3.json` parsing.
   * **[INFO]** This fix may change the behavior of the physics operations.
     The behavior changes if the value of `PhysicsSettings.Vertices.Radius` in `physics3.json` is less than `1.0`.
     If you want to return to the behavior before Cubism SDK for Web R1,
     change the value of the corresponding `PhysicsSettings.Vertices.Radius` to `0`.
   * This fix is related to fix applied to `Cubism Editor 4.0.05 beta1` and later.
     Please see [Cubism Editor Changelog](https://docs.live2d.com/cubism-editor-manual/updates4/).
      * **Fix physics and scene blending settings where the length of the pendulum would be converted to an integer when displayed.**

### Changed

* Rename the function name that handles seconds from `Time` to `Seconds`.
* Avoiding needless namespace syntax to simplify imports by [@cocor-au-lait](https://github.com/cocor-au-lait)


## [4-r.1] - 2020-01-30

### Added

* Add `.editorconfig`, `.gitattributes` and `.gitignore`.
* Add document `README.md` and `CHANGELOG.md`.
* Add `package.json` for development and build.
* Add Prettier and ESLint for format and check code quolity.

### Changed

* Move source files to `/src` directory.
* Reformat code using Prettier and ESLint.


[4-r.4]: https://github.com/Live2D/CubismWebFramework/compare/4-r.3...4-r.4
[4-r.3]: https://github.com/Live2D/CubismWebFramework/compare/4-r.3-beta.1...4-r.3
[4-r.3-beta.1]: https://github.com/Live2D/CubismWebFramework/compare/4-r.2...4-r.3-beta.1
[4-r.2]: https://github.com/Live2D/CubismWebFramework/compare/4-r.1...4-r.2
[4-r.1]: https://github.com/Live2D/CubismWebFramework/compare/ce2585a919ac6e99f64dd468933772c6f1abbcc7...4-r.1
