var _ = require('lodash')
var async = require('async')
var should = require('should')

module.exports = function(idProperty, getEngine) {
  describe('#create()', function() {
    it('should return the inserted entity with a new id', function(done) {
      getEngine(function(ignoreError, engine) {
        engine.create({ a: 1 }, function(ignoreError, entity) {
          entity.should.have.property(idProperty)
          done()
        })
      })
    })

    it('should correctly insert an entity with a nested object', function(done) {
      var testObject = { a: 1, b: { a: 2, b: 2 } }

      getEngine(function(ignoreError, engine) {
        engine.create(testObject, function(ignoreError, entity) {
          entity.b.should.have.property('a')
          entity.b.a.should.eql(2)
          done()
        })
      })
    })

    it("should emit a 'create' event", function(done) {
      getEngine(function(ignoreError, engine) {
        engine.on('create', function(entity) {
          entity.should.eql({ a: 1 })
          done()
        })
        engine.create({ a: 1 })
      })
    })

    it("should emit a 'afterCreate' event", function(done) {
      getEngine(function(ignoreError, engine) {
        engine.on('afterCreate', function(entity) {
          entity.should.eql({ _id: '1' })
          done()
        })
        engine.create({ _id: 1 })
      })
    })

    it('unique id should always be a string', function(done) {
      getEngine(function(ignoreError, engine) {
        var fixtures = [{ a: 1 }, { _id: 6, a: 1 }, { _id: '7', a: 1 }]

        async.map(fixtures, engine.create, function(error, objects) {
          should.not.exist(error)

          _.forEach(objects, function(object) {
            object.should.have.property(idProperty)
            should.strictEqual(typeof object[idProperty], 'string')
          })

          done()
        })
      })
    })

    it('should always create a unique id', function(done) {
      var n = 15
      var c = 1
      var ids = []

      function cb(error, entity) {
        should.not.exist(error)
        if (c >= n) {
          _.uniq(ids).should.eql(ids)
          done()
        } else {
          should.exist(entity[idProperty])
          ids.push(entity[idProperty])
        }

        c += 1
      }

      getEngine(function(ignoreError, engine) {
        var item = { a: 1 }
        for (var i = 0; i < n; i += 1) {
          engine.create(item, cb)
        }
      })
    })

    it('should return the same object besides the id', function(done) {
      var original = { a: 1 }

      getEngine(function(ignoreError, engine) {
        engine.create(original, function(ignoreError, entity) {
          delete entity[idProperty]

          original.should.eql(entity)

          done()
        })
      })
    })

    it('should retrieve ids as strings', function(done) {
      var original = { a: 1 }

      getEngine(function(ignoreError, engine) {
        engine.create(original, function(ignoreError, entity) {
          entity[idProperty].should.be.type('string')

          done()
        })
      })
    })

    it('should allow idProperty to be defined', function(done) {
      var original = { a: 1 }
      original[idProperty] = '0'

      getEngine(function(ignoreError, engine) {
        engine.create(original, function(error, entity) {
          should.not.exist(error)
          entity._id.should.equal('0')
          done()
        })
      })
    })

    it('should not count falsy values as being a defined id', function(done) {
      function checkFalsy(falsy, cb) {
        var original = {}
        original[idProperty] = falsy

        getEngine(function(error, engine) {
          should.not.exist(error)
          engine.create(original, function(ignoreError, entity) {
            should.notEqual(entity[idProperty], falsy)
            cb()
          })
        })
      }

      async.forEach([null, undefined, '', false, 0, NaN], checkFalsy, done)
    })

    it('should not retain reference to original object', function(done) {
      var item = { a: 1 }

      getEngine(function(ignoreError, engine) {
        async.map([item, item], engine.create, function(error) {
          should.not.exist(error)
          engine.find({}, {}, function(ignoreError, objects) {
            objects[0].a = 2
            objects[1].a.should.equal(1)
            done()
          })
        })
      })
    })

    it('should return a new object', function(done) {
      var data = { a: 1 }
      var dataClone = _.clone(data)
      var engine = require('../lib/memory-engine')()

      engine.create(data, function(ignoreError, object) {
        delete object.a

        object.should.not.eql(dataClone)
        data.should.have.property('a')

        engine.read(object._id, function(ignoreError, item) {
          item.should.have.property('a')
          item.should.have.property('_id')
          done()
        })
      })
    })
  })
}
