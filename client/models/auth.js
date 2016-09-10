import axios from 'axios';

export function signUp(username, password) {
  return axios.post('/signup', { 
      username: username, 
      password: password 
    })
  }

export function logIn (username, password) {
  return axios.post('/login', {
        username: username,
        password: password
  })
}

export function logOut (){
  return axios.get('/logout')
    .then(function(response){
      return response 
  })
}