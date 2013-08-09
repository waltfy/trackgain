App.User = DS.Model.extend({
  username: DS.attr('string'),
  email: DS.attr('string'),
  // avatar: DS.attr('string'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
  exercises: DS.hasMany('App.Exercise')
});

App.Adapter.map('App.User', {
  created_at: { key: 'createdAt' },
  updated_at: { key: 'updatedAt' },
});