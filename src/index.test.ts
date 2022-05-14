import { getEnigma } from '.'

it('initialize state', () => {
  const enigma = getEnigma('a'.repeat(2))
  expect(enigma.state).toEqual(['a', 'a'])
})

it('spins first rotor', () => {
  const enigma = getEnigma('a'.repeat(2))
  enigma.encode('a'.repeat(2))
  expect(enigma.state).toEqual(['c', 'a'])
})

it('has a rolling shift', () => {
  const enigma = getEnigma('a'.repeat(2))
  const one = enigma.encode('a'.repeat(2))
  const two = enigma.encode('a'.repeat(2))
  expect(one).not.toEqual(two)
})

it('spins next rotor', () => {
  const enigma = getEnigma('a'.repeat(3))
  enigma.encode('a'.repeat(26))
  expect(enigma.state).toEqual(['a','b', 'a'])
})