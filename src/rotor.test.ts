import {
  getRandomRotor,
  getRotors,
  getSelectedRotors,
  Rotor,
  seek,
  setCypher,
  spin,
} from './rotor';

const getSmRotor = (): Rotor => [
  { id: 0, input: 0, output: 3 },
  { id: 1, input: 1, output: 4 },
  { id: 2, input: 2, output: 2 },
  { id: 3, input: 3, output: 0 },
];

it('spins rotor', () => {
  const r = getSmRotor();
  spin(r);
  expect(r).toEqual([
    { id: 1, input: 1, output: 4 },
    { id: 2, input: 2, output: 2 },
    { id: 3, input: 3, output: 0 },
    { id: 0, input: 0, output: 3 },
  ]);
});

it('seeks rotor position', () => {
  const r = getSmRotor();
  seek(3, r);
  expect(r).toEqual([
    { id: 3, input: 3, output: 0 },
    { id: 0, input: 0, output: 3 },
    { id: 1, input: 1, output: 4 },
    { id: 2, input: 2, output: 2 },
  ])
});

it('sets the cypher state on the rotors', () => {
  const all = getRotors();
  const cypher = Array.from({ length: all.length }, () => 0);
  setCypher(all, cypher);
  for (const r of all) {
    expect(r[0].id).toBe(0);
  }
});

it('selects the correct rotors', () => {
  const all = getRotors();
  const selected = getSelectedRotors([2, 1, 4]);
  expect(selected[0]).toEqual(all[2]);
  expect(selected[1]).toEqual(all[1]);
  expect(selected[2]).toEqual(all[4]);
});

it('makes valid rotors', () => {
  const r = getRandomRotor();
  const seenIds = new Set<number>();
  const seenInputs = new Set<number>();
  const seenOutputs = new Set<number>();

  for (const wire of r) {
    // a rotor may never encode fn(x) => x,
    // because after it advances, 
    // it will break the cyphers symmetry
    expect(wire.input).not.toBe(wire.output);

    expect(seenIds.has(wire.id)).toBe(false);
    expect(seenInputs.has(wire.input)).toBe(false);
    expect(seenOutputs.has(wire.output)).toBe(false);

    seenIds.add(wire.id);
    seenInputs.add(wire.input);
    seenOutputs.add(wire.output);
  }

  // console.log(new Array(5).fill(0).map(getRandomRotor));
});
