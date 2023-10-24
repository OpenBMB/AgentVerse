# Changelog

## 6.4.8 / 2023-10-21
**Fixes**
- Minor refactoring improvements to fix build issues in some web frameworks.

## 6.4.7 / 2023-10-06
**New**
- Add support for bitwise aggregation operators. `$bitAnd`, `$bitOr`,`$bitXor`,`$bitNot`.
- Add support for typed arrays in `isEqual`, `cloneDeep`, and `stringify`.

**Fixes**
- Build object graph for relevant update operators `$inc`,`$mul`,`$max`,`$min`,`$push`,`$bit`.
- Compare user-defined types with referential equality only with `isEqual`.
- Process user-defined types correctly with `stringify`.
- Properly handle cycles in `stringify` operation.

## 6.4.6 / 2023-10-02
**Fixes**
- Support nested object query expressions for `$pull`. [373](https://github.com/kofrasa/mingo/issues/373)

## 6.4.5 / 2023-09-26
**Fixes**
- Allow specifying only field expression for `$getField` operator.
- Make place argument optional for `$trunc` and `$round`. [347](https://github.com/kofrasa/mingo/issues/347)
- Add and default to new clone mode `copy` for UpdateOptions.
- Remove clone mode `structured` for UpdateOptions.

## 6.4.4 / 2023-08-13
**Fixes**
- Fixed incorrect query normalization when a regex condition is specified as an object literal. [355](https://github.com/kofrasa/mingo/issues/355)
- Restore generic type annotations for top-level classes. [357](https://github.com/kofrasa/mingo/issues/357)

## 6.4.3 / 2023-06-28
**Fixes**
- Fix rounding of even whole numbers. [347](https://github.com/kofrasa/mingo/issues/347)

## 6.4.2 / 2023-06-23
**New**
- Add `Context` to enable isolated configurations of usable operators in the same runtime context.

## 6.4.1 / 2023-06-08
**New**
- Add options support for `updateObject`.
- Add `createUpdater` for creating updater functions with default options.
- Default to no cloning of inputs to update operators.
- Provide clone method configuration via `cloneMode` option.

## 6.4.0 / 2023-06-06
**New**
- Added support for update operators accessible via `updateObject` from `mingo/updater`. Includes;
  - Field Update Operators: `$currentDate`, `$inc`, `$max`, `$min`, `$mul`, `$set`, `$unset`, `$rename`.
  - Array Update Operators: `$[]`, `$[<identifier>]`, `$addToSet`, `$pop`, `$push`, `$pull`, `$pushAll`.
  - Bitwise Update Operators: `$bit`.

## 6.3.4 / 2023-05-26
**Fixes**
- Fixed hash collision resolution for `$sort` and `$group`. Closes [332](https://github.com/kofrasa/mingo/issues/332).
- Support MongoDB compatibility truth check for `$where` operator.

**Minor**
- Export `walk` util function.
- Flatten module exports to expose only `index` roots.
- Update dependencies.

## 6.3.3 / 2023-05-26 (deprecated)
* Deprecated due to invalid operator imports.

## 6.3.2 / 2023-03-29
**Fixes**
- Coerce empty string `""` to `true` for applicable operators when using strict MongoDB compatibility mode. [321](https://github.com/kofrasa/mingo/issues/321)

## 6.3.1 / 2023-03-28
**Fixes**
- Fix `$filter` to properly handle truthy values. [320](https://github.com/kofrasa/mingo/issues/320)
- Fix `$arrayToObject` to flatten array before converting to objects.

## 6.3.0 / 2023-03-27
**Fixes**
- Fix `$size` predicate failing when applied to undefined array. [313](https://github.com/kofrasa/mingo/issues/313)
- Fix `$min` and `$max` operators to consider type sorting order.
- Fix `$group` operator to enforce `_id` in spec.
- Fix variable propagation from parent to child expressions. [315](https://github.com/kofrasa/mingo/issues/315)
- Fix missing validations for `$setWindowFields` operator.

**New**
- Add support for `$locf` window operator.
- Add support for `$linearFill` window operator.
- Add support for `$fill` pipeline operator.


## 6.2.7 / 2023-01-12

**Fixes**

- Ensure all variables are accessible in their local contexts. Closes [302](https://github.com/kofrasa/mingo/issues/302)

## 6.2.6 / 2023-01-12 (deprecated)

**Fixes**

- Ensure all variables are accessible in their local contexts. Closes [302](https://github.com/kofrasa/mingo/issues/302)

## 6.2.5 / 2023-01-06

**Fixes**

- ADD .json files to package.json files array (#299)

## 6.2.4 / 2023-01-06

**Fixes**

- Include `package.json` in explicit module exports.
- Create `package.json` files for subpackages to support all ESM bundlers (#298)

## 6.2.3 / 2023-01-05

**Fixes**

- Export all module paths explicitly for CommonJS and ES6 formats. Closes [295](https://github.com/kofrasa/mingo/issues/295).

## 6.2.2 / 2023-01/05

- Distribute package for both commongJS and as ES6 module.

## 6.2.1 / 2022-12-28

**Fixes**

- Properly bind `$$this` when resolving fields using array operators. Closes [289](https://github.com/kofrasa/mingo/issues/289)

## 6.2.0 / 2022-12-16

**New**

- Added array expression operators; `$maxN`, `$minN`, `$firstN`, `$lastN`, and `$sortArray`.
- Added accumulator operators; `$maxN`, `$minN`, `$first`, `$firstN`, `$last`, `$lastN`, `$top`, `$topN`, `$bottom`, and `$bottomN`.
- Added trignometry operators; `$cosh` and `$sinh`.

**Fixes**

- Correclt handle boundary values for trignometry functions.
- Nested arrays are projected correctly when excluded in results.
- Support MongoDB comparison sort order by data type.

## 6.1.3 / 2022-12-09

**Fixes**

- Use correct context for resolving paths. Closes [284](https://github.com/kofrasa/mingo/issues/284)
- Support user-defined global variables.

## 6.1.2 / 2022-10-02

**Fixes**

- Fix breaking change in `6.1.1`. Closes [274](https://github.com/kofrasa/mingo/issues/274)
- Fix `$dateToString` formatter `%V` to be week of year in ISO 8601 format (i.e. `01`-`53`)
- Fix `$dateToString` formatter `%u` to be day of week number in ISO 8601 format (i.e. `1`-`7`)
- Add `$dateToString` formatter `%U` for week of year.

## 6.1.1 / 2022-09-30

**Fixes**

- Handle timezone correctly for `$dateToParts`. Closes [#256](https://github.com/kofrasa/mingo/issues/256)

## 6.1.0 / 2022-07-27

**Fixes**

- Allow multiple expressions to `$ifNull` conditional.

**New**

- Added `$dateDiff` operator. See [#244](https://github.com/kofrasa/mingo/pull/244)

## 6.0.6 / 2022-04-29

**Fixes**

- Correctly handle comparison of multiple deeply nested arrays. Fixes [#238](https://github.com/kofrasa/mingo/issues/238)

## 6.0.5 / 2022-02-24

**Fixes**

- Handle timezone letters for `$dateFromString`. Fixes [#228](https://github.com/kofrasa/mingo/issues/228)

## 6.0.4 / 2022-02-09

**Fixes**

- Handle hash collisions to correct behaviour of set operators; `setEqual`, `$setIntersection`, `$setIsSubset`, and `$setUnion`.
- Support arbitrary number of arrays in `$setIntersection`.

## 6.0.3 / 2022-02-03

**Fixes**

- Remove use of `console.assert`. See [#226](https://github.com/kofrasa/mingo/pull/226)
- Remove deprecated `mingo/init` import.

## 6.0.2 / 2022-02-02

**Fixes**

- Fix incorrect date bug when handling underflows in `dateFromParts`. See [#224](https://github.com/kofrasa/mingo/issues/224)

## 6.0.1 / 2022-02-01

**Fixes**

- Fixed bug in `$dateFromParts` which incorrectly computes the dates for some input values. See [#223](https://github.com/kofrasa/mingo/pull/223).

## 6.0.0 / 2022-01-31

**New**

- Add option `processingMode` to control input and output behaviour.
- Add option `scriptEnabled` to control whether to enable custom function operators; `$where`, `$function`, and `$accumulator`.
- Add new operator type `OperatorType.WINDOW`.
- Add aggregation expression operators;
  - `$accumulator`
  - `$function`
  - `$getField`
  - `$setField`
  - `$unsetField`
  - `$sampleRate`
  - `$replaceOne`
  - `$replaceAll`
- Add pipeline operators.
  - `$setWindowFields`
  - `$merge`
  - `$unionWith`
- Add window operators for `$setWindowFields`.
  - `$denseRank`
  - `$derivative`
  - `$documentNumber`
  - `$expMovingAvg`
  - `$integral`
  - `$rank`
  - `$shift`
- Add accumulator operators.
  - `$count`
  - `$covarianceSamp`
  - `$covariancePop`
- Add support for `$$NOW` system variable.
- Add ISO date operators.
  - `$isoWeek`
  - `$isoWeekYear`
  - `$isoDayOfWeek`
- Add support for `iso8601` option to `$dateToParts`.
- Add `useStrictMode` option to enable useful non-standard behaviour on specific operators.
  - The `$elemMatch` projection operator return all matching nested documents instead when `useStrictMode` is `false`.

**Removed**

- Removed support for string function body in `$where` operator.
- Remove `addOperators` function.
- Removed `Collection` type.

**Fixes**

- Fixed computation bug in `$dateAdd` and `$dateSubtract` operators.
- Fix bug in `sortBy` which causes duplicate values.
- Fix ranking for duplicate values for `$denseRank` operator.
- Fix cursor navigation bugs.
- Fix timezone handling in `$dateToString` operator.
- Return list of single item for `$count` aggregation operator.

## 5.1.0 / 2022-01-28

Changes not published. Updates moved to `6.0.0`.

## 5.0.0 / 2021-12-05

Changes not published. Updates moved to `6.0.0`.

## 4.4.1 / 2021-11-16

**Fixes**

- Remove `lodash` reference in expression operators.

## 4.4.0 / 2021-11-15

**Features**

- Add bitwise query operators.
  - `$bitsAllClear`
  - `$bitsAllSet`
  - `$bitsAnyClear`
  - `$bitsAnySet`.
- Add `$jsonSchema` query operator.

## 4.3.0 / 2021-11-07

**Features**

- Add `$rand` aggregation and query operator

**Fixes**

- Support arbitrary input expressions for date operators
- Use hash function for deep-equality check in `union` function

## 4.2.0 / 2021-09-26

- Add array operators `$first` and `$last`.
- Add date operators `$dateAdd` and `$dateSubtract`.

## 4.1.5 / 2021-09-22

- Fix regex not supported in `$all` query operator. [#190](https://github.com/kofrasa/mingo/issues/190)
- Fix behaviour of `$setUnion`. [#192](https://github.com/kofrasa/mingo/issues/192)

## 4.1.4 / 2021-08-06

- Use context object in `$filter`.

## 4.1.3 / 2021-07-12

- Add stronger type definitions for custom operators.
- Convert unit tests to Typescript.
- Update Typedocs.

## 4.1.2 / 2021-02-17

- Fix `$unwind` incorrectly removing `0` value, by correcting behaviour of `isEmpty`

## 4.1.1 / 2021-01-31

- Fix `$elemMatch` to support top-level boolean operators `$and`,`$or`, and `$nor`

## 4.1.0 / 2021-01-14

**Features**

- Added trignometry operators.
  - `$sin`
  - `$cos`
  - `$tan`
  - `$asin`
  - `$acos`
  - `$atan`
  - `$atan2`
  - `$asinh`
  - `$acosh`
  - `$atanh`
  - `$degreesToRadians`
  - `$radiansToDegrees`

## 4.0.0 / 2021-01-07

**Features**

- Added option `hashFunction` to enable custom hash functions
- Added `$unset` pipeline operator
- Added `$isNumber` expression operator
- Added option `collectionResolver` to resolve collections from names for use in supported operators. Closes [#150](https://github.com/kofrasa/mingo/issues/150)
- Removed `$where` operator from default query operators included at load time. Closes [#155](https://github.com/kofrasa/mingo/issues/155)
  **Fixes**
- Support object type names with integer characters
  **Other**
- Improved type annotations
- Added ES lint to ensure code quality
- Added Prettier to maintain consistent code format

## 3.1.0 / 2020-10-23

- Fix `isObject` to enforce plain Javascript objects.
- Fix `collation` options of `$sort` operator
- Merge `Config` into `Options` type
- Pass `Options` to predicate function for comparison operators
- Replace `createConfig` with `makeOptions`

## 3.0.6 / 2020-08-05

- Fix $bucket default and boundaries mutation. Fixes [#147](https://github.com/kofrasa/mingo/issues/147)
- Handle empty array values to `$not` expression operator.

## 3.0.5 / 2020-07-20

- Handle non-array values to `$not` expression operator. Fixes [#146](https://github.com/kofrasa/mingo/issues/146)

## 3.0.4 / 2020-07-19

- Deprecate `mingo/init` in favour of explicit `mingo/init/basic`.

## 3.0.3 / 2020-07-16

- Remove `esm` module dependency. Fixes [#145](https://github.com/kofrasa/mingo/issues/145)

## 3.0.2 / 2020-05-22

- `$map` operator operand 'as', should default to `this` if missing. Fixes [#143](https://github.com/kofrasa/mingo/pull/143)

## 3.0.1 / 2020-04-27

- Throw exception for specifying unregistered operators
- Fix regression bug in `$elemMatch`. Closes [#139](https://github.com/kofrasa/mingo/issues/139)

## 3.0.0 / 2020-04-12

- Convert project to Typescript
- Build ES6 libraries with support for selective import
- Default export only `Aggregator`, `Query`, `aggregate()`, `find()`, and `remove()`
- Auto load only Query and Projection operators in main module via `mingo/init`
- Provide module `mingo/init/system` to auto load all operators
- Expose library via `esm` dependency to support module imports for ES5
- Implement type operators `$type`, `$convert`, `$toBool`, `$toDate`, `$toString`, `$toInt`, `$toLong`, `$toDouble`, `$toDecimal`
- Implement date operators `$dateFromString`, `$dateFromParts`, `dateToParts`.
- Implement string operators `$trim`, `$rtrim`, `$ltrim`, `$regexFind`, `$regexFindAll`, `$regexMatch`
- Add timezone support for all date operators
- Return all date operator results in UTC
- Split large expression operator groups to file per operator
- Rename `group` module to `accumulator`
- Removed `dist/` files. Deferring to consumers to use their own packaging solutions
- Removed `setup()` function. Replaced by passing in config to `Query` or `Aggregator`.
- Removed `VERSION` fields
- Removed `_internal()`
- Pass only `computeValue` and `resolve` functions to custom operator
- Deprecate and replace `OP_XXX` constants with enum `OperatorType.XXX`.
- Removed `CollectionMixin`
- Removed `Lazy`, `Cursor`, and `addOperators` from default export
- Support extra options parameter on all operator functions

## 2.5.2 / 2020-03-17

- Revert to using `dist/mingo.js` as main entry point for package. Fixes [#125](https://github.com/kofrasa/mingo/issues/125)
- Fix build failures from updated dependencies

## 2.5.1 / 2020-03-16

- Create minified files for previous version
- Refactored to support tree shaking

## 2.5.0 / 2020-03-08

- Optionally add `Symbol.iterator` support if available in runtime environment. Closes [#124](https://github.com/kofrasa/mingo/issues/124)
- Allow matching with nested fields in $lookup. Fixes [#123](https://github.com/kofrasa/mingo/issues/123)
- Add $round operator and support 'place' argument for `$trunc`. Fixes [#121](https://github.com/kofrasa/mingo/issues/121)
- Support new array fields. Fixes [#119](https://github.com/kofrasa/mingo/issues/119)
- Handle embedded document exclusions

## 2.4.0 / 2019-10-25

- Do not enforce single value for `$facet` aggregation pipeline operations. Fixes #110

## 2.3.6 / 2019-10-23

- Add $set as $addFields alias. Fixes #113
- Fix $group operator idempotency issue. #82 (#114)
- Use renovateapp for dependency version management

## 2.3.5 / 2019-05-04

- Correctly project and merge nested objects with missing keys.

## 2.3.4 / 2019-05-02

- Properly flatten projected nested objects. Fixes #105

## 2.3.3 / 2019-03-20

- Improve sort performance

## 2.3.2 / 2019-03-18

- Fix sorting non-string values when collation is enabled.

## 2.3.1 / 2019-03-13

- Correctly handle subqueries for `$elemMatch`. Fixes #103

## 2.3.0 / 2019-03-12

- Add support for collation on `Cursor` objects. Fixes #100

## 2.2.12 / 2019-03-09

- Avoid resolving primitive type operands.

## 2.2.11 / 2019-02-18

- Work around iOS 9 Safari compatibility problem (#98)
- Fixing typing for aggregator.run, make query optional. (#102)

## 2.2.10 / 2019-01-04

- Minor cleanup and refactoring
- Correct changelog date

## 2.2.9 / 2019-01-03

- Switch `inArray` and `notInArray` to use `Array.prototype.includes` for performance. Fixes #95

## 2.2.8 / 2018-12-01

- Project all matched elements of nested array correctly. Fixes #93

## 2.2.7 / 2018-11-30

- Match missing fields correctly with `$exists`

## 2.2.6 / 2018-11-22

- Update `mergeObjects` to handle more use cases.

## 2.2.5 / 2018-11-21

- Fix merge objects to project subdocuments correctly. Fixes #91

## 2.2.4 / 2018-09-09

- Add `$$REMOVE` support to conditionally exclude fields

## 2.2.3 / 2018-08-21

- Match undefined fields with `$in: [null]` queries (#85)

## 2.2.2 / 2018-04-17

- Support `$unwind` for arrays nested in objects. Fixes [#80](https://github.com/kofrasa/mingo/issues/80)

## 2.2.1 / 2018-04-14

- Added `$expr` operator. Fixes [#79](https://github.com/kofrasa/mingo/issues/79)

## 2.2.0 / 2018-01-25

- More Performance improvements for lazy evaluation
- Added `$mergeObjects` operator
- Change `Lazy` to factory
- Remove `Lazy` static methods except `isIterator`

## 2.1.1 / 2017-12-18

- Use iterator input for Query
- Don't sort cursor modifiers

## 2.1.0 / 2017-12-17

- Added new `Lazy` iterator to re-implement `Cursor` and pipeline operators
- Added `Aggregator.stream` to obtain iterator for stream pipeline results
- Removed `Cursor` methods `first()` and `last()`

## 2.0.5 / 2017-12-11

- Add typescript declaration. Fixes [#75](https://github.com/kofrasa/mingo/pull/75)

## 2.0.4 / 2017-10-19

- Handle date values in `$add` operator. Fixes [#73](https://github.com/kofrasa/mingo/issues/73)

## 2.0.3 / 2017-09-25

- Fix `map` so it does not break `cloneDeep`
- Improve hash function

## 2.0.2 / 2017-09-14

- Remove array size constraint on `$concatArrays`. [#64](https://github.com/kofrasa/mingo/issues/64)
- Filter out empty values from collection. [#65](https://github.com/kofrasa/mingo/issues/65)
- Fix false positive tests and `$substrBytes`. [#66](https://github.com/kofrasa/mingo/issues/66)
- `$regex` should matched nested one level deep. [#70](https://github.com/kofrasa/mingo/issues/70)

## 2.0.1 / 2017-09-07

- Minimize cloning in pipeline operators
- Return new object for `$lookup` without mutating original. Fixes #59 and #60
- Make `clone` return shallow clone
- Provide `cloneDeep` for deep cloning

## 2.0.0 / 2017-08-12

- Removed custom polyfills
- Added `$strLenBytes`, `$strLenCP`, `$substrCP`, `$substrBytes`
- Fix `$indexOfBytes`
- Fix `$stdDevSamp`
- Fix `$in` for aggregation operations
- Removed max and min cursor methods.
- Restrict custom query operator type `OP_QUERY` to return boolean only
- Rename `OP_AGGREGATE` to `OP_EXPRESSION`
- Update `$unwind` to MongoDB 3.2 features

## 1.3.3 / 2017-08-02

- Fix `computeValue` not overriding group operator keys after resolving expression
- Added `$in`, `$objectToArray`, and `$arrayToObject` array aggregation operators

## 1.3.2 / 2017-07-28

- Restore `setup` function. https://github.com/kofrasa/mingo/issues/56

## 1.3.1 / 2017-07-24

- Replaced core-js because it bloats compiled library by 10K i.e. ~24%
- Fix #55

## 1.3.0 / 2017-07-23

- Support ES6 modules
- Fix matching null and missing values. https://github.com/kofrasa/mingo/issues/54
- Improve comparing user-defined types

## v1.2.0 / 2017-07-17

- Fix `$where` operator not executed last. https://github.com/kofrasa/mingo/pull/50
- Fix matching nested arrays. https://github.com/kofrasa/mingo/issues/51
- Added `$facet` and `$bucket` operators
- Added `$bucketAuto` operator without granularity support
- Added string keys for `$type` operator
- Added Cursor support for [ES2015 Iterator Protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
- Sort null/undefined values to front of sorted result
- Revert to operator names with format `Mingo.OP_<name>`

## v1.1.2 / 2017-03-30

- Optimize `$lookup` implementation
- Avoid reversing original input to `$reverseArray`

## v1.1.1 / 2017-03-12

- Fix incorrect method call for ObjectProto
- Limit exposed util methods to type checking

## v1.1.0 / 2017-03-11

- Renamed `Mingo.OP_<name>` functions to `Mingo.KEY_<name>`
- Added pipeline stage operator (`$lookup`)

## v1.0.1 / 2017-03-01

- Updated polyfills to fix failing build on older node versions

## v1.0.0 / 2017-02-28

- Added array aggregation operators
  (`$arrayElemAt`,`$concatArrays`,`$filter`,`$indexOfArray`,`$isArray`,`$range`,`$reverseArray`,`$reduce`,`$slice`,`$zip`)
- Added string aggregation operators (`$indexOfBytes`,`$split`)
- Added arithmetic aggregation operators (`$ceil`,`$exp`,`$floor`,`$ln`,`$log`,`$log10`,`$pow`,`$sqrt`,`$trunc`)
- Added .editorconfig
- Pass utility functions to custom operator implementation
- Rename function to retrieve collection id to `idKey` in custom operators
- Moved support for query projection streaming to a new package [mingo-stream](https://github.com/kofrasa/mingo-stream)

## v0.9.1 / 2017-02-08

- Fix resolving system variables with subpaths. See [#41](https://github.com/kofrasa/mingo/issues/41)

## v0.9.0 / 2017-02-06

- Added support for system variables (`$$ROOT`,`$$CURRENT`)
- Implemented more pipeline operators (`$redact`,`$addFields`,`$sample`,`$sortByCount`,`$count`,`$replaceRoot`)
- Added `$switch` conditional operator
- Fixed `$ifNull` conditional operator
- Allow use of `$in` and `$nin` as aggregation comparison operators

## v0.8.1 / 2016-12-08

- Fix querying deeply nested nested arrays and object equality matching. See [#36](https://github.com/kofrasa/mingo/issues/36)

## v0.8.0 / 2016-09-26

- Make this library zero-dependent

## v0.7.0 / 2016-09-10

- Fix nested projections for objects and arrays. See [#25](https://github.com/kofrasa/mingo/issues/25)

## v0.6.5 / 2016-07-04

- Fix incorrect de-duping of Date types in $sort aggregate operator. See [#23](https://github.com/kofrasa/mingo/pull/23)

## v0.6.4 / 2016-05-19

- Support matching against user-defined types. See [#22](https://github.com/kofrasa/mingo/issues/22)

## v0.6.3 / 2015-12-27

- Fixed numeric aggregation over undefined values. See [issues#21](https://github.com/kofrasa/mingo/issues/21)

## v0.6.2 / 2015-11-17

- Fixed erroneous cloning of objects. See [#20](https://github.com/kofrasa/mingo/pull/20)

## v0.6.1 / 2015-09-20

- Fixed matching nested array fields without specifying index. See [#19](https://github.com/kofrasa/mingo/issues/19)
- Added `VERSION` global field

## v0.6.0 / 2015-05-28

- Added `$dateToString` aggregation operator

## v0.5.0 / 2015-04-29

- Added support for extending operators via `Mingo.addOperators`
- Added `bower.json`
- Fixed grouping documents by an object key
- Fixed exclusive select projection not returning correct fields
