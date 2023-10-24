var async = require('async')
var should = require('should')

module.exports = function(idProperty, getEngine) {
  describe('#findOne()', function() {
    it('should return undefined when no data matches query ', function(done) {
      getEngine(function(ignoreError, engine) {
        engine.findOne({ a: 1 }, function(ignoreError, object) {
          should.not.exist(object)
          done()
        })
      })
    })

    it("should emit a 'findOne' event", function(done) {
      getEngine(function(ignoreError, engine) {
        engine.on('findOne', function(entity) {
          entity.should.eql({ a: 1 })
          done()
        })

        engine.findOne({ a: 1 }, function() {})
      })
    })

    it('should return id of type string', function(done) {
      getEngine(function(ignoreError, engine) {
        async.map([{ a: 3 }], engine.create, function() {
          engine.findOne({}, function(ignoreError, object) {
            object[idProperty].should.be.type('string')
            done()
          })
        })
      })
    })

    it('should return a clone of the object', function(done) {
      var object = { a: 3 }
      getEngine(function(ignoreError, engine) {
        async.map([object], engine.create, function() {
          engine.findOne({}, function(ignoreError, newObject) {
            newObject.newProperty = true
            object.should.not.have.property('newProperty')
            done()
          })
        })
      })
    })

    it('should return an object for a single clause query that matches an existing object ', function(done) {
      getEngine(function(ignoreError, engine) {
        async.map([{ a: 1 }], engine.create, function() {
          engine.findOne({ a: 1 }, function(ignoreError, object) {
            object.a.should.equal(1)
            done()
          })
        })
      })
    })

    it('should use options to shape results', function(done) {
      getEngine(function(ignoreError, engine) {
        async.map([{ a: 3 }, { a: 1 }, { a: 2 }], engine.create, function(
          error
        ) {
          if (error) return done(error)
          engine.findOne({}, { sort: { a: 1 } }, function(ignoreError, object) {
            object.a.should.equal(1)
            done()
          })
        })
      })
    })
  })
}
