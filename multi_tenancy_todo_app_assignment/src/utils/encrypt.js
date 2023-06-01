const CryptoJS = require("crypto-js");

export const encryptFn = (query) => {
  const encryptQuery = CryptoJS.AES.encrypt(query, "hello").toString();
  return encryptQuery;
};

export const decryptFn = (query) => {
    const bytes = CryptoJS.AES.decrypt(query, "hello");
    const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedMessage
};
