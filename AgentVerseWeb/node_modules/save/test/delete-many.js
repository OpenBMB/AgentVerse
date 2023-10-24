var async = require('async')
var should = require('should')

module.exports = function(idProperty, getEngine) {
  describe('#deleteMany()', function() {
    it('should delete the entity if the delete query matches', function(done) {
      getEngine(function(ignoreError, engine) {
        var objectToDelete = { a: 1 }
        async.map(
          [objectToDelete, objectToDelete, { a: 2 }, { b: 1 }],
          engine.create,
          function() {
            engine.deleteMany(objectToDelete, function(error) {
              should.not.exist(error)

              engine.find({}, {}, function(ignoreError, objects) {
                // Assert items have been deleted
                objects.length.should.equal(2)

                // Assert items returned arent deleted ones
                objects.forEach(function(object) {
                  object.should.not.equal(objectToDelete)
                })
                done()
              })
            })
          }
        )
      })
    })

    it("should emit a 'deleteMany' event", function(done) {
      getEngine(function(ignoreError, engine) {
        engine.create({ a: 1 }, function(ignoreError, insertedObject) {
          engine.on('deleteMany', function(entity) {
            entity.should.eql(insertedObject)
            done()
          })
          engine.deleteMany(insertedObject)
        })
      })
    })

    it("should emit a 'afterDeleteMany' event", function(done) {
      getEngine(function(ignoreError, engine) {
        engine.create({ a: 1 }, function(ignoreError, insertedObject) {
          engine.on('afterDeleteMany', function(entity) {
            entity.should.eql(insertedObject)
            done()
          })
          engine.deleteMany(insertedObject)
        })
      })
    })

    it('should not error if there are no objects to delete', function(done) {
      getEngine(function(ignoreError, engine) {
        async.map(
          [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }],
          engine.create,
          function() {
            engine.deleteMany({ a: 5 }, function(error) {
              should.not.exist(error)
              done()
            })
          }
        )
      })
    })
  })
}
