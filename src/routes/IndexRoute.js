App.IndexRoute = Ember.Route.extend({
  setupController: function (controller) {
    $.get('http://api.trackga.in/exercises?user='+App.currentUser).then(function (data) {
      controller.set('exerciseList', data.exercises);
    });
  }
});