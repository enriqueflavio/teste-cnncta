import axios from 'axios'
import { getToken } from 'src/services/userControl.js'

// const url = process.env.API
const url = 'http://desenvolvimento.cnncta.com.br/api/v0'

const getHeader = () => {
  return {
    headers: {
      Authorization: `Token ${getToken()}`
    }
  }
}

const getHeaderCC = () => {
  return {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
}

const getHeaderACC = () => {
  return {
    headers: {
      Authorization: `Token ${getToken()}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
}

// Cadastro de usuario
export const signUp = (firstName, lastName, email, username, password) => {
  return axios.post(`${url}/signup`,
    `first_name=${encodeURIComponent(firstName)}&last_name=${encodeURIComponent(lastName)}&email=${encodeURIComponent(email)}&username=${username}&password=${password}`, getHeaderCC())
}

// Autenticação do usuario
export const autenticationUser = (username, password) => {
  return axios.post(`${url}/signin`, `username=${username}&password=${password}`, getHeaderCC())
}

// Buscando os posts.
export const getGalery = () => {
  return axios.get(`${url}/gallery`, getHeader())
}

// Criando um novo post
export const newPost = (title, text) => {
  return axios.post(`${url}/posts`,
    `title=${encodeURIComponent(title)}&text=${encodeURIComponent(text)}`,
    getHeaderACC())
}

// Criando um novo post
export const editPost = (id, title, text) => {
  return axios.put(`${url}/posts/${id}`,
    `title=${encodeURIComponent(title)}&text=${encodeURIComponent(text)}`,
    getHeaderACC())
}

// Deletando um post
export const deletePost = (id) => {
  return axios.delete(`${url}/posts/${id}`, getHeader())
}
