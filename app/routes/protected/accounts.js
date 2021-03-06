import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  beforeModel() {
    return this.store.findAll('account');
  },

  model() {
    return Ember.RSVP.hash({
      accounts: this.store.peekAll('account'),
      rootAccount: this.store.peekRecord('account', 'ROOT')
    });
  }
});
