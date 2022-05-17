import { getEnigma } from './enigma';

describe('enigma', () => {
  it('spin rotors after each char encoding', () => {
    const enigma = getEnigma({
      initialCypher: [0, 0, 0],
      rotorOrder: [0, 1, 2],
      variant: 'encode',
    });
    const res0 = enigma.write('a');
    const res1 = enigma.write('a');
    expect(res0).not.toBe(res1);
  });

  it('encodes', () => {
    const enigma = getEnigma({
      initialCypher: [0, 0, 0],
      rotorOrder: [0, 1, 2],
      variant: 'encode',
    });
    expect(enigma.write('abc')).not.toBe('abc');
  });

  it('encodes and decodes 1 char', () => {
    const base = {
      initialCypher: [0, 0, 0, 0, 0],
      rotorOrder: [0, 1, 2, 3, 4],
    };
    const text = 'a';

    const encoded = getEnigma({ ...base, variant: 'encode' }).write(text);
    const decoded = getEnigma({ ...base, variant: 'decode' }).write(encoded);

    expect(encoded).not.toBe(text);
    expect(decoded).toBe(text);
  });

  it('encodes and decodes many chars', () => {
    const base = {
      initialCypher: [0, 0, 0, 0, 0],
      rotorOrder: [0, 1, 2, 3, 4],
    };
    const text = 'a'.repeat(1000);

    const encoded = getEnigma({ ...base, variant: 'encode' }).write(text);
    const decoded = getEnigma({ ...base, variant: 'decode' }).write(encoded);

    expect(encoded).not.toBe(text);
    expect(decoded).toBe(text);
  });
});
