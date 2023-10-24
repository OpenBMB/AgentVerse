# mingo

MongoDB query language for in-memory objects

![license](https://img.shields.io/github/license/kofrasa/mingo)
[![version](https://img.shields.io/npm/v/mingo)](https://www.npmjs.org/package/mingo)
[![build](https://github.com/kofrasa/mingo/actions/workflows/node.js.yml/badge.svg)](https://github.com/kofrasa/mingo/actions/workflows/node.js.yml)
![issues](https://img.shields.io/github/issues/kofrasa/mingo)
[![codecov](https://img.shields.io/codecov/c/github/kofrasa/mingo)](https://codecov.io/gh/kofrasa/mingo)
[![npm downloads](https://img.shields.io/npm/dm/mingo)](https://www.npmjs.org/package/mingo)

## Install

`$ npm install mingo`

## Features

- Supports dot notation for both _`<array>.<index>`_ and _`<document>.<field>`_ selectors.
- Query and Projection Operators.
  - [Array Operators](https://docs.mongodb.com/manual/reference/operator/query-array/)
  - [Bitwise Operators](https://docs.mongodb.com/manual/reference/operator/query-bitwise/)
  - [Comparisons Operators](https://docs.mongodb.com/manual/reference/operator/query-comparison/)
  - [Element Operators](https://docs.mongodb.com/manual/reference/operator/query-element/)
  - [Evaluation Operators](https://docs.mongodb.com/manual/reference/operator/query-evaluation/)
  - [Logical Operators](https://docs.mongodb.com/manual/reference/operator/query-logical/)
  - [Projection Operators](https://docs.mongodb.com/manual/reference/operator/projection/)
- Aggregation Framework Operators
  - [Pipeline Operators](https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline/)
  - [Accumulator Operators](https://docs.mongodb.com/manual/reference/operator/aggregation#accumulators-group/)
  - [Expression Operators](https://docs.mongodb.com/manual/reference/operator/aggregation/#expression-operators)
    - [Arithmetic Operators](https://docs.mongodb.com/manual/reference/operator/aggregation/#arithmetic-expression-operators)
    - [Array Operators](https://docs.mongodb.com/manual/reference/operator/aggregation/#array-expression-operators/)
    - [Bitwise Operators](https://www.mongodb.com/docs/manual/reference/operator/aggregation/#bitwise-operators)
    - [Boolean Operators](https://docs.mongodb.com/manual/reference/operator/aggregation/#boolean-expression-operators/)
    - [Comparisons Operators](https://docs.mongodb.com/manual/reference/operator/aggregation/#comparison-expression-operators/)
    - [Conditional Operators](https://docs.mongodb.com/manual/reference/operator/aggregation/#conditional-expression-operators/)
    - [Custom Aggregation Operators](https://docs.mongodb.com/manual/reference/operator/aggregation/#custom-aggregation-expression-operators)
    - [Date Operators](https://docs.mongodb.com/manual/reference/operator/aggregation/#date-expression-operators/)
    - [Literal Operators](https://docs.mongodb.com/manual/reference/operator/aggregation/#literal-expression-operators/)
    - [Miscellaneous Operators](https://docs.mongodb.com/manual/reference/operator/aggregation/#miscellaneous-operators)
    - [Object Operators](https://docs.mongodb.com/manual/reference/operator/aggregation/#object-expression-operators)
    - [Set Operators](https://docs.mongodb.com/manual/reference/operator/aggregation/#set-expression-operators/)
    - [String Operators](https://docs.mongodb.com/manual/reference/operator/aggregation/#string-expression-operators)
    - [Trignometry Operators](https://docs.mongodb.com/manual/reference/operator/aggregation/#trigonometry-expression-operators)
    - [Type Operators](https://docs.mongodb.com/manual/reference/operator/aggregation/#type-expression-operators)
    - [Variable Operators](https://docs.mongodb.com/manual/reference/operator/aggregation/#variable-expression-operators)
  - [Window Operators](https://docs.mongodb.com/manual/reference/operator/aggregation/setWindowFields/#window-operators)
- Supports aggregaion variables; [`$$ROOT`, `$$CURRENT`, `$$DESCEND`, `$$PRUNE`, `$$KEEP`, `$$REMOVE`, `$$NOW`](https://docs.mongodb.com/manual/reference/aggregation-variables/)
- Filtering and aggregation using streaming.
- ✨**NEW**✨ Support for [Update Operators](https://www.mongodb.com/docs/manual/reference/operator/update/). See [Updating Documents](#updating-documents).

For documentation on using operators see [mongodb](http://docs.mongodb.org/manual/reference/operator/)

Browse [package docs](http://kofrasa.net/mingo/) for modules.

## Usage

```js
// Use as es6 module
import mingo from "mingo";

// or vanilla nodeJS
const mingo = require("mingo");
```

The main module exports `Aggregator`, `Query`, `aggregate()`, `find()`, and `remove()`. Only [Query and Projection](https://docs.mongodb.com/manual/reference/operator/query/) operators are loaded by default when you require the main module. This is done using the side-effect module `mingo/init/basic` and automatically includes pipeline operators; `$project`, `$skip`, `$limit`, and `$sort`.

## Loading Operators

MongoDB query library is huge and you may not need all the operators. If using this library on the server-side where bundle size is not a concern, you can load all operators as shown below.

```js
// Note that doing this effectively imports the entire library into your bundle and unused operators cannot be tree shaked
import "mingo/init/system";
```

Or from the node CLI

```sh
node -r 'mingo/init/system' myscript.js
```

To support tree-shaking for client side bundles, you can import and register specific operators that will be used in your application.

### ES6

```js
import { useOperators, OperatorType } from "mingo/core";
import { $trunc } from "mingo/operators/expression";
import { $bucket } from "mingo/operators/pipeline";

useOperators(OperatorType.EXPRESSION, { $trunc });
useOperators(OperatorType.PIPELINE, { $bucket });
```

### CommonJS

```js
const core = require("mingo/core");
const $trunc = require("mingo/operators/expression").$trunc;
const $bucket = require("mingo/operators/pipeline").$bucket;
const useOperators = core.useOperators;
const OperatorType = core.OperatorType;

useOperators(OperatorType.EXPRESSION, { $trunc: $trunc });
useOperators(OperatorType.PIPELINE, { $bucket: $bucket });
```

## Using query to test objects

```js
import { Query } from "mingo";

// create a query with criteria
// find all grades for homework with score >= 50
let query = new Query({
  type: "homework",
  score: { $gte: 50 }
});

// test if an object matches query
query.test(doc);
```

## Searching and Filtering

```js
import { Query } from "mingo";

// input is either an Array or any iterable source (i.e Object{next:Function}) including ES6 generators.
let criteria = { score: { $gt: 10 } };

let query = new Query(criteria);

// filter collection with find()
let cursor = query.find(collection);

// alternatively use shorthand
// cursor = mingo.find(collection, criteria)

// sort, skip and limit by chaining
cursor.sort({ student_id: 1, score: -1 }).skip(100).limit(100);

// count matches. exhausts cursor
cursor.count();

// classic cursor iterator (old school)
while (cursor.hasNext()) {
  console.log(cursor.next());
}

// ES6 iterators (new cool)
for (let value of cursor) {
  console.log(value);
}

// all() to retrieve matched objects. exhausts cursor
cursor.all();
```

## Using $jsonSchema operator

To use the `$jsonSchema` operator, you must register your own `JsonSchemaValidator` in the options.
No default implementation is provided out of the box so users can use a library with their preferred schema format.

The example below uses [Ajv](https://www.npmjs.com/package/ajv) to implement schema validation.

```js
import { RawObject } from "mingo/types"
import { JsonSchemaValidator } from "mingo/core"
import Ajv, { Schema } from "ajv"

const jsonSchemaValidator: JsonSchemaValidator = (s: RawObject) => {
  const ajv = new Ajv();
  const v = ajv.compile(s as Schema);
  return (o: RawObject) => (v(o) ? true : false);
};

const schema = {
  type: "object",
  required: ["item", "qty", "instock"],
  properties: {
    item: { type: "string" },
    qty: { type: "integer" },
    size: {
      type: "object",
      required: ["uom"],
      properties: {
        uom: { type: "string" },
        h: { type: "number" },
        w: { type: "number" },
      },
    },
    instock: { type: "boolean" },
  },
};

// queries documents using schema validation
find(docs, { $jsonSchema: schema }, {}, { jsonSchemaValidator }).all();
```

**Note:** An error is thrown when the `$jsonSchema` operator is used without a the `jsonSchemaValidator` configured.

## Aggregation Pipeline

```js
import { Aggregator } from "mingo/aggregator";
import { useOperators, OperatorType } from "mingo/core";
import { $match, $group } from "mingo/operators/pipeline";
import { $min } from "mingo/operators/accumulator";

// ensure the required operators are preloaded prior to using them.
useOperators(OperatorType.PIPELINE, { $match, $group });
useOperators(OperatorType.ACCUMULATOR, { $min });

let agg = new Aggregator([
  { $match: { type: "homework" } },
  { $group: { _id: "$student_id", score: { $min: "$score" } } },
  { $sort: { _id: 1, score: 1 } }
]);

// return an iterator for streaming results
let stream = agg.stream(collection);

// return all results. same as `stream.all()`
let result = agg.run(collection);
```

## Options

Query and aggregation operations can be configured with options to enabled different features or customize how documents are processed. Some options are only relevant to specific operators and need not be specified if not required.

| Name                | Description                                                                                                                            | Default                                                              | Behaviour                                                                                                                                                                                                                                                                                                                                           |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| idKey               | The key that is used to lookup the ID value of a document.                                                                             | "\_id"                                                               |                                                                                                                                                                                                                                                                                                                                                     |
| collation           | [Collation](http://kofrasa.net/mingo/interfaces/core.CollationSpec.html) specification for string sorting operations.                  | _none_                                                               | See [Intl.Collator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator)                                                                                                                                                                                                                                 |
| processingMode      | Determines copy rules for inputs and outputs.                                                                                          | [CLONE_OFF](http://kofrasa.net/mingo/enums/core.ProcessingMode.html) | Turn off cloning and modifies the input collection as needed. <br>This option will also return output objects with shared paths in their graph when specific operators are used. Provides the greatest speedup by minizing cloning. When using the aggregation pipeline, you can use the `$out` operator to collect immutable intermediate results. |
| useStrictMode       | Enforces strict MongoDB compatibilty.                                                                                                  | true                                                                 | When disabled, behaviour changes as follows. <ul><li>`$elemMatch` returns all matching nested documents instead of only the first.</li><li>Empty string `""` is coerced to false during boolean checking in supported operators which is consistent with Javascript semantics.</li><ul>                                                             |
| scriptEnabled       | Enable or disable using custom script execution.                                                                                       | true                                                                 | When disabled, operators that execute custom code are disallowed such as; `$where`, `$accumulator`, and `$function`.                                                                                                                                                                                                                                |
| hashFunction        | Custom hash function to replace the default based on "Effective Java" hashCode.                                                        | _default_                                                            | Expects function `(value: unknown) => number`.                                                                                                                                                                                                                                                                                                      |
| collectionResolver  | Function to resolve strings to arrays for use with operators that reference other collections such as; `$lookup`, `$out` and `$merge`. | _none_                                                               | Expects function `(name: string) => RawObject[]`                                                                                                                                                                                                                                                                                               |
| jsonSchemaValidator | JSON schema validator to use for the `$jsonSchema` operator.                                                                           | _none_                                                               | Expects function `(schema: RawObject) => (document: RawObject) => boolean`.<br> The `$jsonSchema` operation would fail if a validator is not provided.                                                                                                                                                                                            |
| variables           | Global variables to pass to all operators                                                                                              | _none_                                                               |                                                                                                                                                                                                                                                                                                                                                     |
| context             | Container to use for loading operators.                                                                                                | _none_                                                               | This option allow users to load only desired operators or register custom operators which need not be available globally.                                                                                                                                                                                                                           |
| useGlobalContext    | Allow falling back to the global context when operator is not found in the provided context.                                           | true                                                                 | This is provided to allow users to strictly enforce which operators may be usable. |

## Adding Custom Operators

Custom operators can be registered using `Context` via the `context` option which is the recommended way from `6.4.2`. The `Context` is a container for operators, that the execution engine will use to process queries. Previously, the [useOperators(...)](http://kofrasa.net/mingo/modules/core.html#useOperators) function was used to register operators globally but that is no longer preferred. The difference between the two is that a globally registered operator cannot be overwritten whereas a new context may be created and used at anytime.

**NB: Note that the execution engine will first try to find the operator in the context and fallback to the global context when not found.**

Each operator type has a specific interface to which an implementation must conform to be valid.

- [AccumulatorOperator](http://kofrasa.net/mingo/types/core.AccumulatorOperator.html)
- [ExpressionOperator](http://kofrasa.net/mingo/types/core.ExpressionOperator.html)
- [ProjectionOperator](http://kofrasa.net/mingo/types/core.ProjectionOperator.html)
- [PipelineOperator](http://kofrasa.net/mingo/types/core.PipelineOperator.html)
- [WindowOperator](http://kofrasa.net/mingo/types/core.WindowOperator.html)
- [QueryOperator](http://kofrasa.net/mingo/types/core.QueryOperator.html)

Pre-loaded operators defined [here](https://github.com/kofrasa/mingo/blob/master/src/init/basic.ts) cannot be overridden. These include;

- All [query](http://kofrasa.net/mingo/modules/operators_query.html) operators.
- All [projection](http://kofrasa.net/mingo/modules/operators_projection.html) operators.
- Expression operators for [boolean](http://kofrasa.net/mingo/modules/operators_expression_boolean.html) and [comparison](http://kofrasa.net/mingo/modules/operators_expression_comparison.html).
- Pipeline [operators](http://kofrasa.net/mingo/modules/operators_pipeline.html); `$project`, `$skip`, `$limit`, and `$sort`.

> NB: _Update operators is not supported in `Context`._

## Updating Documents

An update operation can be performed using the `updateObject` function from the `mingo/updater` module. Unlike other operations in the library, this only works on a single object.
The query and aggregation operators are powerful enough to use for transforming arrays of documents and should be preferred when dealing with multiple objects.
`updateObject` returns an array of all paths that were updated. It also supports [arrayFilters](https://www.mongodb.com/docs/manual/release-notes/3.6/#std-label-3.6-arrayFilters) for applicable operators. To detect whether a change occured you can check the length of the returned array.

All operators as of MongoDB 5.0 are supported except the positional array operator `$`.

### Examples

```ts
import { updateObject } from "mingo/updater";
// all update operators are automatically loaded.

const obj = {
  firstName: "John",
  lastName: "Wick",
  age: 40,
  friends: ["Scooby", "Shagy", "Fred"]
};

// returns array of modified paths if value changed.
updateObject(obj, { $set: { firstName: "Bob", lastName: "Doe" } }); // ["firstName", "lastName"]

// update nested values.
updateObject(obj, { $pop: { friends: 1 } }); // ["friends"] => friends: ["Scooby", "Shagy"]
// update nested value path
updateObject(obj, { $unset: { "friends.1": "" } }); // ["friends.1"] => friends: ["Scooby", null]
// update with condition
updateObject(obj, { $set: { "friends.$[e]": "Velma" } }, [{ e: null }]); // ["friends"] => friends: ["Scooby", "Velma"]
// empty array returned if value has not changed.
updateObject(obj, { $set: { fristName: "Bob" } }); // [] => no change to object.
```

You can also create a preconfigured updater function.

```ts
import { createUpdater } from "mingo/updater";

// configure updater to deep clone passed values. clone mode defaults to "copy".
const updateObject = createUpdater({ cloneMode: "deep" });

const state = { people: ["Fred", "John"] };
const newPeople = ["Amy", "Mark"];

console.log(state.people); // ["Fred", "John"]

updateObject(state, { $set: { people: newPeople } });

newPeople.push("Jason");

console.log(state.people); // ["Amy", "Mark"]
console.log(newPeople); // ["Amy", "Mark", "Jason"]
```

## Differences from MongoDB

This list describes how this library differs from the full MongoDB query engine.

1. There is no concept of a collection. Input data is either an array of objects or a generator function to support streaming.
1. Does not support server specific operators. E.g. `$collStat`, `$planCacheStats`, `$listSessions`.
1. Does not support geometry query operators. **no support planned**.
1. Does not support query operators dependent on persistent storage; `$comment`, `$meta`, `$text`.
1. Does not support positional query or update operator `$`.
1. Does not support server specific expression operators; `$toObjectId`, `$binarySize`, `bsonSize`.
1. Agregation pipeline operator `$merge` enforces unique constraint on the lookup field at runtime.
1. Custom function evaluation operators; `$where`, `$function`, and `$accumulator`, do not accept strings as the function body.
1. Custom function evaluation operators are enabled by default. They can be disabled with the `scriptEnabled` option.
1. Custom function evaluation operator [$accumulator](https://docs.mongodb.com/manual/reference/operator/aggregation/accumulator/) does not support the `merge` option.
1. The `$jsonSchema` operator requires the user to register their own validator using the `jsonSchemaValidator` configuration.

## Benefits

- Declarative data driven API.
- Usable on both frontend and backend.
- Provides an alternative to writing custom code for transforming objects.
- Validate MongoDB queries without running a server.
- Well documented. MongoDB query language is among the best available and has great documentation.

## Contributing

- Squash changes into one commit.
- Run `npm test` to build and run unit tests.
- Submit pull request.

To validate correct behaviour and semantics of operators, you may also test against [mongoplayground.net](https://mongoplayground.net/). _Credit to the [author](https://github.com/feliixx)_.

_A big thank you to all users and [CONTRIBUTORS](https://github.com/kofrasa/mingo/graphs/contributors) of this library._

## License

MIT
