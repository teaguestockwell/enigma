import { getEnigma } from '.'

const enigma = getEnigma('a'.repeat(3))
let res0: string
let res1: string

it('spins first rotor', () => {
  res0 = enigma.encode('a'.repeat(2))
  console.log(res0)
  expect(enigma.state[0]).toBe('c')
})

it('has a rolling shift', () => {
  res1 = enigma.encode('a'.repeat(2))
  console.log(res1)
  expect(res1).not.toEqual(res0)
})

it('spins next rotor', () => {
  const enigma2 = getEnigma('a'.repeat(3))
  enigma2.encode('a'.repeat(24))
  console.log(enigma2.state)
})