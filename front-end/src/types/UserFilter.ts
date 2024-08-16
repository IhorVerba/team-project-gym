/**
 * @enum UserFilter
 * @description Enum for user filter used in tabs.
 * @property {string} AllUsers - all users.
 * @property {string} OwnUsers - users owned by trainer.
 * @property {string} Disabled - disabled users.
 */
enum UserFilter {
  AllUsers = 'all users',
  OwnUsers = 'own users',
  Disabled = 'disabled users',
  DisabledClients = 'disabled clients',
  AllTrainigns = 'all trainigs',
  OwnTrainigns = 'own trainigs'
}

export default UserFilter;
