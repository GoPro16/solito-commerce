const path = require.resolve('./src/schema.ts')

console.log('schema path: ', path)
module.exports = require('@boost/module').requireModule(path)
