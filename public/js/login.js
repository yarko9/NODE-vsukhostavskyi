/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/graphql',
      data: {
        query: `
            mutation {
                login(email: "${email}", password: "${password}") {
                    name
                }
            }
        `
      }
    });

    if (!res.data.errors) {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    } else {
        showAlert('error', res.data.errors[0].message);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/graphql',
      data: {
        query: `
            mutation {
                logout
            }
        `
      }
    });

    if ((res.data.data.logout)) location.reload(true);
  } catch (err) {
    console.error(err.response);
    showAlert('error', 'Error logging out! Try again.');
  }
};
