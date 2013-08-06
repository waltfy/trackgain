App.ApplicationController = Ember.Controller.extend({
  dropDownExtended: false,
  selectedPlot: null,
  availablePlots: ['All', 'Bench Press', 'Squats'],

  showDropdown: function () {
    var dropdownState = this.get('dropDownExtended');
    (dropdownState) ? this.set('dropDownExtended', false) : this.set('dropDownExtended', true);
  },

  getSelectedPlot: function () {
    var selectedPlot = this.get('selectedPlot');
  }.observes('selectedPlot'),
});