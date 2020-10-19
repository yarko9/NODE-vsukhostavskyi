/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  try {
    const userData = {};
    if (type !== 'password') {
        data.forEach(function(value, key){
            userData[key] = value;
        });
    };

    const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3000/graphql',
        data: {
            query: type === 'password' 
            ? `
                mutation {
                    updatePassword(
                        password: "${data.password}"
                        passwordConfirm: "${data.passwordConfirm}"
                        passwordCurrent: "${data.passwordCurrent}"
                    ) {
                        name
                    }
                }
            `
            : `
                mutation {
                    updateMe(
                        name: "${userData.name}"
                        email: "${userData.email}"
                    ) {
                        name
                        email
                    }
                }
            `
        }
    });

    if (res.data.data.updateMe || res.data.data.updatePassword) {
      showAlert('success', `${type.toUpperCase()} updated successfully!`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
