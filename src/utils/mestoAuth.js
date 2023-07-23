const baseUrl = "https://auth.nomoreparties.co"

function getResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}
export const register = (email, password) => {
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
       email: email,
       password: password
      })
    })
      .then(getResponse)
}
export const login = (email, password) => {
    return fetch(`${baseUrl}/signin`, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
       email: email,
       password: password
      })
    })
      .then(getResponse)
}
export const getData = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {"Content-Type": "application/json",
    "Authorization" : `Bearer ${token}`},
  })
    .then(getResponse)
}