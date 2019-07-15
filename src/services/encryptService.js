// Arquivo usado para encriptar e desencriptar o que deseja.
// Precisa de uma chave fornecida na hora da encrpitação e a mesma chave precisa ser passada para desencriptar.
import aesjs from 'aes-js'

// let _key = getKey(String("ab35s87"))
// let e = encrypt(_key, String("Text may be any length you wish, no padding is required."))
// console.log(e)
// let d = decrypt(e, _key)
// console.log(d)

const getKey = (strKey) => {
  let key = []
  for (let i = 0; i < 16; i++) {
    if (i < strKey.length) {
      key.push(hashCode(strKey.substring(i, i + 1)))
    } else {
      key.push(hashCode(String(i)))
    }
  }
  return new Uint8Array(key)
}

const encrypt = (key, text) => {
  let textBytes = aesjs.utils.utf8.toBytes(text)
  // O Eslint acha que o ctr é um construtor e nao aceita por isso a linha pra ignorar
  // eslint-disable-next-line
  let aesctr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5))
  let encryptedBytes = aesctr.encrypt(textBytes)
  let encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes)

  return encryptedHex
}

const decrypt = (key, encryptedHex) => {
  let encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex)
  // O Eslint acha que o ctr é um construtor e nao aceita por isso a linha pra ignorar
  // eslint-disable-next-line
  let aesctr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5))
  let decryptedBytes = aesctr.decrypt(encryptedBytes)
  let decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes)

  return decryptedText
}

const hashCode = (str) => {
  return str.split('').reduce((prevHash, currVal) =>
    (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0)
}

const encryptApi = {
  getKey,
  encrypt,
  decrypt
}

export default encryptApi
