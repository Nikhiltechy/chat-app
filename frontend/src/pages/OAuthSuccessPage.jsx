import {
 useEffect
}
from "react";

import {
 useNavigate,
 useSearchParams
}
from
"react-router-dom";

import authService
from
"../services/auth.service";

import 
 useAuthStore

from
"../store/authStore";



function
OAuthSuccessPage() {

  const navigate =
    useNavigate();

  const [
    searchParams
  ] =
    useSearchParams();

  const token =
    searchParams
    .get(
      "token"
    );

  const setAuth =
    useAuthStore(
      (
        state
      ) =>
      state
      .setAuth
    );

  useEffect(() => {

    const loadUser =
    async () => {

      try {

        const res =
          await authService
          .getMe(
            token
          );

        setAuth({

          user:
            res.data
            .data,

          accessToken:
            token,
        });

        navigate(
          "/chat"
        );

      } catch (
        err
      ) {

        navigate(
          "/login"
        );
      }
    };

    if (
      token
    ) {

      loadUser();
    }

  }, []);

  return (
    <div>
      Logging in...
    </div>
  );
}

export default
OAuthSuccessPage;