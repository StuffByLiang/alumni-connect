import axios from 'axios';

export const userService = {
    login,
    // logout,
    // register,
    // getAll,
    // getById,
    // update,
    // delete: _delete
};


async function login(username, password) {
  const data = {
    loginInfo: username,
    password: password,
  };

  let response = await axios.post("/user/login", data);
  console.log(response);
  return response;
}
