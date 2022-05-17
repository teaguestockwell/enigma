import { getRotors } from './data';
import { shift, connect, decodeChar, encodeChar, getEnigma, Rotor } from './enigma';

const base = {
  rotorOptions: [
    {
      id: 0,
      offset: 0,
    },
    {
      id: 1,
      offset: 0,
    },
    {
      id: 2,
      offset: 0,
    },
    {
      id: 3,
      offset: 0,
    },
    {
      id: 4,
      offset: 0,
    },
  ]
};

it('encode chars', () => {
  expect(encodeChar('a')).toBe(0);
  expect(encodeChar('z')).toBe(25);
});

it('decode chars', () => {
  expect(decodeChar(25)).toBe('z');
  expect(decodeChar(0)).toBe('a');
});

it('shifts rotor offsets to a ceiling', () => {
  expect(shift({
    subject: 26,
    floor: 0,
    ceiling: 25,
  })).toBe(0);
})

it('shifts rotor offsets to a floor', () => {
  expect(shift({
    subject: -1,
    floor: 0,
    ceiling: 25,
  })).toBe(25);
})

it('does not shift rotor offsets when they are within bounds', () => {
  expect(shift({
    subject: 1,
    floor: 0,
    ceiling: 25,
  })).toBe(1);
})

const cases: [number, number, Rotor][] = [];

for (let location = 0; location < 26; location++) {
  for (const rotor of getRotors()) {
    for (let offset = 0; offset < rotor.wires.length - 1; offset++) {
      cases.push([location, offset, rotor]);
    }
  }
}

it.each(cases)(
  'connects electric location %i at offset %i rotor x',
  (location, offset, rotor) => {
    rotor.offset = offset;

    const forwardResult = connect({
      direction: 'normal',
      location,
      rotor,
    });
    const backwardResult = connect({
      direction: 'reflected',
      location: forwardResult,
      rotor,
    });

    expect(backwardResult).toBe(location);
  }
);

it('makes an enigma', () => {
  const enigma = getEnigma({...base, variant: 'decode'});
  expect(enigma).toBeDefined()
})

it('spin rotors after each char encoding', () => {
  const enigma = getEnigma({...base, variant: 'encode'});

  const res0 = enigma.write('a');
  const res1 = enigma.write('a');

  expect(res0).not.toBe(res1);
});

it('encodes', () => {
  const enigma = getEnigma({...base, variant: 'encode'});

  const text = 'helloworld';
  const encoded = enigma.write(text);

  expect(encoded).not.toBe(text);
});

it('encodes differently based on its config', () => {
  const text = 'helloworld';

  const e0 = getEnigma({...base, variant: 'encode'}).write(text);
  const e1 = getEnigma({rotorOptions: [{id: 1, offset: 0}, {id: 3, offset: 20}], variant: 'encode'}).write(text);

  expect(e0).not.toBe(e1);
})

it('encodes and decodes 1 char', () => {
  const text = 'a';

  const encoded = getEnigma({ ...base, variant: 'encode' }).write(text);
  const decoded = getEnigma({ ...base, variant: 'decode' }).write(encoded);

  expect(encoded).not.toBe(text);
  expect(decoded).toBe(text);
});

it('encodes and decodes many chars', () => {
  const text = 'a'.repeat(1000);

  const encoded = getEnigma({ ...base, variant: 'encode' }).write(text);
  const decoded = getEnigma({ ...base, variant: 'decode' }).write(encoded);

  expect(encoded).not.toBe(text);
  expect(decoded).toBe(text);
});
