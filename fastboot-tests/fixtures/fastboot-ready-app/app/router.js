import Ember from 'ember';
import config from './config/environment';

const { Router: EmberRouter } = Ember;

const Router = EmberRouter.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('protected');
  this.route('authenticate');
  this.route('invalidate');
  this.route('callback');
});

export default Router;
