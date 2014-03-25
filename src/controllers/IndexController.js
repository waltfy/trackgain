App.IndexController = Ember.ArrayController.extend({
  insertActive: false,
  newExercise_weight: null,
  newExercise_reps: null,
  exerciseName: null,
  selectedExercise: null,
  debounceTimer: null,
  typeaheadResults: false,
  hasSelected: false,

  getExerciseList: function (user) {
    var _this = this;
    return $.get('http://api.trackga.in/exercises?user='+user);
  },

  newExercise: function () {
    this.set('insertActive', true);
  },

  cancel: function () {
    this.set('insertActive', false);
    this.set('updateActive', false);
    this.set('newExercise_weight', null);
    this.set('newExercise_reps', null);
    this.set('exerciseName', null);
    this.set('hasSelected', false);
    this.set('currentExercise', null);
    this.set('currentExerciseName', null);
  },

  addExercise: function () {
    var reps = this.get('newExercise_reps'),
        weight = this.get('newExercise_weight'),
        selectedExercise = this.get('selectedExercise'),
        _this = this;

    var requestData = {
      user: App.currentUser,
      exercise_id: selectedExercise._id,
      weight: weight,
      reps: reps 
    };

    $.post('http://api.trackga.in/exercises', requestData).done(function (data) {
      _this.getExerciseList(App.currentUser).done(function (data) {
        _this.set('exerciseList', data.exercises);
        _this.cancel();
      });
    });
  },

  updateExercise: function (exercise, name) {
    this.set('updateActive', true);
    this.set('currentExercise', exercise);
    this.set('currentExerciseName', name);
  },

  saveExercise: function () {
    var exercise = this.get('currentExercise'),
        _this = this,
        requestData = {
          user: App.currentUser,
          av_exercise_id: exercise.av_exercise_id._id,
          id: exercise._id,
          weight: exercise.weight,
          reps: exercise.reps
        };
    
    $.ajax({
      url: "http://api.trackga.in/exercises/"+exercise._id,
      data: requestData,
      type: "PUT"
    })
      .done(function (data) {
        _this.getExerciseList(App.currentUser).done(function (data) {
          _this.set('exerciseList', data.exercises);
          _this.cancel();
        });
      });
  },

  deleteExercise: function () {
    var exercise = this.get('currentExercise'),
        _this = this;
    if (confirm('You sure you want to delete it boss?')) {
      $.ajax({
        type: "DELETE",
        url: "http://api.trackga.in/exercises/"+exercise._id,
      }).done(function (data) {
          _this.getExerciseList(App.currentUser).done(function (data) {
            _this.set('exerciseList', data.exercises);
            _this.cancel();
          });
        });  
    };
    
  },

  exerciseTypeahead: function () {
    var timer = this.get('debouncedTimer'),
        exerciseName = this.get('exerciseName'),
        hasSelected = this.get('hasSelected'),
        _this = this,
        getExercises = function () {
          if (!hasSelected) {
            $.get('http://localhost:3000/exercises/available?name='+exerciseName).done(function (data) {
              var list = data.availableExercises;
              _this.set('availableExercises', list);
              _this.set('typeaheadResults', true);
            });
          }

          if (exerciseName === '') {
            _this.set('hasSelected', false);
            _this.set('typeaheadResults', false);
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