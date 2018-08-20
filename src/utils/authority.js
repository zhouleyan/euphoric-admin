// use localStorage to store the authority info, which might be sent from server in actual project
export const getAuthority = () =>
  localStorage.getItem('euphoric-authority') || 'admin';

export const setAuthority = authority =>
  localStorage.setItem('euphoric-authority', authority);
