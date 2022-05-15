export type Rotor = {id: number, input: number, output: number}[];

export const getRandomRotor = (chars = 26): Rotor => {
  const inputs = Array.from({ length: 26 }, (_, i) => i);
  const outputs = Array.from({ length: 26 }, (_, i) => i);
  let id = 0;
  const rotor: Rotor = [];

  while (id !== chars) {
    const inputIdx = Math.floor(Math.random() * inputs.length)
    const outputIdx = Math.floor(Math.random() * outputs.length)

    if (inputs[inputIdx] === outputs[outputIdx]) continue

    rotor.push({
      id: id,
      input: inputs.splice(inputIdx, 1)[0],
      output: outputs.splice(outputIdx, 1)[0],
    })
    id++
  }

  return rotor
};

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
  while (rotor[0].id !== tar) {
    spin(rotor);
  }
};

export const setCypher = (rotors: Rotor[], cypher: number[]) => {
  if (rotors.length !== cypher.length) {
    throw new Error('cypher length must match rotors');
  }

  for (let i = 0; i < cypher.length; i++) {
    seek(cypher[i], rotors[i]);
  }
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

export const getRotors = (): Rotor[] => [
  [
    { id: 0, input: 1, output: 13 },
    { id: 1, input: 6, output: 7 },
    { id: 2, input: 5, output: 4 },
    { id: 3, input: 14, output: 10 },
    { id: 4, input: 8, output: 3 },
    { id: 5, input: 9, output: 17 },
    { id: 6, input: 10, output: 14 },
    { id: 7, input: 15, output: 22 },
    { id: 8, input: 7, output: 23 },
    { id: 9, input: 4, output: 15 },
    { id: 10, input: 21, output: 6 },
    { id: 11, input: 23, output: 11 },
    { id: 12, input: 3, output: 8 },
    { id: 13, input: 22, output: 20 },
    { id: 14, input: 0, output: 16 },
    { id: 15, input: 17, output: 24 },
    { id: 16, input: 2, output: 18 },
    { id: 17, input: 19, output: 2 },
    { id: 18, input: 16, output: 19 },
    { id: 19, input: 18, output: 12 },
    { id: 20, input: 24, output: 9 },
    { id: 21, input: 13, output: 5 },
    { id: 22, input: 25, output: 1 },
    { id: 23, input: 12, output: 21 },
    { id: 24, input: 20, output: 25 },
    { id: 25, input: 11, output: 0 }
  ],
  [
    { id: 0, input: 3, output: 0 },
    { id: 1, input: 0, output: 8 },
    { id: 2, input: 7, output: 22 },
    { id: 3, input: 10, output: 23 },
    { id: 4, input: 21, output: 19 },
    { id: 5, input: 1, output: 17 },
    { id: 6, input: 15, output: 14 },
    { id: 7, input: 22, output: 5 },
    { id: 8, input: 16, output: 24 },
    { id: 9, input: 6, output: 15 },
    { id: 10, input: 5, output: 10 },
    { id: 11, input: 9, output: 3 },
    { id: 12, input: 20, output: 21 },
    { id: 13, input: 11, output: 9 },
    { id: 14, input: 8, output: 25 },
    { id: 15, input: 12, output: 18 },
    { id: 16, input: 13, output: 4 },
    { id: 17, input: 23, output: 20 },
    { id: 18, input: 17, output: 1 },
    { id: 19, input: 25, output: 7 },
    { id: 20, input: 19, output: 11 },
    { id: 21, input: 4, output: 6 },
    { id: 22, input: 2, output: 13 },
    { id: 23, input: 24, output: 12 },
    { id: 24, input: 14, output: 2 },
    { id: 25, input: 18, output: 16 }
  ],
  [
    { id: 0, input: 18, output: 19 },
    { id: 1, input: 9, output: 11 },
    { id: 2, input: 13, output: 0 },
    { id: 3, input: 22, output: 3 },
    { id: 4, input: 12, output: 18 },
    { id: 5, input: 20, output: 6 },
    { id: 6, input: 25, output: 20 },
    { id: 7, input: 2, output: 7 },
    { id: 8, input: 5, output: 15 },
    { id: 9, input: 19, output: 17 },
    { id: 10, input: 11, output: 9 },
    { id: 11, input: 23, output: 4 },
    { id: 12, input: 10, output: 1 },
    { id: 13, input: 6, output: 25 },
    { id: 14, input: 3, output: 16 },
    { id: 15, input: 21, output: 10 },
    { id: 16, input: 24, output: 8 },
    { id: 17, input: 8, output: 21 },
    { id: 18, input: 15, output: 12 },
    { id: 19, input: 14, output: 22 },
    { id: 20, input: 4, output: 24 },
    { id: 21, input: 17, output: 13 },
    { id: 22, input: 7, output: 23 },
    { id: 23, input: 16, output: 14 },
    { id: 24, input: 0, output: 2 },
    { id: 25, input: 1, output: 5 }
  ],
  [
    { id: 0, input: 3, output: 25 },
    { id: 1, input: 15, output: 17 },
    { id: 2, input: 0, output: 12 },
    { id: 3, input: 1, output: 22 },
    { id: 4, input: 23, output: 11 },
    { id: 5, input: 10, output: 15 },
    { id: 6, input: 18, output: 2 },
    { id: 7, input: 20, output: 16 },
    { id: 8, input: 17, output: 24 },
    { id: 9, input: 9, output: 8 },
    { id: 10, input: 21, output: 19 },
    { id: 11, input: 13, output: 4 },
    { id: 12, input: 22, output: 9 },
    { id: 13, input: 2, output: 20 },
    { id: 14, input: 16, output: 5 },
    { id: 15, input: 14, output: 10 },
    { id: 16, input: 4, output: 23 },
    { id: 17, input: 11, output: 6 },
    { id: 18, input: 25, output: 0 },
    { id: 19, input: 24, output: 18 },
    { id: 20, input: 5, output: 7 },
    { id: 21, input: 7, output: 1 },
    { id: 22, input: 19, output: 14 },
    { id: 23, input: 8, output: 21 },
    { id: 24, input: 6, output: 3 },
    { id: 25, input: 12, output: 13 }
  ],
  [
    { id: 0, input: 5, output: 7 },
    { id: 1, input: 2, output: 20 },
    { id: 2, input: 7, output: 19 },
    { id: 3, input: 9, output: 13 },
    { id: 4, input: 17, output: 4 },
    { id: 5, input: 21, output: 3 },
    { id: 6, input: 13, output: 5 },
    { id: 7, input: 16, output: 25 },
    { id: 8, input: 8, output: 9 },
    { id: 9, input: 15, output: 1 },
    { id: 10, input: 25, output: 16 },
    { id: 11, input: 18, output: 10 },
    { id: 12, input: 24, output: 11 },
    { id: 13, input: 14, output: 15 },
    { id: 14, input: 23, output: 8 },
    { id: 15, input: 22, output: 0 },
    { id: 16, input: 3, output: 12 },
    { id: 17, input: 12, output: 22 },
    { id: 18, input: 6, output: 17 },
    { id: 19, input: 11, output: 18 },
    { id: 20, input: 4, output: 23 },
    { id: 21, input: 10, output: 6 },
    { id: 22, input: 1, output: 24 },
    { id: 23, input: 0, output: 14 },
    { id: 24, input: 19, output: 21 },
    { id: 25, input: 20, output: 2 }
  ]
]