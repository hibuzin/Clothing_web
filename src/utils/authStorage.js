import CryptoJS from "crypto-js";

const SECRET_KEY = "askar_clothing_secret_key_123"; 
// For demo/portfolio use only. In real apps, frontend secret is not truly secure.

export const saveEncryptedData = (key, value) => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    SECRET_KEY
  ).toString();

  localStorage.setItem(key, encrypted);
};

export const getDecryptedData = (key) => {
  const encrypted = localStorage.getItem(key);

  if (!encrypted) return null;

  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    return JSON.parse(decrypted);
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};

export const removeEncryptedData = (key) => {
  localStorage.removeItem(key);
};