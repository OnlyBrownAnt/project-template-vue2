/**
 * RSA加解密插件
 * 对于报文上送和处理响应分别用两套RSA密钥对来创建JSEncrypt对象分别进行加密和解密。
 * 不能在一个JSEncrypt挂载非一套的密钥对，会导致加解密处理混乱，一套密钥能解密另一套密码的公钥加密报文。
 */

import JSEncrypt from "jsencrypt";
import {b64tohex, hex2b64} from "jsencrypt/lib/lib/jsbn/base64";

// RSA密钥对-1
// RSA公钥(AES加密后的数据)
const puk_1 =
  ''
// RSA私钥(AES加密后的数据)
const prk_1 =
  ''

// RSA密钥对-2
// RSA公钥(AES加密后的数据)
const puk_2 =
  ''
// RSA私钥(AES加密后的数据)
const prk_2 =
  ''

const JSEncryptPlugin = {
  install: function (Vue) {
    // 分块加密
    JSEncrypt.prototype.encryptLong = function (str) {
      try {
        const maxByteLength = ((this.getKey().n.bitLength() + 7) >> 3) - 11
        let i = 0
        const byteArr = []
        while (i <= str.length - 1) {
          const c = str.charCodeAt(i)
          if (c < 128) {
            byteArr.push(str[i])
          } else if (c > 127 && c < 2048) {
            byteArr.push(null, str[i])
          } else {
            byteArr.push(null, null, str[i])
          }
          i++
        }

        if (byteArr.length <= maxByteLength) {
          return hex2b64(this.getKey().encrypt(str))
        } else {
          // long plain text encrypt
          let cipherStrSum = ''
          while (byteArr.length > 0) {
            let offset = maxByteLength
            while (byteArr[offset - 1] === null) {
              offset = offset - 1
            }
            const text = byteArr
              .slice(0, offset)
              .filter(i => i !== null)
              .join('')
            cipherStrSum += this.getKey().encrypt(text)
            byteArr.splice(0, offset)
          }
          return hex2b64(cipherStrSum)
        }
      } catch (error) {
        return false
      }
    }
    // 分块解密
    JSEncrypt.prototype.decryptLong = function (cipherText) {
      try {
        const hexText = b64tohex(cipherText)
        const maxLength = this.getKey().n.bitLength() / 4

        if (hexText.length <= maxLength) {
          return this.getKey().decrypt(hexText)
        } else {
          // long cipher text decrypt
          const arr = hexText.match(new RegExp('.{1,' + maxLength + '}', 'g'))
          const plainText = arr.reduce((acc, cur) => {
            return acc + this.getKey().decrypt(cur)
          }, '')
          return plainText
        }
      } catch (error) {
        return false
      }
    }

    const jsEncryptForEncrypt = new JSEncrypt()
    jsEncryptForEncrypt.setPublicKey(puk_1);
    Vue.prototype.$jsEncryptForEncrypt = jsEncryptForEncrypt;
    const jsEncryptForDecrypt = new JSEncrypt()
    jsEncryptForDecrypt.setPrivateKey(prk_2);
    Vue.prototype.$jsEncryptForDecrypt = jsEncryptForDecrypt;
  }
};

export default JSEncryptPlugin;
