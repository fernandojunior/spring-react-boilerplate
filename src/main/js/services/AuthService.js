/* @flow */
import axios from 'axios';

class AuthService {

  signIn(username : string, password: string) : Object {
    const data = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
      return axios.post('/api/signin', data);
  }

  signOut() : Object {
    return axios.post('/api/signout');
  }

}

export default AuthService;
