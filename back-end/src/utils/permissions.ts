import { getUserById } from '../services/userService';
import Permissions from '../types/Permissions';
import Roles from '../types/Roles';

/**
 * @type PermissionsType
 * @description Type that defines the permissions of a user
 */
type PermissionsType = {
  permissions: string[];
};

/**
 * @class UserPermissions
 * @description Class that handles user permissions
 */
export class UserPermissions {
  /** @private can only be accessed within the class */
  private permissions: PermissionsType;

  /**
   * @constructor
   * @description Initializes the permissions object
   */
  constructor() {
    this.permissions = { permissions: [] };
  }

  /**
   * @function getPermissionsByUserId
   * @description Gets the permissions of a user by ID
   * @param {string} id - The ID of the user
   * @returns {Promise<PermissionsType>} The permissions of the user
   * @throws {Error} - returns error if the role is invalid
   * @see {@link getUserById} for more information about that service
   * @see {@link PermissionsType} for more information about that type
   * @see {@link Permissions} for more information about permissions
   * @see {@link Roles} for more information about roles
   * @async
   */
  async getPermissionsByUserId(id: string): Promise<PermissionsType> {
    const user = await getUserById(id);

    if (!user) {
      return { permissions: [] };
    }

    switch (user.role) {
      case Roles.ADMIN:
        return {
          permissions: [Permissions.ADMIN],
        };
      case Roles.TRAINER:
        return { permissions: [Permissions.TRAINER] };

      case Roles.CLIENT:
        return { permissions: [] };

      default:
        throw new Error(`Invalid role for user with ID ${id}`);
    }
  }
}
