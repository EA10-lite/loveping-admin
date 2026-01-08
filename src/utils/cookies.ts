import Cookies from 'js-cookie';

/**
 * Cookie Utility Functions
 * 
 * Provides secure cookie management for authentication tokens.
 * Uses secure settings to protect tokens from XSS and CSRF attacks.
 */

// Cookie name constants
export const COOKIE_NAMES = {
  ACCESS_TOKEN: 'access-token',
} as const;

/**
 * Cookie options for secure token storage
 * - secure: Only sent over HTTPS (in production)
 * - sameSite: 'strict' prevents CSRF attacks
 * - expires: Set based on token expiration (default 7 days)
 */
const getSecureCookieOptions = (expiresInDays: number = 7) => {
  const isProduction = import.meta.env.PROD;
  
  return {
    secure: isProduction, // Only use secure cookies in production (HTTPS required)
    sameSite: 'strict' as const, // Prevents CSRF attacks
    expires: expiresInDays, // Cookie expiration in days
    path: '/', // Available across the entire site
  };
};

/**
 * Extracts expiration time from JWT token
 * @param token - JWT token string
 * @returns Expiration time in days, or default 7 days if unable to parse
 */
const getTokenExpirationDays = (token: string): number => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp) {
      const expirationTime = payload.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      const timeUntilExpiry = expirationTime - currentTime;
      const daysUntilExpiry = timeUntilExpiry / (1000 * 60 * 60 * 24); // Convert to days
      
      // Return days, but ensure it's at least 1 day and not more than 30 days
      return Math.max(1, Math.min(30, Math.ceil(daysUntilExpiry)));
    }
  } catch (error) {
    console.warn('Unable to parse token expiration, using default 7 days', error);
  }
  return 7; // Default to 7 days
};

/**
 * Securely stores an authentication token in cookies
 * @param token - JWT token to store
 * @param cookieName - Name of the cookie (defaults to ACCESS_TOKEN)
 */
export const setAuthToken = (token: string, cookieName: string = COOKIE_NAMES.ACCESS_TOKEN): void => {
  if (!token) {
    console.warn('Attempted to set empty token');
    return;
  }

  // Calculate expiration based on token's actual expiration
  const expiresInDays = getTokenExpirationDays(token);
  
  // Set cookie with secure options
  Cookies.set(cookieName, token, getSecureCookieOptions(expiresInDays));
};

/**
 * Retrieves an authentication token from cookies
 * @param cookieName - Name of the cookie (defaults to ACCESS_TOKEN)
 * @returns Token string or undefined if not found
 */
export const getAuthToken = (cookieName: string = COOKIE_NAMES.ACCESS_TOKEN): string | undefined => {
  return Cookies.get(cookieName);
};

/**
 * Removes an authentication token from cookies
 * @param cookieName - Name of the cookie (defaults to ACCESS_TOKEN)
 */
export const removeAuthToken = (cookieName: string = COOKIE_NAMES.ACCESS_TOKEN): void => {
  Cookies.remove(cookieName, {
    path: '/', // Must match the path used when setting the cookie
    sameSite: 'strict',
  });
};

/**
 * Checks if an authentication token exists in cookies
 * @param cookieName - Name of the cookie (defaults to ACCESS_TOKEN)
 * @returns True if token exists, false otherwise
 */
export const hasAuthToken = (cookieName: string = COOKIE_NAMES.ACCESS_TOKEN): boolean => {
  return !!getAuthToken(cookieName);
};
