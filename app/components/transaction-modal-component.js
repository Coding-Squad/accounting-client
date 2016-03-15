import Ember from 'ember';

export default Ember.Component.extend({
  store: Ember.inject.service(),
  occurredOn: new Date(),
  description: '',
  entries: Ember.A(),

  init() {
    this._addEntry();
    this._addEntry();
    return this._super(...arguments);
  },

  _addEntry() {
    let entries = this.get('entries');
    let previousLastEntry = entries.get('lastObject');

    if (previousLastEntry) {
      previousLastEntry.set('last', false);
    }

    entries.pushObject(Ember.Object.create({accountId: '', last: true}));
  },

  actions: {
    addEntry() {
      this._addEntry();
    },

    cancel() {
      this.set('show', false);
    },

    post() {
      let store = this.get('store');
      let transaction = store.createRecord('transaction', {
        occurredOn: this.get('occurredOn'),
        description: this.get('description'),
        entries: this.get('entries')
      });
      transaction.save();
      this.set('show', false);
    }
  }
});
