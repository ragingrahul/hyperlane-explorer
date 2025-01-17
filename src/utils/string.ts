import { trimLeading0x } from './addresses';

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// TODO add unit tests
// Only allows letters and numbers
const alphanumericRgex = /[^a-zA-Z0-9]/gi;
export function sanitizeString(str: string) {
  if (!str || typeof str !== 'string') return '';
  return str.replaceAll(alphanumericRgex, '').toLowerCase();
}

export function trimToLength(value: string, maxLength: number) {
  if (!value) return '';
  const trimmed = value.trim();
  return trimmed.length > maxLength ? trimmed.substring(0, maxLength) + '...' : trimmed;
}

interface Sliceable {
  length: number;
  slice: (i: number, j: number) => any;
}

export function chunk<T extends Sliceable>(str: T, size: number) {
  const R: Array<T> = [];
  for (let i = 0; i < str.length; i += size) {
    R.push(str.slice(i, i + size));
  }
  return R;
}

export function tryUtf8DecodeBytes(value: string, fatal = true) {
  if (!value) return undefined;
  try {
    const decoder = new TextDecoder('utf-8', { fatal });
    const decodedBody = decoder.decode(Buffer.from(trimLeading0x(value), 'hex'));
    return decodedBody;
  } catch (error) {
    return undefined;
  }
}
