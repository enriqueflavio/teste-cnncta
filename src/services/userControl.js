import encryptApi from 'src/services/encryptService.js'

// Recupera dado do usuario e salva no localstorage
// export const recoveryUser = (email) => {
//   getUserPrivate(email).then(response => {
//     // Response.data não aparece no console.log, mas aparece na aba network > resposne
//     response.json().then(response => {
//       localStorage.setItem('infoUser', JSON.stringify(response))
//     })
//   })
// }

// Variaveis globais para uso no localstorage
const keyEncryptToken = 't3ste.c0n3ct@'
const nameTokenLocalstorage = 'cacheStorage'

// Add token de autenticação no localstorage
export const addToken = (token) => {
  const keyToken = encryptApi.getKey(keyEncryptToken)
  const encryptedToken = encryptApi.encrypt(keyToken, token)
  localStorage.setItem(nameTokenLocalstorage, encryptedToken)
}

export const getToken = () => {
  const encryptedToken = localStorage.getItem(nameTokenLocalstorage)
  const keyToken = encryptApi.getKey(keyEncryptToken)
  const decryptToken = encryptApi.decrypt(keyToken, encryptedToken)
  return decryptToken
}

export const hasToken = () => {
  return !!localStorage.getItem(nameTokenLocalstorage)
}

export const clearToken = () => {
  localStorage.removeItem(nameTokenLocalstorage)
}

// Controle de usuario logado.
export const addUserLogado = (user) => {
  localStorage.setItem('userName', user)
}

export const getUserLogado = () => {
  return localStorage.getItem('userName')
}

export const hasUserLogado = () => {
  return !!localStorage.getItem('userName')
}

export const clearUserLogado = () => {
  localStorage.removeItem('userName')
}
