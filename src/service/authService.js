// import api from "./api";

// export const loginUser = (username, password, role = null) => {
//   return api
//     .post("/login", { username, password, role })
//     .then((res) => res.data);
// };
import api from "./api";

export const loginUser = (username, password) => {
  return api.post("/login", { username, password }).then((res) => res.data);
};
