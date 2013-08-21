App.IndexController = Ember.ArrayController.extend({
  insertActive: false,
  newExercise_weight: null,
  newExercise_reps: null,
  exerciseName: null,
  selectedExercise: null,
  debounceTimer: null,
  typeaheadResults: false,
  hasSelected: false,

  newExercise: function () {
    this.set('insertActive', true);
  },

  cancel: function () {
    this.set('insertActive', false);
    this.set('newExercise_weight', null);
    this.set('newExercise_reps', null);
    this.set('exerciseName', null);
    this.set('hasSelected', false);
  },

  addExercise: function () {
    var reps = this.get('newExercise_reps'),
        weight = this.get('newExercise_weight'),
        selectedExercise = this.get('selectedExercise');

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
  },

  exerciseTypeahead: function () {
    var timer = this.get('debouncedTimer'),
        exerciseName = this.get('exerciseName'),
        hasSelected = this.get('hasSelected'),
        _this = this,
        getExercises = function () {
          console.log(hasSelected);
          if (!hasSelected) {
            $.get('http://localhost:3000/exercises/available?name='+exerciseName).done(function (data) {
              var list = data.availableExercises;
              _this.set('availableExercises', list);
              _this.set('typeaheadResults', true);
              console.log(list);
            });
          }

          if (exerciseName === '') {
            _this.set('hasSelected', false);
          }
        };

    var debounce = setTimeout(getExercises, 350);

    if (timer) {
      clearTimeout(timer);
      timer = null;
      this.set('debouncedTimer', debounce);
    } else {
      this.set('debouncedTimer', debounce);
    }
  }.observes('exerciseName'),

  selectExerciseName: function (exercise) {
    this.set('hasSelected', true);
    this.set('selectedExercise', exercise);
    this.set('exerciseName', exercise.Exercise);
    this.get('availableExercises').clear();
  }
});