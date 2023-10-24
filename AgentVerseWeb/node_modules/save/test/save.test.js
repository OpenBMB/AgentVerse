describe('save()', function() {
  it('should error if name is missing', function() {
    ;(function() {
      require('..')()
    }.should.throwError("A string must be provided for 'name'"))
  })
  it('should fire a find event', function(done) {
    var save = require('..')('jim', { logger: { info: function() {} } })
    save.find({}, done)
  })
})
