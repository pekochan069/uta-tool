const base64ToUint6 = (char: number) => {
  return char > 64 && char < 91
    ? char - 65
    : char > 96 && char < 123
    ? char - 71
    : char > 47 && char < 58
    ? char + 4
    : char === 43
    ? 62
    : char === 47
    ? 63
    : 0;
};

const base64DecToArr = (base64: string, blockSize: number = 1) => {
  const b64Enc = base64.replace(/[^A-Za-z0-9+/]/g, "");
  const inLength = b64Enc.length;
  const outLength = blockSize
    ? Math.ceil(((inLength * 3 + 1) >> 2) / blockSize) * blockSize
    : (inLength * 3 + 1) >> 2;
  const bytes = new Uint8Array(outLength);

  let mod3;
  let mod4;
  let uint24 = 0;
  let outIndex = 0;

  for (let inIndex = 0; inIndex < inLength; ++inIndex) {
    mod4 = inIndex & 3;
    uint24 |= base64ToUint6(b64Enc.charCodeAt(inIndex)) << (6 * (3 - mod4));

    if (mod4 === 3 || inLength - inIndex === 1) {
      mod3 = 0;

      while (mod3 < 3 && outIndex < outLength) {
        bytes[outIndex] = (uint24 >>> ((16 >>> mod3) & 24)) & 255;
        ++mod3;
        ++outIndex;
      }

      uint24 = 0;
    }
  }

  return bytes;
};

const uint6ToBase64 = (uint6: number) => {
  return uint6 < 26
    ? uint6 + 65
    : uint6 < 52
    ? uint6 + 71
    : uint6 < 62
    ? uint6 - 4
    : uint6 === 62
    ? 43
    : uint6 === 63
    ? 47
    : 65;
};

const base64EncArr = (bytes: Uint8Array) => {
  let mod3 = 2;
  let uint24 = 0;
  let b64Enc = "";

  for (let i = 0; i < bytes.length; ++i) {
    mod3 = i % 3;
    uint24 |= bytes[i] << ((16 >>> mod3) & 24);

    if (mod3 === 2 || bytes.length - i === 1) {
      b64Enc += String.fromCodePoint(
        uint6ToBase64((uint24 >>> 18) & 63),
        uint6ToBase64((uint24 >>> 12) & 63),
        uint6ToBase64((uint24 >>> 6) & 63),
        uint6ToBase64(uint24 & 63)
      );

      uint24 = 0;
    }
  }

  return (
    b64Enc.substring(0, b64Enc.length - 2 + mod3) +
    (mod3 === 2 ? "" : mod3 === 1 ? "=" : "==")
  );
};

const utf8ArrToStr = (bytes: Uint8Array) => {
  let view = "";
  let part;

  for (let i = 0; i < bytes.length; ++i) {
    part = bytes[i];
    view += String.fromCodePoint(
      part > 251 && part < 254 && i + 5 < bytes.length /* six bytes */
        ? /* (part - 252 << 30) may be not so safe in ECMAScript! So…: */
          (part - 252) * 1073741824 +
            ((bytes[++i] - 128) << 24) +
            ((bytes[++i] - 128) << 18) +
            ((bytes[++i] - 128) << 12) +
            ((bytes[++i] - 128) << 6) +
            bytes[++i] -
            128
        : part > 247 && part < 252 && i + 4 < bytes.length /* five bytes */
        ? ((part - 248) << 24) +
          ((bytes[++i] - 128) << 18) +
          ((bytes[++i] - 128) << 12) +
          ((bytes[++i] - 128) << 6) +
          bytes[++i] -
          128
        : part > 239 && part < 248 && i + 3 < bytes.length /* four bytes */
        ? ((part - 240) << 18) +
          ((bytes[++i] - 128) << 12) +
          ((bytes[++i] - 128) << 6) +
          bytes[++i] -
          128
        : part > 223 && part < 240 && i + 2 < bytes.length /* three bytes */
        ? ((part - 224) << 12) + ((bytes[++i] - 128) << 6) + bytes[++i] - 128
        : part > 191 && part < 224 && i + 1 < bytes.length /* two bytes */
        ? ((part - 192) << 6) + bytes[++i] - 128
        : /* part < 127 ? */ /* one byte */
          part
    );
  }

  return view;
};

const strToUtf8Arr = (DOMStr: string) => {
  const strLength = DOMStr.length;
  let char;
  let arrLength = 0;

  for (let i = 0; i < strLength; ++i) {
    char = DOMStr.codePointAt(i) || 0;

    if (char >= 0x10000) {
      ++i;
    }

    arrLength +=
      char < 0x80
        ? 1
        : char < 0x800
        ? 2
        : char < 0x10000
        ? 3
        : char < 0x200000
        ? 4
        : char < 0x4000000
        ? 5
        : 6;
  }

  const bytes = new Uint8Array(arrLength);

  let index = 0;
  let charIndex = 0;

  while (index < arrLength) {
    char = DOMStr.codePointAt(charIndex) || 0;

    if (char < 128) {
      bytes[index++] = char;
    } else if (char < 0x800) {
      /* two bytes */
      bytes[index++] = 192 + (char >>> 6);
      bytes[index++] = 128 + (char & 63);
    } else if (char < 0x10000) {
      /* three bytes */
      bytes[index++] = 224 + (char >>> 12);
      bytes[index++] = 128 + ((char >>> 6) & 63);
      bytes[index++] = 128 + (char & 63);
    } else if (char < 0x200000) {
      /* four bytes */
      bytes[index++] = 240 + (char >>> 18);
      bytes[index++] = 128 + ((char >>> 12) & 63);
      bytes[index++] = 128 + ((char >>> 6) & 63);
      bytes[index++] = 128 + (char & 63);
      charIndex++;
    } else if (char < 0x4000000) {
      /* five bytes */
      bytes[index++] = 248 + (char >>> 24);
      bytes[index++] = 128 + ((char >>> 18) & 63);
      bytes[index++] = 128 + ((char >>> 12) & 63);
      bytes[index++] = 128 + ((char >>> 6) & 63);
      bytes[index++] = 128 + (char & 63);
      charIndex++;
    } /* if (char <= 0x7fffffff) */ else {
      /* six bytes */
      bytes[index++] = 252 + (char >>> 30);
      bytes[index++] = 128 + ((char >>> 24) & 63);
      bytes[index++] = 128 + ((char >>> 18) & 63);
      bytes[index++] = 128 + ((char >>> 12) & 63);
      bytes[index++] = 128 + ((char >>> 6) & 63);
      bytes[index++] = 128 + (char & 63);
      charIndex++;
    }
    charIndex++;
  }

  return bytes;
};

export const base64Encode = (str: string) => {
  return base64EncArr(strToUtf8Arr(str));
};

export const base64Decode = (str: string) => {
  return utf8ArrToStr(base64DecToArr(str, str.length));
};
