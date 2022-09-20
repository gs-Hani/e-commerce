const {assert} = require('chai');

describe('User visits root', () => {
  describe('without existing messages', () => {
    it('page starts blank', () => {
      browser.url('/');
    });
  });
});