const log = (..._args: any[]) => ''

/**
 * a circular array of connections
 * connection[0] is the input
 * connection[1] is the index of the next rotor connection
 * connection[0] - connection[1] is the cesar shift to be applied
 */
export type Rotor = [number, number][];

export const charToCode = (char: string) => char.charCodeAt(0) - 97;

export const codeToChar = (code: number) => String.fromCharCode(code + 97);

export const getRandomRotor = () => {
  const input = Array.from({ length: 26 }, (_, i) => i);
  const out = Array.from({ length: 26 }, (_, i) => i);
  const sets: [number, number][] = [];

  while (input.length) {
    const i = input.splice(Math.floor(input.length * Math.random()), 1)[0];
    const o = out.splice(Math.floor(out.length * Math.random()), 1)[0];
    sets.push([i, o]);
  }

  return sets;
};

export const getRotors = (): Rotor[] => [
  [
    [1, 16],
    [7, 6],
    [8, 23],
    [18, 14],
    [0, 8],
    [5, 15],
    [22, 2],
    [16, 25],
    [17, 9],
    [23, 17],
    [13, 10],
    [24, 20],
    [19, 4],
    [12, 12],
    [14, 1],
    [3, 7],
    [4, 22],
    [9, 18],
    [11, 3],
    [2, 19],
    [25, 21],
    [15, 5],
    [6, 24],
    [21, 11],
    [10, 13],
    [20, 0],
  ],
  [
    [13, 24],
    [6, 4],
    [25, 6],
    [24, 18],
    [17, 15],
    [4, 10],
    [21, 17],
    [19, 16],
    [10, 21],
    [15, 1],
    [5, 23],
    [20, 2],
    [14, 5],
    [0, 19],
    [2, 9],
    [22, 12],
    [11, 20],
    [8, 22],
    [9, 11],
    [18, 8],
    [23, 13],
    [16, 25],
    [12, 0],
    [3, 7],
    [1, 3],
    [7, 14],
  ],
  [
    [20, 8],
    [0, 5],
    [12, 1],
    [13, 17],
    [16, 12],
    [22, 24],
    [10, 22],
    [4, 3],
    [24, 15],
    [8, 16],
    [19, 21],
    [2, 14],
    [17, 2],
    [15, 4],
    [5, 23],
    [6, 11],
    [1, 0],
    [3, 10],
    [7, 25],
    [14, 7],
    [25, 13],
    [18, 20],
    [23, 6],
    [21, 19],
    [9, 9],
    [11, 18],
  ],
  [
    [17, 5],
    [3, 13],
    [0, 20],
    [9, 16],
    [8, 10],
    [19, 12],
    [5, 24],
    [20, 4],
    [16, 2],
    [12, 0],
    [10, 22],
    [6, 7],
    [22, 23],
    [2, 1],
    [13, 6],
    [21, 18],
    [18, 9],
    [11, 8],
    [15, 21],
    [7, 19],
    [1, 3],
    [4, 25],
    [25, 14],
    [14, 11],
    [23, 15],
    [24, 17],
  ],
  [
    [20, 17],
    [12, 23],
    [1, 14],
    [23, 15],
    [25, 16],
    [7, 0],
    [19, 5],
    [9, 6],
    [18, 8],
    [8, 18],
    [21, 9],
    [6, 1],
    [2, 10],
    [10, 3],
    [14, 21],
    [0, 2],
    [11, 7],
    [13, 13],
    [15, 11],
    [5, 19],
    [16, 25],
    [4, 22],
    [3, 4],
    [22, 24],
    [24, 20],
    [17, 12],
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
};

export const getEnigma = (config: EnigmaConfig) => {
  const rotors = config.rotors ?? getSelectedRotors(config.rotorOrder);
  setCypher(rotors, config.initialCypher);
  let counter = 0;

  const e = {
    code: (s: string) => {
      let res = '';

      for (const c of s) {
        counter++;
        spin(rotors[0]);
        log({ rotors, counter });
        for (let i = 1; i < rotors.length - 1; i++) {
          if (counter % rotors[0].length ** i === 0) {
            spin(rotors[i]);
            log({ counter, router: i });
          }
        }

        let coded = rotors[0][charToCode(c)][1];

        for (let i = 1; i < rotors.length; i++) {
          log({coded})
          coded = rotors[i][coded][1];
        }

        for (let i = rotors.length - 2; i >= 0; i--) {
          log({coded})
          coded = rotors[i][coded][1];

          if (i == 0) {
            log({coded})
          }
        }

        res += codeToChar(coded);
      }
      return res;
    },
  };

  return e;
};
