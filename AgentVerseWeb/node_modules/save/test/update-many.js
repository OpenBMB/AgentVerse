var async = require('async')
var should = require('should')

module.exports = function(idProperty, getEngine) {
  describe('#updateMany()', function() {
    it.skip('should update many', function(done) {
      getEngine(function(ignoreError, engine) {
        var objectToUpdate = { a: 1 }
        async.map(
          [objectToUpdate, objectToUpdate, { a: 2 }, { b: 1 }],
          engine.create,
          function(error) {
            should.not.exist(error)
            engine.updateMany({ a: 1 }, { c: 3 }, function(error) {
              should.not.exist(error)
              engine.find({ a: 1 }, function(ignoreError, items) {
                items[0].should.include({ a: 1, c: 3 })
                items[1].should.include({ a: 1, c: 3 })
                items.length.should.equal(2)
                done()
              })
            })
          }
        )
      })
    })
  })
}
