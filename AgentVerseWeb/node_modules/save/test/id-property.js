module.exports = function(idProperty, getEngine) {
  describe('#idProperty', function() {
    it('should return name of the idProperty', function(done) {
      getEngine(function(ignoreError, engine) {
        engine.idProperty.should.eql('_id')
        done()
      })
    })

    it('should should be able to change the idProperty', function(done) {
      getEngine({ idProperty: 'hello' }, function(ignoreError, engine) {
        engine.idProperty.should.eql('hello')
        done()
      })
    })
  })
}
