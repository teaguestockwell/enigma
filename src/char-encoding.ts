const validateChar = (char: string) => {
  if (char.length !== 1) {
    throw new Error(`${char} is not a single char`);
  }
}

export const encodeChar = (char: string) => {
  validateChar(char);
  const code = char.charCodeAt(0);
  if (code < 97 || code > 122) {
    throw new Error(`${char} is not a lowercase letter`);
  }
  return code - 97;
};

export const decodeChar = (code: number) => {
  if (code < 0 || code > 25) {
    throw new Error(`${code} is not a valid code`);
  }
  const char = String.fromCharCode(code + 97);
  validateChar(char);
  return char
};
