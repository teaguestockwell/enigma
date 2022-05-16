import {
  connect,
  getRandomRotor,
  getRotors,
  getSelectedRotors,
  Rotor,
  seek,
  setCypher,
  spin,
} from './rotor';

const getSmRotor = (): Rotor => ({
  id: 1,
  offset: 0,
  wires: [
    { input: 0, output: 3 },
    { input: 1, output: 4 },
    { input: 2, output: 2 },
    { input: 3, output: 0 },
  ],
});

it('resolves connections', () => {
  const rotor = getSmRotor()
  rotor.offset = 2
  const start = 0
  
  const forwardResult = connect({
    direction: 'normal',
    location: 0,
    rotor,
  })
  const backwardResult = connect({
    direction: 'reflected',
    location: forwardResult,
    rotor,
  })

  expect(backwardResult).toBe(start)
})

const length = 5
const rot = getRandomRotor(length)
it.each(Array.from({length}, (_, i) => i))('resolves connection %i', (i) => {
  rot.offset = Math.floor(Math.random() * length)
  
  const forwardResult = connect({
    direction: 'normal',
    location: i,
    rotor: rot,
  })
  const backwardResult = connect({
    direction: 'reflected',
    location: forwardResult,
    rotor: rot,
  })

  expect(backwardResult).toBe(i)
})

it('spins rotor', () => {
  const r = getSmRotor();
  spin(r);
  expect(r).toEqual({
    id: 1,
    offset: 1,
    wires: [
      { input: 0, output: 3 },
      { input: 1, output: 4 },
      { input: 2, output: 2 },
      { input: 3, output: 0 },
    ],
  });
})

it('seeks rotor position', () => {
  const r = getSmRotor();
  seek(3, r);
  expect(r).toEqual({
    id: 1,
    offset: 3,
    wires: [
      { input: 0, output: 3 },
      { input: 1, output: 4 },
      { input: 2, output: 2 },
      { input: 3, output: 0 },
    ],
  });
})

it('sets the cypher state on the rotors', () => {
  const all = getRotors();
  const cypher = Array.from({ length: all.length }, () => 0);
  setCypher(all, cypher);
  for (let i = 0; i < all.length; i++) {
    expect(all[i].offset).toBe(cypher[i]);
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

  // new Array(5).fill(0).forEach(() => {
  //   const r = getRandomRotor(26);
  //   console.log(r)
  // })
});
