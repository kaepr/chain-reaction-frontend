export function setAccessToken(accessToken) {
  localStorage.setItem('ACCESS_TOKEN', JSON.stringify(accessToken));
}

export function setRefreshToken(refreshToken) {
  localStorage.setItem('REFRESH_TOKEN', JSON.stringify(refreshToken));
}

export function getAccessToken() {
  const token = localStorage.getItem('ACCESS_TOKEN');
  const accessToken = JSON.parse(token);
  return accessToken;
}

export function getRefreshToken() {
  const token = localStorage.getItem('REFRESH_TOKEN');
  const refreshToken = JSON.parse(token);
  return refreshToken;
}

export function removeAccessToken() {
  localStorage.removeItem('ACCESS_TOKEN');
}

export function removeRefreshToken() {
  localStorage.removeItem('REFRESH_TOKEN');
}
