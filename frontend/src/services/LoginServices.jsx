import axios from "../Api/axios";
class LoginServices {
  getLoginUser(uid) {
    return axios.get(`/login/${uid}`);
  }
}
export default new LoginServices();
