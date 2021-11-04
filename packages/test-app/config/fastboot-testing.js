let najax;
try {
  // eslint-disable-next-line node/no-missing-require
  najax = require('najax');
} catch (err) {
  // ignore the error
}

module.exports = {
  buildSandboxGlobals(defaultGlobals) {
    return Object.assign({}, defaultGlobals, {
      najax
    });
  }
};
