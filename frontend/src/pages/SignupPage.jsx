import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import  useAuthStore  from "../store/authStore";

function SignupPage() {

  const navigate =
    useNavigate();

  const {
    signup,
    loading,
  } =
    useAuthStore();

  const [formData,
    setFormData] =
    useState({
      name: "",
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
      await signup(
        formData
      );

    if (
      res.success
    ) {

  navigate(
    "/chat",
    {
      replace: true
    }
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
          Signup
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
            type="text"
            name="name"
            placeholder="Name"

            value={
              formData.name
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
              : "Signup"
            }
          </button>

        </form>

      </div>
    </div>
  );
}

export default SignupPage;