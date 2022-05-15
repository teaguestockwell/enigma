import { encodeChar, decodeChar } from './char-encoding';

it('encodes chars', () => {
  expect(encodeChar('a')).toBe(0);
  expect(encodeChar('z')).toBe(25);
});

it('decodes chars', () => {
  expect(decodeChar(25)).toBe('z');
  expect(decodeChar(0)).toBe('a');
});
