// ascii a-z
export const charCodes = [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122] as const
const getCharCodes = () => Array.from({length: charCodes.length}, (_, i) => charCodes[i])
export type CharCode = typeof charCodes[number]

export type Rotor = {
  // y: input, x: output
  connections: Record<CharCode,CharCode>;
  topDeadCenter: CharCode;
}

export const getPermutations = <T>(arr: T[], limit?: number): T[][] => {
  const result: T[][] = [];

  const permute = (arr: T[], m = [] as T[]) => {
    if (arr.length === 0) {
      result.push(m)
      return
    }

    for (let i = 0; i < arr.length; i++) {
      const curr = arr.slice();
      const next = curr.splice(i, 1);
      if (limit !== undefined && result.length !== limit) {
        permute(curr.slice(), m.concat(next))
      }
    }
  }

 permute(arr)

 return result;
}

const getHashCode = (s: string, range: number) => {
  let acc = 0;
  for(const c of s) {
    acc += c.charCodeAt(0)
  }
  return Math.abs(acc % range)
}

const connectionPermutationsKeys = getPermutations(getCharCodes(), 100 * 1000)
const connectionPermutationsValues = getPermutations(getCharCodes().reverse(), 100 * 1000)

export const getRotorConnections = (hash: string): Record<CharCode,CharCode> => {
  const keysIndex = getHashCode(hash, Math.floor(connectionPermutationsKeys.length / 4))
  const valuesIndex = keysIndex * 4
  const keys = connectionPermutationsKeys[keysIndex]
  const values = connectionPermutationsValues[valuesIndex]
  return keys.reduce((acc, key, i) => {
    acc[key] = values[i]
    return acc
  }, {} as Record<CharCode,CharCode>)
}

export const getRotors = (hashes: string[]) => hashes.map(getRotorConnections)
