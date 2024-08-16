/**
 * @interface UserLoginDTO - describes the data that is required for a user to login.
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 */
export interface UserLoginDTO {
  email: string;
  password: string;
}
