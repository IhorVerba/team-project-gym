import { Dispatch, SetStateAction } from 'react';
import { User } from './User';

/**
 * @interface AuthContextValue - The AuthContextValue interface.
 * @property {boolean} isUserLoading - The isUserLoading property.
 * @property {User | null} user - The user property.
 * @property {Dispatch<SetStateAction<User | null>>} setUser - The setUser property.
 * @property {() => Promise<void>} fetchUser - The fetchUser property.
 * @property {() => void} logout - The logout property.
 * @see {@link User} for more information on the User interface.
 * @see {@link Dispatch} for more information on the Dispatch interface.
 */
export interface AuthContextValue {
  isUserLoading: boolean;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  fetchUser: () => Promise<void>;
  logout: () => void;
}
