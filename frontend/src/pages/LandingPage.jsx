import {
 Link
}
from
"react-router-dom";

function LandingPage() {

  return (
    <div
      className="
      min-h-screen
      bg-white
    "
    >

      {/* Navbar */}

      <nav
        className="
        px-8
        py-5
        flex
        items-center
        justify-between
        border-b
      "
      >

        <h1
          className="
          text-2xl
          font-bold
        "
        >
          ChatFlow
        </h1>

        <div
          className="
          flex
          gap-4
        "
        >

          <Link
            to="/login"

            className="
            px-5
            py-2
            rounded-xl
            hover:bg-gray-100
            transition
          "
          >
            Login
          </Link>

          <Link
            to="/signup"

            className="
            bg-black
            text-white
            px-5
            py-2
            rounded-xl
          "
          >
            Get Started
          </Link>

        </div>
      </nav>


      {/* Hero */}

      <section
        className="
        max-w-7xl
        mx-auto
        px-8
        py-24
        flex
        flex-col
        lg:flex-row
        items-center
        justify-between
        gap-16
      "
      >

        {/* Left */}

        <div
          className="
          flex-1
        "
        >

          <p
            className="
            text-sm
            bg-gray-100
            inline-block
            px-4
            py-2
            rounded-full
            mb-6
          "
          >
            Modern Realtime Messaging
          </p>

          <h1
            className="
            text-6xl
            font-bold
            leading-tight
            mb-6
          "
          >
            Chat Better,
            <br />
            Connect Faster.
          </h1>

          <p
            className="
            text-gray-500
            text-lg
            mb-8
            max-w-xl
          "
          >
            A fast, secure,
            realtime chat platform
            built for modern
            conversations.
          </p>

          <div
            className="
            flex
            gap-4
          "
          >

            <Link
              to="/signup"

              className="
              bg-black
              text-white
              px-8
              py-4
              rounded-2xl
              text-lg
            "
            >
              Start Chatting
            </Link>

            <Link
              to="/login"

              className="
              border
              px-8
              py-4
              rounded-2xl
              text-lg
            "
            >
              Login
            </Link>

          </div>

        </div>


        {/* Right Mock UI */}

        <div
          className="
          flex-1
          flex
          justify-center
        "
        >

          <div
            className="
            w-full
            max-w-lg
            bg-gray-100
            rounded-[32px]
            p-6
            shadow-xl
          "
          >

            <div
              className="
              bg-white
              rounded-3xl
              p-5
              shadow-sm
            "
            >

              <div
                className="
                flex
                items-center
                gap-3
                mb-6
              "
              >

                <div
                  className="
                  w-12
                  h-12
                  rounded-full
                  bg-black
                "
                />

                <div>

                  <h3
                    className="
                    font-semibold
                  "
                  >
                    Rahul
                  </h3>

                  <p
                    className="
                    text-sm
                    text-green-500
                  "
                  >
                    Online
                  </p>

                </div>

              </div>

              <div
                className="
                space-y-4
              "
              >

                <div
                  className="
                  bg-gray-200
                  px-5
                  py-3
                  rounded-3xl
                  w-fit
                "
                >
                  Hey 👋
                </div>

                <div
                  className="
                  bg-black
                  text-white
                  px-5
                  py-3
                  rounded-3xl
                  ml-auto
                  w-fit
                "
                >
                  Hello!
                </div>

                <div
                  className="
                  bg-gray-200
                  px-5
                  py-3
                  rounded-3xl
                  w-fit
                "
                >
                  Ready to chat?
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default LandingPage;