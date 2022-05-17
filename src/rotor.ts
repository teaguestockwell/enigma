type Wire = { input: number; output: number };

export type Rotor = { wires: Wire[]; offset: number; id: number };

export const getRandomRotor = (chars = 26): Rotor => {
  const outputs = Array.from({ length: 26 }, (_, i) => i);
  const rotor: Rotor = {
    id: Date.now(),
    offset: 0,
    wires: [],
  };
  let input = 0;

  while (input !== chars) {
    const i = Math.floor(Math.random() * outputs.length);

    if (input === outputs[i]) continue;

    rotor.wires.push({
      input,
      output: outputs.splice(i, 1)[0],
    });

    input++;
  }

  return rotor;
};

/**
 * shift the rotor left
 */
export const spin = (rotor: Rotor) => {
  rotor.offset = rotor.offset === rotor.wires.length - 2 ? 0 : rotor.offset + 1;
};

/**
 * spin the rotor to set a char of the cypher
 */
export const seek = (tar: number, rotor: Rotor) => {
  rotor.offset = tar;
};

export const setCypher = (rotors: Rotor[], cypher: number[]) => {
  if (rotors.length !== cypher.length) {
    throw new Error('cypher length must match rotors');
  }

  for (let i = 0; i < cypher.length; i++) {
    seek(cypher[i], rotors[i]);
  }
};

export const rotate = (x: number, ceiling: number, floor: number): number => {
  if (x > ceiling) {
      return x - ceiling - 1
  }
  if (x < floor){
      return ceiling - Math.abs(x) + 1
  }
  return x
}

export type ConnectOptions = {
  direction: 'normal' | 'reflected';
  location: number;
  rotor: Rotor;
};

export const connect = (options: ConnectOptions) => {
  const {
    direction,
    location,
    rotor: { offset, wires },
  } = options;
  const ceiling = wires.length - 1;
  const floor = 0;

  if (direction === 'normal') {
    const shifted = rotate(location + offset, ceiling, floor);
    return wires.find(w => shifted === w.input)!.output;
  }

  const unShifted = wires.find(w => w.output === location)!.input
  return rotate(unShifted - offset, ceiling, floor)
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
  {
    id: 0,
    offset: 0,
    wires: [
      { input: 0, output: 2 },
      { input: 1, output: 5 },
      { input: 2, output: 7 },
      { input: 3, output: 20 },
      { input: 4, output: 19 },
      { input: 5, output: 3 },
      { input: 6, output: 8 },
      { input: 7, output: 22 },
      { input: 8, output: 15 },
      { input: 9, output: 0 },
      { input: 10, output: 17 },
      { input: 11, output: 14 },
      { input: 12, output: 4 },
      { input: 13, output: 25 },
      { input: 14, output: 1 },
      { input: 15, output: 6 },
      { input: 16, output: 10 },
      { input: 17, output: 24 },
      { input: 18, output: 16 },
      { input: 19, output: 11 },
      { input: 20, output: 18 },
      { input: 21, output: 13 },
      { input: 22, output: 12 },
      { input: 23, output: 21 },
      { input: 24, output: 23 },
      { input: 25, output: 9 },
    ],
  },
  {
    id: 1,
    offset: 0,
    wires: [
      { input: 0, output: 21 },
      { input: 1, output: 23 },
      { input: 2, output: 24 },
      { input: 3, output: 25 },
      { input: 4, output: 12 },
      { input: 5, output: 7 },
      { input: 6, output: 15 },
      { input: 7, output: 6 },
      { input: 8, output: 14 },
      { input: 9, output: 3 },
      { input: 10, output: 0 },
      { input: 11, output: 16 },
      { input: 12, output: 13 },
      { input: 13, output: 19 },
      { input: 14, output: 9 },
      { input: 15, output: 5 },
      { input: 16, output: 11 },
      { input: 17, output: 1 },
      { input: 18, output: 22 },
      { input: 19, output: 17 },
      { input: 20, output: 8 },
      { input: 21, output: 18 },
      { input: 22, output: 10 },
      { input: 23, output: 20 },
      { input: 24, output: 4 },
      { input: 25, output: 2 },
    ],
  },
  {
    id: 2,
    offset: 0,
    wires: [
      { input: 0, output: 18 },
      { input: 1, output: 3 },
      { input: 2, output: 5 },
      { input: 3, output: 17 },
      { input: 4, output: 6 },
      { input: 5, output: 21 },
      { input: 6, output: 10 },
      { input: 7, output: 12 },
      { input: 8, output: 23 },
      { input: 9, output: 11 },
      { input: 10, output: 15 },
      { input: 11, output: 22 },
      { input: 12, output: 13 },
      { input: 13, output: 2 },
      { input: 14, output: 7 },
      { input: 15, output: 14 },
      { input: 16, output: 8 },
      { input: 17, output: 0 },
      { input: 18, output: 16 },
      { input: 19, output: 4 },
      { input: 20, output: 1 },
      { input: 21, output: 19 },
      { input: 22, output: 9 },
      { input: 23, output: 20 },
      { input: 24, output: 25 },
      { input: 25, output: 24 },
    ],
  },
  {
    id: 3,
    offset: 0,
    wires: [
      { input: 0, output: 2 },
      { input: 1, output: 3 },
      { input: 2, output: 23 },
      { input: 3, output: 17 },
      { input: 4, output: 7 },
      { input: 5, output: 11 },
      { input: 6, output: 14 },
      { input: 7, output: 6 },
      { input: 8, output: 15 },
      { input: 9, output: 13 },
      { input: 10, output: 21 },
      { input: 11, output: 22 },
      { input: 12, output: 25 },
      { input: 13, output: 16 },
      { input: 14, output: 0 },
      { input: 15, output: 18 },
      { input: 16, output: 9 },
      { input: 17, output: 12 },
      { input: 18, output: 20 },
      { input: 19, output: 10 },
      { input: 20, output: 24 },
      { input: 21, output: 19 },
      { input: 22, output: 4 },
      { input: 23, output: 5 },
      { input: 24, output: 1 },
      { input: 25, output: 8 },
    ],
  },
  {
    id: 4,
    offset: 0,
    wires: [
      { input: 0, output: 7 },
      { input: 1, output: 21 },
      { input: 2, output: 25 },
      { input: 3, output: 0 },
      { input: 4, output: 17 },
      { input: 5, output: 16 },
      { input: 6, output: 20 },
      { input: 7, output: 22 },
      { input: 8, output: 4 },
      { input: 9, output: 19 },
      { input: 10, output: 2 },
      { input: 11, output: 14 },
      { input: 12, output: 11 },
      { input: 13, output: 24 },
      { input: 14, output: 18 },
      { input: 15, output: 10 },
      { input: 16, output: 15 },
      { input: 17, output: 12 },
      { input: 18, output: 23 },
      { input: 19, output: 3 },
      { input: 20, output: 5 },
      { input: 21, output: 13 },
      { input: 22, output: 9 },
      { input: 23, output: 1 },
      { input: 24, output: 8 },
      { input: 25, output: 6 },
    ],
  },
];
