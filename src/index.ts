export const getEnigma = (cypher: string) => {
  const enigma = {
    state: cypher.split(''),
    encode: (input: string) => {
      const { state } = enigma
      let res = ''

      for (const char of input) {
        let encoded = char

        for (let stateI = 0; stateI < state.length; stateI++) {
          const next = state[stateI] === 'z' ? 'a' : String.fromCharCode(state[stateI].charCodeAt(0) + 1)
          state[stateI] = next
          if (next !== 'a') {
            break
          }
        }

        for (let rotorI = 0; rotorI < state.length; rotorI++) {
          encoded = String.fromCharCode(((encoded.charCodeAt(0) - 97 + state[rotorI].charCodeAt(0) + 7) % 26) + 97)
        }

        res += encoded
      }

      return res
    }
  }
  return enigma
}
