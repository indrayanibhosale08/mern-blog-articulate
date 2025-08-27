// client/src/hooks/useAuthStatus.js
import { useSelector } from 'react-redux';

/**
 * A custom hook to easily access user authentication status and details.
 * It abstracts the Redux selector logic, providing a clean and reusable way
 * to check if a user is logged in and if they are an administrator.
 *
 * @returns {object} An object containing authentication status.
 * @property {boolean} loggedIn - True if the user is logged in, false otherwise.
 * @property {boolean} isAdmin - True if the logged-in user is an admin.
 * @property {object|null} user - The full userInfo object from the Redux state, or null.
 */
export const useAuthStatus = () => {
  // Select the userInfo object from the Redux user state.
  const { userInfo } = useSelector((state) => state.user);

  // Determine the authentication status based on the presence of userInfo.
  const loggedIn = !!userInfo;
  const isAdmin = userInfo?.isAdmin || false;

  // Return a convenient object with the auth status and user details.
  return { loggedIn, isAdmin, user: userInfo };
};