export const setAuthToken = (token: string) => {
    try {
      document.cookie = `authToken=${token}; SameSite=None; Secure; Path=/`;
    } catch (e) {
      localStorage.setItem('authToken', token);
    }
  };
  
  export const getAuthToken = (): string | null => {
    const cookieToken = document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (cookieToken) return cookieToken;
    return localStorage.getItem('authToken');
  };
  
  export const removeAuthToken = () => {
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('authToken');
  };