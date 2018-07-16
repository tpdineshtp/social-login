import config from 'config';
import { authHeader } from '../_helpers';


export const userService = {
    login,
    logout,
    register,
    update,
    update_picture,
    getSocialLoginData
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}/user/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
          console.log(user);
            // login successful if there's a jwt token in the response
            if (user.email) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}


function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/user/register`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/user/update`, requestOptions).then(handleResponse);;
}


function update_picture(file, name) {
  const data = new FormData();
  data.append('file', file);
  data.append('filename', name);

  fetch('http://localhost:3000/file/upload', {
    method: 'POST',
    body: data,
  }).then((response) => {
    response.json().then((body) => {
      console.log(body)
    });
  });
}

function getSocialLoginData(id){
const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
};

    return fetch(`${config.apiUrl}/user/fetch/`+id, requestOptions).then(handleSocialResponse);;
}


function handleResponse(response) {
    return response.text().then(text => {

        const data = text && JSON.parse(text);
        if (response.status != 200) {
            if (response.status === 600) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data[0];
    });
}

function handleSocialResponse(response) {
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (response.status != 200) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      return data;
  });
}
