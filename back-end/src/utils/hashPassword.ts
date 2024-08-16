import bcrypt from 'bcrypt';

/**
 * @function hashPassword
 * @description Hash password using bcrypt with 10 salt rounds using bcrypt library
 * @param {string} password - Password to hash
 * @returns {string} - Hashed password
 */
const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

module.exports = { hashPassword };
