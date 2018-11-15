const crypto = require('crypto');

exports.testUser = {
  username: `test-runner__${crypto.randomBytes(8).toString('hex')}@tester.com`,
  password: `${crypto.randomBytes(12).toString('hex')}`,
}
