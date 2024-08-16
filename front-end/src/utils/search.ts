import { User } from '../types/User';

/**
 * @type UserKeys - The keys of the User object
 * @see {@link User} for more information on the User interface
 * @see {@link https://www.typescriptlang.org/docs/handbook/2/keyof-types.html | Keyof Types} for more information on keyof types
 */
type UserKeys = keyof User;

/**
 * @function searchUser - Search for users based on the query string
 * @param {Array<User>} users - The array of users to search
 * @param {string} queryString - The query string to search for
 * @returns {Array<User>} The filtered array of users
 * @see {@link User} for more information on the User interface
 */
const searchUser = (users: User[], queryString: string): Array<User> => {
  const keys: UserKeys[] = ['firstName', 'lastName', 'email', 'role'];

  if (queryString.length <= 1) return users;

  const filteredUsers = users.filter(
    (item: User) =>
      keys.some((key) =>
        item[key]?.toString().toLowerCase().includes(queryString.toLowerCase()),
      ) ||
      `${item.firstName} ${item.lastName}`
        .toLowerCase()
        .includes(queryString.toLowerCase()),
  );

  return filteredUsers;
};

export default searchUser;
