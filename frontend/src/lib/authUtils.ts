export const setAuthToken = (token: string) => {
  document.cookie = `authToken=${token}; SameSite=None; Secure; Path=/; max-age=86400`; // 24 hours
};

export const getAuthToken = (): string | null => {
  return document.cookie.replace(/(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/, "$1") || null;
};

export const removeAuthToken = () => {
  document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure;';
};