import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { UserLoginDTO } from '../types/UserLoginDTO';
import { login as loginUser } from '../services/authService';
import { AxiosError } from 'axios';

/**
 * @function useLogin - A custom hook that handles the login logic.
 * @returns The login function, the loading state, and the error state.
 * @see {@link useState} - A React hook that allows the use of state in a functional component.
 * @see {@link useAuthContext} - A custom hook that returns the authentication context.
 * @see {@link UserLoginDTO} - The data transfer interface for the user login.
 * @see {@link loginUser} - A function that logs in the user.
 * @see {@link fetchUser} - A function that fetches the user data.
 */
const useLogin = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { fetchUser } = useAuthContext();

  const login = async (userCreds: UserLoginDTO) => {
    try {
      setIsLoading(true);
      await loginUser(userCreds);
      await fetchUser();
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

export default useLogin;
