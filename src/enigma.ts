import { encodeChar, decodeChar } from './char-encoding';
import { connect, getSelectedRotors, setCypher, spin } from './rotor';

export type EnigmaConfig = {
  initialCypher: number[];
  rotorOrder: number[];
  variant: 'encode' | 'decode';
  logger?: (...args: any[]) => unknown;
};

export const getEnigma = (config: EnigmaConfig) => {
  const { initialCypher, rotorOrder, variant, logger } = config;
  const rotors = getSelectedRotors(rotorOrder);
  setCypher(rotors, initialCypher);
  let counter = 0;

  const e = {
    write: (s: string) => {
      let res = '';

      for (const c of s) {
        let location = encodeChar(c);
        logger?.(`pressed ${c}`);
        logger?.(`${c} => ${location}`);

        counter++;
        for (let i = 0; i < rotors.length - 1; i++) {
          if (i === 0 || counter % rotors[0].wires.length ** i === 0) {
            const prev = rotors[i].offset;
            spin(rotors[i]);
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

      logger?.({ config });
      return res;
    },
  };

  return e;
};
