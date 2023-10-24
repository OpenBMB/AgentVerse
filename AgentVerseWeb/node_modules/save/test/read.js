var assert = require('assert')

module.exports = function(idProperty, getEngine) {
  describe('#read()', function() {
    it('should return undefined if no object is found with given id', function(done) {
      getEngine(function(ignoreError, engine) {
        engine.read('999', function(ignoreError, entity) {
          assert.strictEqual(undefined, entity)
          done()
        })
      })
    })

    it("should emit a 'read' event", function(done) {
      getEngine(function(ignoreError, engine) {
        engine.on('read', function(id) {
          assert.strictEqual(id, '999')
          done()
        })
        engine.read('999', function() {})
      })
    })

    it('should return object if id is found', function(done) {
      var original = { a: 1 }

      getEngine(function(ignoreError, engine) {
        engine.create(original, function(ignoreError, entity) {
          engine.read(entity[idProperty], function(ignoreError, entity) {
            assert.strictEqual(entity, entity)
            done()
          })
        })
      })
    })

    it('should emit a received event', function(done) {
      var original = { a: 1 }

      getEngine(function(ignoreError, engine) {
        engine.create(original, function(ignoreError, entity) {
          engine.on('received', function(data) {
            assert.deepStrictEqual(data, entity)
            done()
          })
          engine.read(entity[idProperty], function(ignoreError, entity) {
            assert.deepStrictEqual(entity, entity)
          })
        })
      })
    })

    it('should return id of type String', function(done) {
      var original = { a: 1 }

      getEngine(function(ignoreError, engine) {
        engine.create(original, function(ignoreError, entity) {
          engine.read(entity[idProperty], function(ignoreError, entity) {
            entity[idProperty].should.be.type('string')

            done()
          })
        })
      })
    })

    it('should return a clone of the object', function(done) {
      var original = { a: 1 }

      getEngine(function(ignoreError, engine) {
        engine.create(original, function(ignoreError, entity) {
          engine.read(entity[idProperty], function(ignoreError, entity) {
            entity.newProperty = true
            original.should.not.have.property('newProperty')

            done()
          })
        })
      })
    })
  })
}
