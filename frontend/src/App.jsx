import {
 BrowserRouter,
 Routes,
 Route
}
from
"react-router-dom";

import LoginPage
from "./pages/LoginPage";

import SignupPage
from "./pages/SignupPage";

import ChatPage
from "./pages/ChatPage";

import OAuthSuccessPage
from "./pages/OAuthSuccessPage";

import ProtectedRoute
from "./routes/ProtectedRoute";

import {
 useEffect
}
from "react";

import 
 useAuthStore

from "./store/authStore";

function App() {
const checkAuth =
  useAuthStore(
    (
      state
    ) =>
    state
    .checkAuth
  );

const loading =
  useAuthStore(
    (
      state
    ) =>
    state.loading
  );

useEffect(() => {

  checkAuth();

}, []);

if (loading) {

  return (
    <div>
      Loading...
    </div>
  );
}
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={
            <LoginPage />
          }
        />

        <Route
          path="/signup"
          element={
            <SignupPage />
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>

              <ChatPage />

            </ProtectedRoute>
          }
          />

        <Route
          path=
          "/oauth-success"

          element={
            <OAuthSuccessPage />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;