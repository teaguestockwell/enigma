import { getRotors } from './data';

/**
 * is used to encrypt by performing a caesar shift one character at a time
 *
 * @param wires each wire has a unique input and output that shifts electrical current from an input to a different output
 * @param offset how much the rotors has been spun
 * @param id may be 0 - 4 to select a finite amount of rotors
 */
export type Rotor = {
  wires: { input: number; output: number }[];
  offset: number;
  id: number;
};

export const encodeChar = (char: string) => {
  const code = char.charCodeAt(0);
  if (!char || code < 97 || code > 122) {
    throw new Error(
      `${char} / ${code} is not a lowercase letter from char code 97 to 122`
    );
  }
  return code - 97;
};

export const decodeChar = (code: number) => {
  return String.fromCharCode(code + 97);
};

/**
 * @param ceiling the maximum value of the shift
 * @param floor the minimum value of the shift
 * @param subject the character code to shift
 */
export type ShiftOptions = {
  ceiling: number;
  floor: number;
  subject: number;
};

export const shift = (options: ShiftOptions): number => {
  const { subject, ceiling, floor } = options;
  if (subject > ceiling) {
    return subject - ceiling - 1;
  }
  if (subject < floor) {
    return ceiling - Math.abs(subject) + 1;
  }
  return subject;
};

/**
 * @param direction the flow of the electrical current. normal is input -> output, reflected is output -> input
 * @param location the wire position in the rotor that the current is flowing through
 * @param rotor used to get the offset and number of wires to limit the floor and celling of the cesar shift
 */
export type ConnectOptions = {
  direction: 'normal' | 'reflected';
  location: number;
  rotor: Rotor;
};

/**
 * resolve the resulting path of electrical current through a rotor
 */
export const connect = (options: ConnectOptions) => {
  const {
    direction,
    location,
    rotor: { offset, wires },
  } = options;
  const ceiling = wires.length - 1;
  const floor = 0;

  if (direction === 'normal') {
    const shifted = shift({ subject: location + offset, ceiling, floor });
    return wires.find(w => shifted === w.input)!.output;
  }

  const unShifted = wires.find(w => w.output === location)!.input;
  return shift({ subject: unShifted - offset, ceiling, floor });
};

/**
 * @param rotorOptions a list that describes the order, rotation, and id of each of the rotors
 * @param logger each action is that is taken internally by the machine is piped through this logger
 * @param variant required to make the encryption symmetric by telling the reflector how to route current
 */
export type EnigmaOptions = {
  rotorOptions: { id: number; offset: number }[];
  logger?: (arg: string | object) => unknown;
  variant: 'encode' | 'decode';
};

/**
 * create a new encoder or decoder
 */
export const getEnigma = (config: EnigmaOptions) => {
  const allRotors = getRotors();
  const { logger, variant } = config;

  let rotors: Rotor[] = [];
  let counter = 0;

  const reset = () => {
    counter = 0;
    rotors = [];

    for (const { id, offset } of config.rotorOptions) {
      const rotor = allRotors.find(r => r.id === id)!;
      rotor.offset = offset;
      rotors.push(rotor);
    }
  };

  /**
   * enigma is symmetrical so getEnigma(encodeConfig).write(encodedString) will decode
   * to decode the enigma must be in the same initial state as its encoder
   *
   * @param s the message to encrypt
   */
  const write = (s: string) => {
    let res = '';

    for (const c of s) {
      counter++;
      let location = encodeChar(c);

      logger?.(`pressed ${c}`);
      logger?.(`${c} => ${location}`);

      // dont spin the reflector
      for (let i = 0; i < rotors.length - 1; i++) {
        // always spin the first rotor
        if (i === 0 || counter % rotors[0].wires.length ** i === 0) {
          const prev = rotors[i].offset;
          const rotor = rotors[i];
          // dont set invalid offset
          rotor.offset =
            rotor.offset === rotor.wires.length - 2 ? 0 : rotor.offset + 1;
          logger?.(
            `spun rotor #${rotors[i].id} at pos ${i} from ${prev} to ${rotors[i].offset}`
          );
        }
      }

      for (let i = 0; i < rotors.length - 1; i++) {
        const prev = location;
        location = connect({
          direction: 'normal',
          location,
          rotor: rotors[i],
        });
        logger?.(
          `rotor #${rotors[i].id} at pos ${i} ${decodeChar(
            prev
          )} => ${decodeChar(location)}`
        );
      }

      const prev = location;
      location = connect({
        direction: variant === 'encode' ? 'normal' : 'reflected',
        location,
        rotor: rotors[rotors.length - 1],
      });
      logger?.(
        `reflector rotor #${
          rotors[rotors.length - 1].id
        } at pos ${rotors.length - 1} ${decodeChar(prev)} => ${decodeChar(
          location
        )}`
      );

      for (let i = rotors.length - 2; i >= 0; i--) {
        const prev = location;
        location = connect({
          direction: 'reflected',
          location,
          rotor: rotors[i],
        });
        logger?.(
          `rotor #${rotors[i].id} at pos ${i} ${decodeChar(
            prev
          )} => ${decodeChar(location)}`
        );
      }

      res += decodeChar(location!);
      logger?.(`illuminated ${res[res.length - 1]}`);
    }

    logger?.({ wrote: s, to: res, rotors });
    return res;
  };

  reset();

  return { write, reset };
};
