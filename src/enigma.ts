import { encodeChar, decodeChar } from './char-encoding';
import { getSelectedRotors, setCypher, spin } from './rotor';

export type EnigmaConfig = {
  initialCypher: number[];
  rotorOrder: number[];
  verbose?: boolean;
};

export const getEnigma = (config: EnigmaConfig) => {
  const rotors = getSelectedRotors(config.rotorOrder);
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

        for (let i = 0; i < rotors.length; i++) {
          coded = rotors[i][(coded ?? encodeChar(c))].output
          logs.push(`rotor ${i}: ${coded}`);
        }

        for (let i = rotors.length - 2; i >= 0; i--) {
          coded = rotors[i].find(wire => wire.output === coded)?.input;
          logs.push(`rotor ${i}: ${coded}`);
        }

        res += decodeChar(coded!);
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
