App.ApplicationController = Ember.Controller.extend({
  dropDownExtended: false,

  showDropdown: function () {
    var dropdownState = this.get('dropDownExtended');
    (dropdownState) ? this.set('dropDownExtended', false) : this.set('dropDownExtended', true);
  }
});