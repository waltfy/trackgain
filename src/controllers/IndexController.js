App.IndexController = Ember.ArrayController.extend({
  insertActive: false,
  newExercise_weight: null,
  newExercise_reps: null,
  selectedNewExercise: null,

  newExercise: function () {
    this.set('insertActive', true);
  },

  cancel: function () {
    this.set('insertActive', false);
    this.set('newExercise_weight', null);
    this.set('newExercise_reps', null);
    this.set('selectedNewExercise', null);
  },

  addExercise: function () {
    var reps = this.get('newExercise_reps'),
        weight = this.get('newExercise_weight'),
        selectedExercise = this.get('selectedNewExercise');

    var requestData = {
      user: App.User.find(App.currentUser),
      exercise_id: selectedExercise._id,
      weight: weight,
      reps: reps 
    }

    var newExercise = App.Exercise.createRecord(requestData);
    newExercise.get('transaction').commit();
    this.get('target.router').transitionTo('index');
  },

  updateExercise: function () {
    console.log('should be updated');
  }
});