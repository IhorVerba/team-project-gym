const crypto = require('crypto');
require('dotenv').config();

/**
 * @function decryptUserId
 * @description Decrypt user from ID
 * @param {string} encryptedUserId - ID
 * @returns {string} - Decrypted user
 */
export const decryptUserId = async (
  encryptedUserId: string,
): Promise<string> => {
  const algorithm = 'aes-192-cbc';

  const iv = Buffer.from(process.env.SECRET_IV as string, 'hex');

  const key = crypto.scryptSync(
    process.env.SECRET_KEY_CRYPTO_ID,
    process.env.SECRET_SALT_CRYPTO_ID,
    24,
  );

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  const decryptedUserId =
    decipher.update(encryptedUserId, 'hex', 'utf8') + decipher.final('utf8');

  return decryptedUserId;
};

/**
 * @function encryptUserId
 * @description Encrypt user in ID
 * @param {string} userId - User ID
 * @returns {string} - ID
 */
export const encryptUserId = async (userId: string): Promise<string> => {
  const algorithm = 'aes-192-cbc';

  const iv = Buffer.from(process.env.SECRET_IV as string, 'hex');

  const key = crypto.scryptSync(
    process.env.SECRET_KEY_CRYPTO_ID,
    process.env.SECRET_SALT_CRYPTO_ID,
    24,
  );

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const encryptedUserId =
    cipher.update(userId, 'utf8', 'hex') + cipher.final('hex');

  return encryptedUserId;
};
