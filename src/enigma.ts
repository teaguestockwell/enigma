/**
 * a circular array of connections
 * connection[0] is the input
 * connection[1] is the index of the next rotor connection
 * connection[0] - connection[1] is the cesar shift to be applied
 */
export type Rotor = [number, number][];

export const charToCode = (char: string) => {
  const code = char.charCodeAt(0);
  if (code < 97 || code > 122) {
    throw new Error(`${char} is not a lowercase letter`);
  }
  return code - 97;
};

export const codeToChar = (code: number) => {
  if (code < 0 || code > 25) {
    throw new Error(`${code} is not a valid code`);
  }
  return String.fromCharCode(code + 97);
};

export const getRandomRotor = () => {
  const shifts = Array.from({ length: 26 }, (_, i) => i);
  const sets: [number, number][] = [];

  while (shifts.length) {
    const setIndex = 26 - shifts.length;
    const by = Math.floor(Math.random() * shifts.length);

    if (shifts[by] === setIndex) {
      continue;
    }

    sets.push([setIndex, shifts.splice(by, 1)[0]]);
  }

  return sets;
};

export const getRotors = (): Rotor[] => [
  [
    [0, 21],
    [1, 18],
    [2, 5],
    [3, 12],
    [4, 9],
    [5, 17],
    [6, 10],
    [7, 11],
    [8, 0],
    [9, 15],
    [10, 13],
    [11, 14],
    [12, 2],
    [13, 22],
    [14, 1],
    [15, 20],
    [16, 4],
    [17, 3],
    [18, 8],
    [19, 23],
    [20, 16],
    [21, 24],
    [22, 19],
    [23, 25],
    [24, 6],
    [25, 7],
  ],
  [
    [0, 15],
    [1, 24],
    [2, 6],
    [3, 25],
    [4, 10],
    [5, 18],
    [6, 16],
    [7, 17],
    [8, 22],
    [9, 4],
    [10, 7],
    [11, 20],
    [12, 0],
    [13, 8],
    [14, 5],
    [15, 1],
    [16, 14],
    [17, 11],
    [18, 3],
    [19, 21],
    [20, 13],
    [21, 12],
    [22, 19],
    [23, 2],
    [24, 23],
    [25, 9],
  ],
  [
    [0, 15],
    [1, 6],
    [2, 7],
    [3, 14],
    [4, 10],
    [5, 3],
    [6, 25],
    [7, 18],
    [8, 23],
    [9, 1],
    [10, 11],
    [11, 5],
    [12, 19],
    [13, 8],
    [14, 2],
    [15, 9],
    [16, 21],
    [17, 12],
    [18, 20],
    [19, 0],
    [20, 13],
    [21, 4],
    [22, 17],
    [23, 16],
    [24, 22],
    [25, 24],
  ],
  [
    [0, 13],
    [1, 6],
    [2, 25],
    [3, 14],
    [4, 1],
    [5, 11],
    [6, 22],
    [7, 2],
    [8, 10],
    [9, 4],
    [10, 16],
    [11, 9],
    [12, 24],
    [13, 3],
    [14, 5],
    [15, 7],
    [16, 23],
    [17, 21],
    [18, 0],
    [19, 12],
    [20, 19],
    [21, 18],
    [22, 17],
    [23, 8],
    [24, 20],
    [25, 15],
  ],
  [
    [0, 15],
    [1, 4],
    [2, 9],
    [3, 13],
    [4, 5],
    [5, 7],
    [6, 17],
    [7, 25],
    [8, 21],
    [9, 1],
    [10, 14],
    [11, 2],
    [12, 16],
    [13, 12],
    [14, 19],
    [15, 24],
    [16, 20],
    [17, 22],
    [18, 23],
    [19, 11],
    [20, 0],
    [21, 8],
    [22, 10],
    [23, 6],
    [24, 3],
    [25, 18],
  ],
];

/**
 * shift the rotor left
 */
export const spin = (rotor: Rotor) => {
  const temp = rotor.shift() as Rotor[number];
  rotor.push(temp);
};

/**
 * spin the rotor to set a char of the cypher
 */
export const seek = (tar: number, rotor: Rotor) => {
  while (rotor[0][0] !== tar) {
    spin(rotor);
  }
};

/**
 * apply a circular cesar shift of given index
 * a is index of 0
 * z is index of 25
 */
export const shift = (cur: number, by: number) => {
  return (cur + by) % 26;
};

/**
 * the operator may choose from pre made rotors
 */
export const getSelectedRotors = (rotorOrder: number[]) => {
  const allRotors = getRotors();
  return rotorOrder.reduce((acc, cur) => {
    acc.push(allRotors[cur]);
    return acc;
  }, [] as Rotor[]);
};

export const setCypher = (rotors: Rotor[], cypher: number[]) => {
  if (rotors.length !== cypher.length) {
    throw new Error('cypher length must match rotors');
  }

  for (let i = 0; i < cypher.length; i++) {
    seek(cypher[i], rotors[i]);
  }
};

export type EnigmaConfig = {
  initialCypher: number[];
  rotorOrder: number[];
  rotors?: Rotor[];
  verbose?: boolean;
};

export const getEnigma = (config: EnigmaConfig) => {
  const rotors = config.rotors ?? getSelectedRotors(config.rotorOrder);
  setCypher(rotors, config.initialCypher);
  let counter = 0;
  const logs: any[] = [];

  const e = {
    code: (s: string) => {
      let res = '';

      for (const c of s) {
        let coded: undefined | number;
        counter++;
        logs.push(`pressed ${c}`);

        // dont spin the reflector
        for (let i = 0; i < rotors.length - 1; i++) {
          if (i === 0 || counter % rotors[0].length ** i === 0) {
            spin(rotors[i]);
            logs.push(`spun rotor ${i}`);
          }
        }

        for (let i = 0; i < rotors.length - 1; i++) {
          coded = rotors[i][coded ?? charToCode(c)][1];
          logs.push(`rotor ${i}: ${coded}`);
        }

        // reflector
        coded = rotors[rotors.length - 1][coded!][1];
        logs.push(`rotor ${rotors.length - 1} reflected: ${coded}`);

        for (let i = rotors.length - 2; i >= 0; i--) {
          coded = rotors[i][coded!][1];
          logs.push(`rotor ${i}: ${coded}`);
        }

        res += codeToChar(coded!);
        logs.push(`illuminated ${res[res.length - 1]}`);
      }

      if (config.verbose) {
        console.log(logs.join('\n'));
        console.log(rotors);
      }
      return res;
    },
  };

  return e;
};
