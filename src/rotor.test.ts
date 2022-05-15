import { seek, spin, Rotor, shift, getRotors, getSelectedRotors, setCypher } from './rotor';

const getSmallRotor = (): Rotor => [[1,3],[2,4],[4,2], [3,4]]

it('spins rotor', () => {
  const r = getSmallRotor()
  spin(r)
  expect(r).toEqual([[2,4],[4,2], [3,4], [1,3]])
})

it('spins rotor until target connection input is first', () => {
  const r = getSmallRotor()
  seek(4, r);
  expect(r).toEqual([[4,2],[3,4],[1,3],[2,4]]);
});

it('applies circular caesar shifts onn chars a - z where a = 0 and z = 25', () => {
  expect(shift(25, 1)).toBe(0)
  expect(shift(1, -1)).toBe(0)
  expect(shift(25, 26)).toBe(25)
})

it('selects the correct rotors', () => {
  const all = getRotors()
  const selected = getSelectedRotors([2,1,4])
  expect(selected[0]).toEqual(all[2])
  expect(selected[1]).toEqual(all[1])
  expect(selected[2]).toEqual(all[4])
})

it('sets the cypher state on the rotors', () => {
  const all = getRotors()
  const cypher = Array.from({length: all.length}, () => 0)
  setCypher(all, cypher)
  for (const r of all) {
    expect(r[0][0]).toBe(0)
  }
})