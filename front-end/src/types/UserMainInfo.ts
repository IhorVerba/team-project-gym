/**
 * @interface UserMainInfo - describes the main information of a user.
 * @property {string} _id - The id of the user.
 * @property {string} email - The email of the user.
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} photoUrl - The photo url of the user.
 */
export interface UserMainInfo {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
}
