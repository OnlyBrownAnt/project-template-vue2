import encBase64 from 'crypto-js/enc-base64';
import encUtf8 from 'crypto-js/enc-utf8';
import encHex from 'crypto-js/enc-hex';
import AES from 'crypto-js/aes';

// AES密钥key和偏移量iv，用base64编码一次。服务端key，iv需要保持一致。
const y = '';
const v = '';

/**
 * BASE64编码
 * @param str {string}
 * @returns {string}
 */
function base64Encrypt(str) {
  return encBase64.parse(str).toString();
}

// BASE64解码
/**
 * BASE64解码
 * @param str {string}
 * @returns {string}
 */
function base64Decrypt(str) {
  return encBase64.stringify(encHex.parse(str)).toString();
}

/**
 * AES加密
 * @param data {string}
 * @returns {string}
 */
export function encrypt(data) {
  const key = base64Decrypt(y); // 秘钥
  const iv = base64Decrypt(v); // 偏移量

  // 字符串进行UTF8编码
  const dataHex = encUtf8.parse(data);
  const keyHex = encUtf8.parse(key);
  const ivHex = encUtf8.parse(iv);

  // 加密
  const encrypted = AES.encrypt(dataHex, keyHex, {
    iv: ivHex,
    // mode: CryptoJS.mode.CBC, // 加密模式(默认CBC)
    // padding: CryptoJS.pad.Pkcs7 // 填充方式(默认Pkcs7)
  })
  return encrypted.ciphertext.toString();
}

/**
 * AES解密
 * @param data {string}
 * @returns {string}
 */
export function decrypt(data) {
  const key = base64Decrypt(y); // 秘钥
  const iv = base64Decrypt(v); // 偏移量

  // 字符串进行UTF8编码
  let encryptedHexStr = encHex.parse(data);
  let srcs = encBase64.stringify(encryptedHexStr);
  const keyHex = encUtf8.parse(key);
  const ivHex = encUtf8.parse(iv);

  // 解密
  let decrypt = AES.decrypt(srcs, keyHex, {
    iv: ivHex,
    // mode: CryptoJS.mode.CBC, // 加密模式(默认CBC)
    // padding: CryptoJS.pad.Pkcs7 // 填充方式(默认Pkcs7)
  });
  return decrypt.toString(encUtf8);
}

/**
 * 测试
 */
export function test() {
  console.log(encrypt({data: {key: 'key'}}));
  console.log(decrypt(encrypt({data: {key: 'key'}})));
}
