require('util').inspect.defaultOptions.depth = null

import { seek, spin, Rotor, shift, getRotors, getSelectedRotors, setCypher, charToCode, codeToChar, getEnigma } from './rotor';

const getSmRotor = (): Rotor => [[1,3],[2,4],[4,2], [3,4]]

const getSmRotors = () => [
  [
      [3, 0], 
      [2, 4], 
      [4, 2], 
      [0, 3], 
      [1, 1]
  ],
  [
      [1, 4], 
      [3, 2], 
      [2, 1], 
      [4, 0], 
      [0, 3]
  ],
  [
      [0, 4], 
      [3, 1], 
      [1, 2], 
      [4, 3], 
      [2, 0]
  ],
]

it('gets char codes', () => {
  expect(charToCode('a')).toBe(0)
  expect(charToCode('z')).toBe(25)
  expect(codeToChar(25)).toBe('z')
  expect(codeToChar(0)).toBe('a')
})

it('spins rotor', () => {
  const r = getSmRotor()
  spin(r)
  expect(r).toEqual([[2,4],[4,2], [3,4], [1,3]])
})

it('spins rotor until target connection input is first', () => {
  const r = getSmRotor()
  seek(4, r);
  expect(r).toEqual([[4,2],[3,4],[1,3],[2,4]]);
});

it('applies circular caesar shifts on chars a - z where a = 0 and z = 25', () => {
  expect(shift(25, 1)).toBe(0)
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

it('it encodes a char', () => {
  const enigma = getEnigma({
    initialCypher: [0,0,0],
    rotorOrder: [0, 1, 2],
    rotors: getSmRotors() as Rotor[]
  })

  expect(enigma.code('a')).toBeDefined()
})

it('spin rotors after each char encoding', () => {
  const enigma = getEnigma({
    initialCypher: [0,0,0],
    rotorOrder: [0, 1, 2],
  })

  expect(enigma.code('a')).not.toBe(enigma.code('a'))
})

it('encodes and decodes 1 char 3 rotors', () => {
  const config = {
    initialCypher: [0,0,0],
    rotorOrder: [0, 1, 2],
  }
  const encoder = getEnigma(config)
  const decoder = getEnigma(config)
  
  expect(decoder.code(encoder.code('a'))).toBe('a')
})

it('encodes and decodes 1 char 5 rotors', () => {
  const config = {
    initialCypher: [1,25,0,20,2],
    rotorOrder: [4,3,1,2,0],
  }
  const encoder = getEnigma(config)
  const decoder = getEnigma(config)
  
  expect(decoder.code(encoder.code('a'))).toBe('a')
})

it('encodes and decodes many chars', () => {
  const config = {
    initialCypher: [1,2,3,4],
    rotorOrder: [0, 1, 2, 3],
  }
  const encoder = getEnigma(config)
  const decoder = getEnigma(config)
  
  expect(decoder.code(encoder.code('a'.repeat(1)))).toBe('a'.repeat(1))
})
