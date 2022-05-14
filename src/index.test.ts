import { getPermutations, getRotorConnections, getRotors } from '.';

const factorial = (num: number) => {
  var rval = 1;
  for (var i = 2; i <= num; i++) {
    rval = rval * i;
  }
  return rval;
};

it('gets factorials', () => {
  expect(factorial(0)).toBe(1);
  expect(factorial(1)).toBe(1);
  expect(factorial(2)).toBe(2);
  expect(factorial(3)).toBe(6);
  expect(factorial(4)).toBe(24);
  expect(factorial(5)).toBe(120);
  expect(factorial(6)).toBe(720);
  expect(factorial(7)).toBe(5040);
  expect(factorial(8)).toBe(40320);
  expect(factorial(9)).toBe(362880);
  expect(factorial(10)).toBe(3628800);
});

describe('getCharPermutations', () => {
  it('permutes the given array', () => {
    const arr = [1, 2, 3];
    const p = getPermutations(arr, Infinity);
    expect(p.length).toBe(factorial(arr.length));
  });
  it('limits num of permutations', () => {
    const arr = [1, 2, 3];
    const p = getPermutations(arr, 4);
    expect(p.length).toBe(4);
  });
});

describe('get rotor connections', () => {
  it('connections are stable with the same hash', () => {
    const hash = 'cool-rotor-hash';
    const con1 = getRotorConnections(hash);
    const con2 = getRotorConnections(hash);
    expect(con1).toEqual(con2);
  })
  it('connections are not the same', () => {
    const con1 = getRotorConnections('cool-rotor-hash');
    const con2 = getRotorConnections('not-cool-rotor-hash');
    expect(con1).not.toEqual(con2);
  })
  it('makes lots of rotors', () => {
    const rotors = getRotors(['alskd;laksd;lkdad', 'lkasjdlkasjduuweruiyb23y9cb', 'kashjdvbqr87c', 'klah7', 'akhsduiuyaiosjdjkagsdojasd'])
    console.log(rotors)
    expect(rotors.length).toBe(5);
  })
})
