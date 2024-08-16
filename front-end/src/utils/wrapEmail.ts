/**
 * @description Wraps an email address with a newline character before the "@" symbol.
 * @param {string} email - The email address to wrap.
 * @returns {string} The wrapped email address.
 */
export default function wrapEmail(email: string): string {
  const atIndex = email.indexOf('@');
  if (atIndex === -1) {
    return email;
  }

  const username = email.substring(0, atIndex);
  if (username.length <= 12) {
    return email;
  }

  const domain = email.substring(atIndex + 1);

  return `${username}\n@${domain}`;
}
