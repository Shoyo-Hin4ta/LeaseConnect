// export const setAuthToken = (token: string) => {
//   document.cookie = `accessToken=${token}; SameSite=None; Secure; Path=/; max-age=86400`; // 24 hours
// };

// export const getAuthToken = (): string | null => {
//   return document.cookie.replace(/(?:(?:^|.*;\s*)accessToken\s*=\s*([^;]*).*$)|^.*$/, "$1") || null;
// };

// export const removeAuthToken = () => {
//   document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure;';
// };