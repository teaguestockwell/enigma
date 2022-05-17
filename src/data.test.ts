import { getRandomRotor, getRotors } from './data';

it('makes valid rotors', () => {
  const r = getRandomRotor(26);
  const seenInputs = new Set<number>();
  const seenOutputs = new Set<number>();

  expect(r.wires.length).toBe(26);

  for (const wire of r.wires) {
    // a rotor may never encode fn(x) => x,
    // because after it advances,
    // it will break the cyphers symmetry
    expect(wire.input).not.toBe(wire.output);
    expect(seenInputs.has(wire.input)).toBe(false);
    expect(seenOutputs.has(wire.output)).toBe(false);

    seenInputs.add(wire.input);
    seenOutputs.add(wire.output);
  }

  new Array(5).fill(0).forEach(() => {
    const r = getRandomRotor(26);
    console.log(r);
  });
});

it('has valid rotors', () => {
  const rotors = getRotors();
  const ids = new Set<number>();
  rotors.forEach(r => {
    expect(ids.has(r.id)).toBe(false);
    ids.add(r.id);
  });
  expect(ids.size).toBe(rotors.length);
});
