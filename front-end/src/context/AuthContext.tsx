import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AuthContextValue } from '../types/AuthContextValue';
import { User } from '../types/User';
import {
  logout as logoutUser,
  fetchUser as fetchUserByToken,
} from '../services/authService';

/**
 * @constant AuthContext - The context that provides the authentication state and functions.
 * @property {boolean} isUserLoading - The loading state of the user.
 * @property {User | null} user - The user.
 * @property {React.Dispatch<React.SetStateAction<User | null>} setUser - The function to set the user.
 * @property {() => Promise<void>} fetchUser - The function to fetch the user.
 * @property {() => void} logout - The function to log out the user.
 * @see {@link AuthContextValue} - The type of the authentication context value.
 * @see {@link User} - The user type.
 * @see {@link logoutUser} - The function to log out the user.
 * @see {@link fetchUserByToken} - The function to fetch the user.
 */
export const AuthContext = createContext<AuthContextValue>({
  isUserLoading: false,
  user: null,
  setUser: () => Promise.resolve(),
  fetchUser: () => Promise.resolve(),
  logout: () => {
    return;
  },
});

/**
 * @function useAuthContext - A custom hook that provides the authentication context.
 * @returns The authentication context.
 * @see {@link AuthContext} - The context that provides the authentication state and functions.
 */
export const useAuthContext = () => useContext(AuthContext);

/**
 * @interface AuthProviderProps - The props for the AuthProvider component.
 * @property {ReactNode} children - The children to be rendered.
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * @function AuthProvider - A component that provides the authentication context.
 * @param {AuthProviderProps} children - The children to be rendered.
 * @returns The authentication context provider.
 * @see {@link AuthProviderProps} - The props for the AuthProvider component.
 * @see {@link User} - The user type.
 * @see {@link logoutUser} - The function to log out the user.
 * @see {@link fetchUserByToken} - The function to fetch the user.
 * @see {@link AuthContextValue} - The type of the authentication context value.
 * @see {@link AuthContext} - The context that provides the authentication state and functions.
 */
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  const logout = async () => {
    logoutUser();
    setUser(null);
  };

  const fetchUser = async (): Promise<void> => {
    try {
      const user = await fetchUserByToken();
      if (!user) {
        logout();
      }
      setUser(user);
    } catch (err) {
      localStorage.removeItem('accessToken');
    } finally {
      setIsUserLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isUserLoading,
        user,
        setUser,
        fetchUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
