App.Select2View = Ember.Select.extend({
  placeholder: null,

  didInsertElement: function () {
    this.$().select2({width: '90%', placeholder: this.get('placeholder')});
  },
});