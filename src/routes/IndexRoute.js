App.IndexRoute = Ember.Route.extend({
  setupController: function (controller, model) {
    // Get the available exercises
    $.get('http://localhost:3000/exercises/available').done(function (data) {
      var list = data.availableExercises;
      controller.set('availableExercises', list);
      console.log(list);
    });
  }
});