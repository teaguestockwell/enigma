import { getEnigma } from '.'

it('initialize state', () => {
  const enigma = getEnigma('a'.repeat(2))
  expect(enigma.state).toEqual('aa')
})

it('spins first rotor', () => {
  const enigma = getEnigma('a'.repeat(2))
  enigma.encode('a'.repeat(2))
  expect(enigma.state).toEqual('ca')
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
  expect(enigma.state).toEqual('aba')
})

it('will encode the same with the same cypher', () => {
  const cypher = 'aksjdiuygwaaisd'
  const enigmaOne = getEnigma(cypher)
  const enigmaTwo = getEnigma(cypher)
  expect(enigmaOne.encode('a'.repeat(26))).toEqual(enigmaTwo.encode('a'.repeat(26)))
})

it('will throw when the cypher is not a though z', () => {
  expect(() => getEnigma('1').encode('a')).toThrow()
  const enigma = getEnigma('a')
  enigma.state = '1'
  expect(() => enigma.encode('a')).toThrow()
})

it('will throw when the encode string is not a though z', () => {
  expect(() => getEnigma('a').encode('1')).toThrow()
})

it('encodes long string with lots of rotors', () => {
  const enigma = getEnigma('a'.repeat(30))
  const one = enigma.encode('a'.repeat(1000 * 100))
  const two = enigma.encode('a'.repeat(1000 * 100))
  expect(one).not.toEqual(two)
})
