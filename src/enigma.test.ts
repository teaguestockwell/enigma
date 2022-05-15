import { getEnigma } from './enigma'

it('spin rotors after each char encoding', () => {
  const enigma = getEnigma({
    initialCypher: [0, 0, 0],
    rotorOrder: [0, 1, 2],
  });
  expect(enigma.code('a')).not.toBe(enigma.code('a'));
});

it('encodes', () => {
  const enigma = getEnigma({
    initialCypher: [0, 0, 0],
    rotorOrder: [0, 1, 2],
  });
  expect(enigma.code('abc')).not.toBe('abc')
})

it('encodes and decodes 1 char', () => {
  const config = {
    initialCypher: [0, 0, 0, 0, 0],
    rotorOrder: [0, 1, 2, 3, 4],
  };
  const encoder = getEnigma(config);
  const decoder = getEnigma(config);

  expect(decoder.code(encoder.code('z'))).toBe('z');
});

it('encodes and decodes many chars', () => {
  const config = {
    initialCypher: [0, 0, 0, 0, 0],
    rotorOrder: [0, 1, 2, 3, 4],
  }
  const encoder = getEnigma(config);
  const decoder = getEnigma(config);

  expect(decoder.code(encoder.code('abcdefghijklmnopqrstuvwxyz'))).toBe('abcdefghijklmnopqrstuvwxyz');
})
