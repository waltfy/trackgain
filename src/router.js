App = Ember.Application.create();

App.name = 'Trackga.in';
App.currentUser = '51f412c4f758161996000001';

App.Router.map(function() {
  this.route('measure');
});