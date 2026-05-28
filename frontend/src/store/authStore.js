import {
 create
}
from "zustand";

import authService
from
"../services/auth.service";

import
useSocketStore
from
"./socketStore";

const useAuthStore =
create(
(set, get) => ({

  user: null,

  accessToken:
    null,

  isAuthenticated:
    false,

  loading: false,


  signup:
  async (data) => {

    try {

      set({
        loading: true
      });

      const res =
        await authService
        .signup(data);

      set({
        user:
          res.data
          .data.user,

        accessToken:
          res.data
          .data
          .accessToken,

        isAuthenticated:
          true,

        loading:
          false,
      });

      useSocketStore
.getState()
.connectSocket(
  res.data
  .data
  .user
  ._id
);

      return {
        success:
          true
      };

    } catch (error) {

  console.log(error);

  set({
    loading: false
  });

  return {
    success: false,

    message:
      error.response
        ?.data
        ?.message
      ||
      error.message
      ||
      "Something went wrong"
  };
}
  },


  login:
  async (data) => {

    try {

      set({
        loading:
          true
      });

      const res =
        await authService
        .login(data);

      set({

        user:
          res.data
          .data.user,

        accessToken:
          res.data
          .data
          .accessToken,

        isAuthenticated:
          true,

        loading:
          false,
      });

      useSocketStore
.getState()
.connectSocket(
  res.data
  .data
  .user
  ._id
);

      return {
        success:
          true
      };

    } catch (error) {

  console.log(error);

  set({
    loading: false
  });

  return {
    success: false,

    message:
      error.response
        ?.data
        ?.message
      ||
      error.message
      ||
      "Something went wrong"
  };
}
  },


  logout:
  async () => {

    await authService
      .logout();

    set({
      user: null,

      accessToken:
        null,

      isAuthenticated:
        false,
    });

    useSocketStore
.getState()
.disconnectSocket();
  },

  checkAuth:
async () => {

  try {

    set({
      loading: true
    });

    // refresh token
    const refreshRes =
      await authService
      .refreshToken();

    const accessToken =
      refreshRes
      .data
      .data
      .accessToken;

    // get user
    const userRes =
      await authService
      .getMe(
        accessToken
      );

    set({
      user:
        userRes
        .data
        .data,

      accessToken,

      isAuthenticated:
        true,

      loading: false,
    });

    useSocketStore
.getState()
.connectSocket(
  userRes
  .data
  .data
  ._id
);

  } catch {

    set({
      user: null,

      accessToken:
        null,

      isAuthenticated:
        false,

      loading:
        false,
    });
  }
},

setAuth:
({
 user,
 accessToken
}) => {

 set({
   user,

   accessToken,

   isAuthenticated:
     true,
 });
},

}));



export default useAuthStore;