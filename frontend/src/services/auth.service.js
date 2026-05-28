import api
from "../api/axios";

const signup =
(data) => {

  return api.post(
    "/auth/signup",
    data
  );
};

const login =
(data) => {

  return api.post(
    "/auth/login",
    data
  );
};

const logout =
() => {

  return api.post(
    "/auth/logout"
  );
};

const getMe =
(token) => {

  return api.get(
    "/auth/me",
    {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );
};

const refreshToken =
() => {

  return api.post(
    "/auth/refresh-token"
  );
};

export default {
  signup,
  login,
  logout,
  getMe,
  refreshToken,
};