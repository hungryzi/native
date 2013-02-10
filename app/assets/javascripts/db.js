(function(){
  window.app = {};

  // Database schema
  app.schema = IndexedDBBackbone.describe('readsomething')
                 .createStore('words', { keyPath: 'text' })
                 .createIndex('words', 'statusIndex', 'status');

})();
