App.ApplicationRoute = Ember.Route.extend({

  model: function () {
    return $.get('http://api.trackga.in/log/exercises/52017180b985c46ba2970ccd?user='+App.currentUser);
  },

  setupController: function (controller, model) {
    controller.set('exerciseLog', model.exercises);
  }
});