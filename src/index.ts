export const getEnigma = (cypher: string) => {
  const e = {
    state: cypher,
    encode: (s: string) => {
      const isInValid = (c: string) => c.charCodeAt(0) < 97 || c.charCodeAt(0) > 122
      
      for (const c of s) {
        if (isInValid(c)) {
          throw new Error('Invalid character in encode string')
        }
      }

      for (const c of e.state) {
        if (isInValid(c)) {
          throw new Error('Invalid character in state string')
        }
      }


      let res = ''

      for (const c of s) {
        let encodeBuilder = c

        for (let i = 0; i < e.state.length; i++) {
          const next = e.state[i] === 'z' ? 'a' : String.fromCharCode(e.state[i].charCodeAt(0) + 1)
          e.state = e.state.slice(0, i) + next + e.state.slice(i + 1)
          if (next !== 'a') {
            break
          }
        }

        for (let i = 0; i < e.state.length; i++) {
          encodeBuilder = String.fromCharCode(((encodeBuilder.charCodeAt(0) - 97 + e.state[i].charCodeAt(0) + 7) % 26) + 97)
        }

        res += encodeBuilder
      }

      return res
    }
  }
  return e
}
