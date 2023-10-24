var should = require('should')

module.exports = function(idProperty, getEngine) {
  describe('#createOrUpdate', function() {
    it('should create a new object when no id is specified', function(done) {
      getEngine(function(ignoreError, engine) {
        engine.createOrUpdate({ a: 1 }, function(err, object) {
          should.not.exist(err)
          object.should.have.property('a')
          object.should.have.property('_id')
          done()
        })
      })
    })

    it('should return a clone of the object', function(done) {
      var object = { a: 1 }
      getEngine(function(ignoreError, engine) {
        engine.createOrUpdate(object, function(err, newObject) {
          should.not.exist(err)
          newObject.newProperty = true
          object.should.not.have.property('newProperty')
          done()
        })
      })
    })

    it("should emit a 'create' event when a new object is created", function(done) {
      getEngine(function(ignoreError, engine) {
        engine.on('create', function(entity) {
          entity.should.eql({ a: 3 })
          done()
        })

        engine.createOrUpdate({ a: 3 }, function() {})
      })
    })

    it('should update the entity when it has already been saved', function(done) {
      getEngine(function(ignoreError, engine) {
        engine.createOrUpdate({ a: 5 }, function(err, object) {
          var previousId = object._id
          should.not.exist(err)
          engine.createOrUpdate({ _id: previousId, a: 7 }, function(
            err,
            object
          ) {
            should.not.exist(err)
            object._id.should.eql(previousId)
            object.a.should.eql(7)
            done()
          })
        })
      })
    })

    it("should emit the 'update' event when a object is updated", function(done) {
      getEngine(function(ignoreError, engine) {
        engine.on('update', function(object) {
          object.a.should.eql(7)
          done()
        })

        engine.createOrUpdate({ a: 5 }, function(err, object) {
          var previousId = object._id
          should.not.exist(err)
          engine.createOrUpdate({ _id: previousId, a: 7 }, function() {})
        })
      })
    })
  })
}
