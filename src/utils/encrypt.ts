import { JSEncrypt } from 'jsencrypt';

// 公钥
const RSA_PUBLIC_KEY =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCZa8JYF1Fqq+k8Jti522Xdc9hWZYwM/8N5wjpgshC4CQvsj9r+w7A6XDGrcqvNzmYckM7H' +
  'kBeqZn03Yr9cMWglnyYZbU5Z4HdFfjWI5wuE+7PVDgadVtbR5IR5fiorPh3SW8lDedMBP/3ucHgOWFHgx8v54vzXtEbM6PklKfF+EwIDAQAB';

// 私钥
const RSA_PRIVATE_KEY = '';

const encrypt = {
  // 加密用公钥
  encrypt(password: string): string {
    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(RSA_PUBLIC_KEY);
    return encryptor.encrypt(password) || '';
  },

  // 解密用私钥
  decrypt(password: string): string {
    const decryptor = new JSEncrypt();
    decryptor.setPrivateKey(RSA_PRIVATE_KEY);
    return decryptor.decrypt(password) || '';
  }
};

export default encrypt; 