App.Adapter = DS.RESTAdapter.extend({
  serializer: DS.RESTSerializer.extend({
    primaryKey: function(type) {
      return '_id';
    },
    seializeId: function(id) {
      return id.toString();
    }
  }),
  url: "http://api.trackga.in",
});

App.Store = DS.Store.extend({
  revision: 12,
  adapter: App.Adapter
});