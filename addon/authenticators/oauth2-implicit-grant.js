import Ember from 'ember';
import BaseAuthenticator from './base';

const {
  RSVP,
  isEmpty
} = Ember;

/**
 Authenticator that conforms to OAuth 2
 ([RFC 6749](http://tools.ietf.org/html/rfc6749)), specifically the _"Implicit
 Grant Type"_.

 @class OAuth2ImplicitGrantAuthenticator
 @module ember-simple-auth/authenticators/oauth2-implicit-grant
 @extends BaseAuthenticator
 @public
 */
export default BaseAuthenticator.extend({
  /**
   Restores the session from a session data object; __will return a resolving
   promise when there is a non-empty `access_token` in the session data__ and
   a rejecting promise otherwise.

   @method restore
   @param {Object} data The data to restore the session from
   @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming or remaining authenticated
   @public
   */
  restore(data) {
    return new RSVP.Promise((resolve, reject) => {
      if (!this._validateData(data)) {
        return reject('Could not restore session - "access_token" missing.');
      }

      return resolve(data);
    });
  },

  /**
   Authenticates the session using the specified location `hash`
   (see https://tools.ietf.org/html/rfc6749#section-4.2.2).

   __If the access token is valid and thus authentication succeeds, a promise that
   resolves with the access token is returned__, otherwise a promise that rejects
   with the error code as returned by the server is returned
   (see https://tools.ietf.org/html/rfc6749#section-4.2.2.1).

   @method authenticate
   @param {Object} hash The location hash
   @return {Ember.RSVP.Promise} A promise that when it resolves results in the session becoming authenticated
   @public
   */
  authenticate(hash) {
    return new RSVP.Promise((resolve, reject) => {
      if (hash.error) {
        reject(hash.error);
      } else if (!this._validateData(hash)) {
        reject('Invalid auth params - "access_token" missing.');
      } else {
        resolve(hash);
      }
    });
  },

  /**
   This method simply returns a resolving promise.

   @method invalidate
   @return {Ember.RSVP.Promise} A promise that when it resolves results in the session being invalidated
   @public
   */
  invalidate() {
    return RSVP.Promise.resolve();
  },

  _validateData(data) {
    // see https://tools.ietf.org/html/rfc6749#section-4.2.2

    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    return !isEmpty(data) &&
      !isEmpty(data.access_token);
    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
  }
});
