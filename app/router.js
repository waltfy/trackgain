App = Ember.Application.create();
App.name = 'Trackga.in';
App.availablePlots = ['Bench Press', 'Squats'];

App.Router.map(function() {
  this.route('measure');
});