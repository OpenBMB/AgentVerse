var extend = require('lodash.assign')
var async = require('async')
var should = require('should')

module.exports = function(idProperty, getEngine) {
  describe('#update()', function() {
    it('should return the full entity', function(done) {
      getEngine(function(ignoreError, engine) {
        engine.create({ a: 1 }, function(error, insertedObject) {
          should.not.exist(error)

          engine.update(insertedObject, function(error, savedObject) {
            should.not.exist(error)
            savedObject.should.eql(insertedObject)
            done()
          })
        })
      })
    })

    it("should emit a 'update' event", function(done) {
      getEngine(function(ignoreError, engine) {
        engine.create({ a: 1 }, function(ignoreError, insertedObject) {
          engine.on('update', function(entity) {
            entity.should.eql(insertedObject)
            done()
          })
          engine.update(insertedObject)
        })
      })
    })

    it("should emit a 'afterUpdate' event", function(done) {
      getEngine(function(ignoreError, engine) {
        engine.create({ a: 1 }, function(ignoreError, insertedObject) {
          engine.on('afterUpdate', function(entity) {
            entity.should.eql(insertedObject)
            done()
          })
          engine.update(insertedObject)
        })
      })
    })

    it('should error if there is no id property', function(done) {
      getEngine(function(ignoreError, engine) {
        engine.update({ a: 1 }, function(error) {
          error.message.should.eql(
            "Object has no '" + idProperty + "' property"
          )
          done()
        })
      })
    })

    it('should error if there an id property that is null/undefined', function(done) {
      getEngine(function(ignoreError, engine) {
        engine.update({ _id: null, a: 1 }, function(error) {
          error.message.should.eql(
            "Object has no '" + idProperty + "' property"
          )
          getEngine(function(ignoreError, engine) {
            engine.update({ _id: undefined, a: 1 }, function(error) {
              error.message.should.eql(
                "Object has no '" + idProperty + "' property"
              )
              done()
            })
          })
        })
      })
    })

    it('should error if there are no objects in the store with given id', function(done) {
      getEngine(function(ignoreError, engine) {
        var object = { a: 1 }
        object[idProperty] = 1
        engine.update(object, function(error) {
          error.message.should.eql(
            "No object found with '" + idProperty + "' = '1'"
          )
          done()
        })
      })
    })

    it('should modify and return object by adding new properties', function(done) {
      getEngine(function(ignoreError, engine) {
        async.map([{ a: 1, b: 1 }], engine.create, function(
          ignoreError,
          objects
        ) {
          var extraSet = { b: 2 }
          extraSet[idProperty] = objects[0][idProperty]
          engine.update(extraSet, function(ignoreError, savedObject) {
            var compositeObject = extend({}, objects[0], extraSet)
            savedObject.should.eql(compositeObject)
            done()
          })
        })
      })
    })

    it('should overwrite original properties when option is passed', function(done) {
      getEngine(function(ignoreError, engine) {
        async.map([{ a: 1 }], engine.create, function(ignoreError, objects) {
          var newObject = { b: 2 }
          newObject[idProperty] = objects[0][idProperty]
          engine.update(newObject, true, function(ignoreError, savedObject) {
            savedObject.should.eql(newObject)
            done()
          })
        })
      })
    })

    it('should return id of type String', function(done) {
      getEngine(function(ignoreError, engine) {
        async.map([{ a: 1 }], engine.create, function(ignoreError, objects) {
          var newObject = { b: 2 }
          newObject[idProperty] = objects[0][idProperty]
          engine.update(newObject, true, function(ignoreError, savedObject) {
            savedObject[idProperty].should.be.type('string')
            done()
          })
        })
      })
    })

    it('should return a unreferenced overridden object when override is true', function(done) {
      getEngine(function(ignoreError, engine) {
        async.map([{ a: 1 }], engine.create, function(ignoreError, objects) {
          var newObject = { b: 2 }
          newObject[idProperty] = objects[0][idProperty]

          engine.update(newObject, true, function(ignoreError, savedObject) {
            savedObject.newProperty = true
            newObject.should.not.have.property('newProperty')
            done()
          })
        })
      })
    })

    it('should return a unreferenced object when override is false', function(done) {
      getEngine(function(ignoreError, engine) {
        async.map([{ a: 1 }], engine.create, function(ignoreError, objects) {
          var newObject = { b: 2 }
          newObject[idProperty] = objects[0][idProperty]

          engine.update(newObject, false, function(ignoreError, savedObject) {
            savedObject.newProperty = true
            newObject.should.not.have.property('newProperty')
            done()
          })
        })
      })
    })
  })
}
