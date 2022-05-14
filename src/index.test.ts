import { getEnigma } from '.'

it('makes rotors', () => {
  const enigma = getEnigma('a'.repeat(10))
  expect(enigma.rotors).toHaveLength(10)
})

it('spins rotors', () => {
  const enigma = getEnigma('a'.repeat(10))
  console.log(enigma.encode('a'.repeat(2)))
  expect(enigma.state[0]).toBe('a')
})