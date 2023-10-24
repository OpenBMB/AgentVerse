module.exports = function(
  idProperty,
  getEngine,
  beforeCallback,
  afterCallback
) {
  describe('engine', function() {
    before(function(done) {
      if (typeof beforeCallback === 'function') {
        beforeCallback(done)
      } else {
        done()
      }
    })

    after(function() {
      if (typeof afterCallback === 'function') {
        afterCallback()
      }
    })
    ;[
      './id-property',
      './create',
      './read',
      './update',
      './update-many',
      './delete',
      './delete-many',
      './find',
      './find-one',
      './count',
      './create-or-update',
      './streaming'
    ].map(function(testFile) {
      require(testFile)(idProperty, getEngine)
    })
  })
}
