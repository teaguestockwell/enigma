const caesarShift = (char: string, amount: number):string => {
  if (!char.length || char.length > 1) {
    throw new Error('Invalid cesar shift');
  }

  if (amount < 0) {
    return caesarShift(char, amount + 26)
  }

  return String.fromCharCode(((char.charCodeAt(0) - 97 + amount) % 26) + 97)
}

export const getEnigma = (cypher: string) => {
  const enigma = {
    state: cypher.split(''),
    encode: (input: string) => {
      const { state } = enigma
      let res = ''

      const spin = (s: string) => s === 'z' ? 'a' : String.fromCharCode(s.charCodeAt(0) + 1)
      
      for (let charI = 0; charI < input.length; charI++) {
        let encoded = input[charI]
        state[0] = spin(state[0].charAt(0))
        for (let rotorI = 1; rotorI < state.length; rotorI++) {
          if (state[rotorI - 1] === 'a') {
            state[rotorI] = spin(state[rotorI])
          }
          encoded = caesarShift(encoded, state[rotorI].charCodeAt(0) + 13)
        }
        res += encoded
      }
      return res
    }
  }
  return enigma
}
