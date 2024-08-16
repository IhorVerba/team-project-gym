/**
 * @enum UserStatus
 * @description The user statuses
 * @property {string} Active - The user is active
 * @property {string} Disabled - The user is disabled
 * @property {string} Pending - The user is pending to be active
 */
enum UserStatus {
  Active = 'active',
  Disabled = 'disabled',
  Pending = 'pending',
}

export default UserStatus;
