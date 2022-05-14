const rotor = {
  'a': 'e',
  'b': 'k',
  'c': 'm',
  'd': 'f',
  'e': 'l',
  'f': 'g',
  'g': 'd',
  'h': 'q',
  'i': 'v',
  'j': 'z',
  'k': 'n',
  'l': 't',
  'm': 'o',
  'n': 'w',
  'o': 'y',
  'p': 'h',
  'q': 'x',
  'r': 'u',
  's': 's',
  't': 'p',
  'u': 'a',
  'v': 'i',
  'w': 'b',
  'x': 'r',
  'y': 'c',
  'z': 'j',
} as const

type Char = keyof typeof rotor

type Enigma = {
  state: Char[],
  rotors: typeof rotor[]
  encode: (input: string) => string
}

const validateChars = (input: string) => {
  if (input.split('').some(c => c.charAt(0) < 'a'.charAt(0) || c.charAt(0) > 'z'.charAt(0))) {
    throw new Error('cypher must be a through z')
  }
}

export const getEnigma = (cypher: string): Enigma => {
  validateChars(cypher)
  const enigma: Enigma = {
    state: cypher.split('') as Char[],
    rotors: Array.from({length: cypher.length}, (_, i) => ({...rotor, topDeadCenter: cypher.charCodeAt(i)})),
    encode: (input: string) => {
      validateChars(input)
      const {rotors, state} = enigma
      let res = ''
  
      const spin = (topDeadCenter: string) => {
        return topDeadCenter.charCodeAt(0) === 122 ? 'a' : String.fromCharCode(topDeadCenter.charCodeAt(0) + 1) as Char
      }
  
      for (let i = 0; i < input.length; i++) {
        const char = input[i] as Char
        const firstKey = rotors[0][state[0]]
        let encoded = state[0]
        state[0] = spin(state[0])
        for (let j = 1; j < rotors.length; j++) {
          if (state[j - 1] === 'a') {
            state[j] = spin(state[j])
          }
          encoded = rotors[j][encoded]
          console.log({ encoded, char })
        }
        res += encoded
      }
      return res
    }
  }
  return enigma
}
