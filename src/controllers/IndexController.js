App.IndexController = Ember.Controller.extend({
  insertActive: false,

  newExercise: function () {
    this.set('insertActive', true);
  },

  cancel: function () {
    this.set('insertActive', false);
  }
});