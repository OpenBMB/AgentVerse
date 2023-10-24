var async = require('async')

module.exports = function(idProperty, getEngine) {
  describe('#count()', function() {
    it('should return 0 count if no objects match query', function(done) {
      getEngine(function(ignoreError, engine) {
        engine.count({}, function(ignoreError, count) {
          count.should.equal(0)
          done()
        })
      })
    })

    it("should emit a 'count' event", function(done) {
      getEngine(function(ignoreError, engine) {
        engine.on('count', function(entity) {
          entity.should.eql({ a: 1 })
          done()
        })

        engine.count({ a: 1 }, function() {})
      })
    })

    it("should emit a 'received' event", function(done) {
      getEngine(function(ignoreError, engine) {
        engine.on('received', function(data) {
          data.should.eql(0)
          done()
        })

        engine.count({ a: 1 }, function(error) {
          if (error) return done(error)
        })
      })
    })

    it('should return correct count if objects match query', function(done) {
      getEngine(function(ignoreError, engine) {
        async.mapSeries(
          [{ a: 3 }, { a: 1 }, { a: 2, b: 1 }, { a: 2, b: 2 }, { a: 2, b: 3 }],
          engine.create,
          function(error) {
            if (error) return done(error)
            engine.find({ a: 2 }, function(ignoreError, results) {
              if (results.length > 3) {
                console.log('count', results)
                return done(new Error('Wrong number'))
              }
              engine.count({ a: 2 }, function(error, count) {
                if (error) return done(error)
                count.should.equal(3)
                done()
              })
            })
          }
        )
      })
    })

    it('should return total count with a {} query', function(done) {
      getEngine(function(ignoreError, engine) {
        async.mapSeries(
          [{ a: 3 }, { a: 1 }, { a: 2, c: 1 }, { a: 2, c: 2 }],
          engine.create,
          function(error) {
            if (error) return done(error)
            engine.count({}, function(error, count) {
              if (error) return done(error)
              count.should.equal(4)
              done()
            })
          }
        )
      })
    })
  })
}
