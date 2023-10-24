# save - A simple CRUD based persistence abstraction for storing objects to any backend data store. eg. Memory, MongoDB, Redis, CouchDB, Postgres, Punch Card etc.

[![NPM Details](https://nodei.co/npm/save.png?stars&downloads)](https://npmjs.org/package/save)

[![build status](https://api.travis-ci.org/serby/save.png)](http://travis-ci.org/serby/save) [![Dependences](https://david-dm.org/serby/save.svg)](https://david-dm.org/serby/save/) [![Join the chat at https://gitter.im/serby/save](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/serby/save?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

**save** comes with a fully featured in memory engine which is super handy for testing your models.
For real world use you'll need to get one of the database powered engines:

* [MongoDB](https://github.com/serby/save-mongodb)

If your data store of choice isn't listed here please create an engine and send me a pull request.
To see an example of how to create an engine, please see [save-mongodb](https://github.com/serby/save-mongodb).

## Installation

    npm install save

## Example

```js

var save = require('save')
  , s = save('person')

s.on('create', function() {
  console.log('New person created!')
})

s.create({ name: 'Dom' }, function(err, person) {
  // Outputs { name: 'Dom', _id: 1 }
  console.log(person)
})

```

## Usage

```js
var save = require('save')
```

### var s = save(name, [options])
Save by default returns an in memory engine which means you can unit test your models independently from your database. `name` is the name of your model.

Possible options are:

* `idProperty`. Defaults to `_id` for mongodb
* `logger`. Defaults to console logging: `{ info: console.info, verbose: console.info }`
* `engine`. Persistence engine to use, defaults to memory engine: `require(./memory-engine)`

### s.create(object, [cb])
Creates a new entity.
`cb` called with `cb(err, savedObject)`.

### s.read(id, [cb])
Reads a single entity with an `idProperty` of `id`.
`cb` called with `cb(err, readObject)`.

### s.update(object, overwrite, [cb])
Updates a single entity. Optionally overwrites the entire entity, by default just extends it with the new values.
`cb` called with `cb(err, readObject)`.

### s.delete(id, [cb])
Deletes one entity.
Returns an error if the object can not be found.
`cb` called with `cb(err)`.

### s.deleteMany(query, [cb])
Deletes entities based on a query.
Performs a find by query, then calls delete for each item returned
Returns an error if no items match the query.
`cb` called with `cb(err)`.

### s.find(query, options, cb)
Performs a find on the data.
`cb` called with `cb(err, foundObjectsArray)`.

### s.findOne(query, options, cb)
Performs a find on the data and limits the result set to 1.
`cb` called with `cb(err, foundObject)`.

### s.count(query, cb)
Performs a count by query.
`cb` called with `cb(err, count)`.

### s.idProperty
Provides access to the `idProperty`. Mostly used for testing.

## Events

### s.on('create', cb)
This event fires with `cb(object)` where `object` is the item that will be created.

### s.on('afterCreate', cb)
This event fires with `cb(object)` where `object` is the item that has been created.

### s.on('update', cb)
This event fires with `cb(object, overwrite)` where `object` is the item that will be updated and `overwrite` is whether the object is to be overwritten or extended.

### s.on('afterUpdate', cb)
This event fires with `cb(object, overwrite)` where `object` is the item that has been updated and `overwrite` is whether the object is to be overwritten or extended.

### s.on('delete', cb)
This event fires with `cb(id)` where `id` is the item that will be deleted.

### s.on('afterDelete', cb)
This event fires with `cb(id)` where `id` is the item that has been deleted.

### s.on('deleteMany', cb)
This event fires with `cb(query)` where `query` is the query used to `deleteMany`.

### s.on('afterDeleteMany', cb)
This event fires with `cb(query)` where `query` is the query that has used `deleteMany`.

### s.on('read', cb)
This event fires with `cb(id)` where `id` is the item that has been read.

### s.on('find', cb)
This event fires with `cb(query)` where `query` is the query used to `find`.

### s.on('findOne', cb)
This event fires with `cb(query)` where `query` is the query used to `findOne`.

### s.on('count', cb)
This event fires with `cb(query)` where `query` is the query used to `count`.

### s.on('error', cb)
This event fires with `cb(err)` where `err` is any error that may have occured.

## Credits
[Paul Serby](https://github.com/serby/) follow me on twitter [@serby](http://twitter.com/serby)

[Dom Harrington](https://github.com/domharrington/)

## Licence
Licenced under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
