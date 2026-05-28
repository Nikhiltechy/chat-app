import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import  useAuthStore from "../store/authStore";

function LoginPage() {

  const navigate =
    useNavigate();

  const {
    login,
    loading,
  } =
    useAuthStore();

  const [formData,
    setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange =
    (e) => {

      setFormData(
        (
          prev
        ) => ({
          ...prev,

          [e.target.name]:
            e.target.value,
        })
      );
    };

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    const res =
      await login(
        formData
      );

    if (
      res.success
    ) {
      navigate(
        "/chat"
      );
    } else {
      alert(
        res.message
      );
    }
  };

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
    "
    >

      <div
        className="
        bg-white
        p-8
        rounded-xl
        shadow-lg
        w-full
        max-w-md
      "
      >

        <h1
          className="
          text-3xl
          font-bold
          mb-6
          text-center
        "
        >
          Login
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="
          space-y-4
        "
        >

          <input
            type="email"
            name="email"
            placeholder="Email"

            value={
              formData.email
            }

            onChange={
              handleChange
            }

            className="
            w-full
            border
            p-3
            rounded-lg
          "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"

            value={
              formData.password
            }

            onChange={
              handleChange
            }

            className="
            w-full
            border
            p-3
            rounded-lg
          "
          />

          <button
            disabled={
              loading
            }

            className="
            w-full
            bg-black
            text-white
            py-3
            rounded-lg
          "
          >

            {
              loading
              ? "Loading..."
              : "Login"
            }

          </button>
        </form>

        <button
          onClick={() => {

            window.location.href =
              "http://localhost:5000/api/auth/google";
          }}

          className="
          w-full
          mt-4
          border
          py-3
          rounded-lg
        "
        >
          Continue
          with Google
        </button>

        <p
          className="
          text-center
          mt-4
        "
        >

          No account?

          <Link
            to="/signup"

            className="
            text-blue-500
            ml-1
          "
          >
            Signup
          </Link>

        </p>

      </div>
    </div>
  );
}

export default LoginPage;