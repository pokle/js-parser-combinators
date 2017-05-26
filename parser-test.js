const {expect} = require('chai');
const {literal, optional, seq, param} = require('./parser');

describe('parse literal', () => {
  const blahParser = literal('blah');

  it('should parse blah', () => {
    expect(blahParser({input: 'blah', ast: {}})).to.deep.equal({
      input: '',
      ast: {},
    });
  });

  it('should parse blahfoo, leaving foo and ast', () => {
    expect(blahParser({input: 'blahfoo', ast: {a: 1}})).to.deep.equal({
      input: 'foo',
      ast: {a: 1},
    });
  });

  it('should not parse gah', () => {
    expect(blahParser({input: 'gah', ast: {}})).to.deep.equal({
      error: 'expected blah, but got gah...',
    });
  });
});

describe('parse optional', () => {
  const parser = optional(literal('blah'));

  it('should parse optional literal blah', () => {
    expect(parser({input: 'blahfoo', ast: {a: 1}})).to.deep.equal({
      input: 'foo',
      ast: {a: 1},
    });
  });

  it('should parse gah by ignoring it', () => {
    expect(parser({input: 'gah', ast: {}})).to.deep.equal({
      input: 'gah',
      ast: {},
    });
  });
});

describe('parse seq', () => {
  const parser = seq(literal('a'), literal('b'), literal('c'));

  it('should parse abcd, leaving behind d', () => {
    expect(parser({input: 'abcd', ast: {}})).to.deep.equal({
      input: 'd',
      ast: {},
    });
  });

  it('should not parse abdef', () => {
    expect(parser({input: 'abdef', ast: {}})).to.deep.equal({
      error: 'expected c, but got d...',
    });
  });
});

describe('parse param', () => {
  const parser = param('userid', /^\d{1,3}/, parseInt);

  it('should parse 12f, taking 12, and leaving behind f', () => {
    expect(parser({input: '12f', ast: {a: 1}})).to.deep.equal({
      input: 'f',
      ast: {userid: 12, a: 1},
    });
  });

  it('should not parse abdef', () => {
    expect(parser({input: 'abdef', ast: {a: 1}})).to.deep.equal({
      error: 'Did not match /^\\d{1,3}/',
    });
  });
});
