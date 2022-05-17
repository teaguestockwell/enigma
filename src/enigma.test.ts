import { getEnigma } from './enigma';

describe('enigma', () => {
  it('spin rotors after each char encoding', () => {
    const enigma = getEnigma({
      initialCypher: [0, 0, 0],
      rotorOrder: [0, 1, 2],
    });
    const res0 = enigma.code('a');
    const res1 = enigma.code('a');
    expect(res0).not.toBe(res1);
  });

  it('encodes', () => {
    const enigma = getEnigma({
      initialCypher: [0, 0, 0],
      rotorOrder: [0, 1, 2],
    });
    expect(enigma.code('abc')).not.toBe('abc');
  });

  it('encodes and decodes 1 char', () => {
    const config = {
      initialCypher: [0, 0, 0, 0, 0],
      rotorOrder: [0, 1, 2, 3, 4],
    };
    const text = 'a';
    const encoded = getEnigma(config).code(text);
    const decoded = getEnigma(config).code(encoded);

    expect(text).toBe(decoded);
  });

  it('encodes and decodes many chars', () => {
    const config = {
      initialCypher: [0, 0, 0, 0, 0],
      rotorOrder: [0, 1, 2, 3, 4],
    };
    const encoder = getEnigma(config);
    const decoder = getEnigma(config);

    expect(decoder.code(encoder.code('abcdefghijklmnopqrstuvwxyz'))).toBe(
      'abcdefghijklmnopqrstuvwxyz'
    );
  });
});
