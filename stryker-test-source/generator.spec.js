var generate = require('./generator.component');

describe('PrimeFactorGenerator', () => {
  it('1 generates empty list', () => {
    expect(generate(1)).toEqual([]);
  });

  it('2 generates [2]', () => {
    expect(generate(2)).toEqual([2]);
  });
});
