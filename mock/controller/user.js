// eslint-disable-next-line no-unused-vars
import { handleRandomImage } from "../utils";
const accessTokens = {
  admin: "admin-accessToken",
  editor: "editor-accessToken",
  test: "test-accessToken",
};
export default [
  {
    url: '/login',
    type: 'post',
    // eslint-disable-next-line no-unused-vars
    response: (config) =>{
      const { userName } = config.body;
      const accessToken = accessTokens[userName];
      if (!accessToken) {
        return {
          code: 500,
          msg: "帐户或密码不正确。",
        };
      }
      return {
        code:200,
        msg:'success',
        data:{ accessToken }
      }
    }
  }
]