(function(){
  window.app = {};

  // Database schema
  app.schema = IndexedDBBackbone.IDBSchema.describe('readsomething')
                 .createStore('words', { keyPath: 'text' })
                 .createIndex('words', 'statusIndex', 'status');

  app.db = new IndexedDBBackbone.Driver(app.schema);

})();
