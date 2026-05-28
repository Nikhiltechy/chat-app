import {
 Navigate
}
from
"react-router-dom";

import 
 useAuthStore

from
"../store/authStore";

function
ProtectedRoute({
 children
}) {

  const {
    isAuthenticated,
    loading,
  } =
    useAuthStore();

  if (
    loading
  ) {

    return (
      <div>
        Loading...
      </div>
    );
  }

  if (
    !isAuthenticated
  ) {

    return (
      <Navigate
        to="/login"
      />
    );
  }

  return children;
}

export default
ProtectedRoute;