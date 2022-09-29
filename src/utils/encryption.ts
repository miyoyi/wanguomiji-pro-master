import crypto from 'crypto-js';

export function md5(value: string) {
  return crypto.MD5(value).toString();
}
