import AuthorExamplePackage from '../author/package'

export default {
  name: 'tasks-example',
  configure: function(config) {
    config.import(AuthorExamplePackage)
  }
}
