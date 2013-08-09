App.Exercise = DS.Model.extend({
  user: DS.belongsTo('App.User'),
  exercise_id: DS.attr('string'),
  weight: DS.attr('number'),
  reps: DS.attr('number'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date'),
});

App.Adapter.map('App.Exercise', {
  exercise_id: { key: 'av_exercise_id' },
  user: { key: 'user_id' },
  created_at: { key: 'createdAt' },
  updated_at: { key: 'updatedAt' },
});