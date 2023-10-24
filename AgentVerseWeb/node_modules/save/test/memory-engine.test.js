function getEngine(options, callback) {
  if (callback === undefined) {
    callback = options
    options = {}
  }

  callback(undefined, require('../lib/memory-engine')(options))
}

require('./engine.tests')('_id', getEngine)
