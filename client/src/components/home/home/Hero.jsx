import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";

const Hero = () => {

  const {user} = useSelector(state =>state.auth)
  const navigate = useNavigate();

  const [input, setInput] = React.useState("");
  const [menuOpen, setMenuOpen] = React.useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const navbar = document.querySelector("nav");
      const navbarHeight = navbar ? navbar.offsetHeight : 80;
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      {/* _________nav bar________ */}

      <nav className="sticky top-0 z-50 ">
        <div className="left-0 top-0 right-0 z-100 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all">
          <img src={logo} alt="Logo" className="h-10 w-auto" />

          {/*_________ Desktop Menu_______ */}
          <div className="hidden sm:flex items-center gap-4 md:gap-8 max-md:text-sm text-gray-800 sticky top-0 z-50">
            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-indigo-500 cursor-pointer"
            >
              {" "}
              Home{" "}
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="hover:text-indigo-500 cursor-pointer"
            >
              {" "}
              Features{" "}
            </button>
            <button
              onClick={() => scrollToSection("testimonial")}
              className="hover:text-indigo-500 cursor-pointer"
            >
              {" "}
              Testimonials{" "}
            </button>
            <button
              onClick={() => scrollToSection("cta")}
              className="hover:text-indigo-500 cursor-pointer"
            >
              {" "}
              Contact{" "}
            </button>
          </div>

          <div>
            <button
              onClick={handleLogin}
              className="max-sm:hidden cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full " hidden = {user}
            >
              Login

            </button>
            <Link to = '/app'className=" hidden md:block px-8 py-2 bg-green-500 hover:bg-green-700 active:scale-95 transition-all rounded-full text-white" hidden ={!user}>
            Dashboard
            </Link>
            <svg
              onClick={() => setMenuOpen(true)}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:hidden"
            >
              <path d="M4 5h16" />
              <path d="M4 12h16" />
              <path d="M4 19h16" />
            </svg>
          </div>
        </div>
        {/*_______ Mobile Menu__________ */}
        <div
          className={`sm:hidden fixed inset-0 ${menuOpen ? "translate-x-0" : "translate-x-full"} overflow-hidden bg-white backdrop-blur shadow-xl rounded-lg z-200 text-sm transition-all`}
        >
          <div className="flex flex-col items-center justify-center h-full text-xl font-semibold gap-6 p-4">
            <a
              href="#"
              onClick={() => scrollToSection("home")}
              className="hover:text-indigo-500 cursor-pointer"
            >
              {" "}
              Home{" "}
            </a>
            <a
              href="#"
              onClick={() => scrollToSection("features")}
              className="hover:text-indigo-500 cursor-pointer"
            >
              {" "}
              Features{" "}
            </a>
            <a
              href="#"
              onClick={() => scrollToSection("testimonial")}
              className="hover:text-indigo-500 cursor-pointer"
            >
              {" "}
              Testimonials{" "}
            </a>
            <a
              href="#"
              onClick={() => scrollToSection("cta")}
              className="hover:text-indigo-500 cursor-pointer"
            >
              {" "}
              Contact{" "}
            </a>
            <button
              onClick={handleLogin}
              className=" cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
            >
              Login
            </button>
            <svg
              onClick={() => setMenuOpen(false)}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute size-8 right-6 top-6 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </div>
        </div>
      </nav>

      {/* _________Hero Section________ */}

      <div
        id="home"
        className="rethink relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-gray-800"
      >
        {/* Avatars + Stars */}
        <div className="flex items-center mt-24 md:mt-36">
          <div className="flex -space-x-3 pr-3">
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
              alt="user3"
              className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-10"
            />
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
              alt="user1"
              className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-20"
            />
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
              alt="user2"
              className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-30"
            />
            <img
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
              alt="user3"
              className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-40"
            />
            <img
              src="https://randomuser.me/api/portraits/men/75.jpg"
              alt="user5"
              className="size-8 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-50"
            />
          </div>

          <div>
            <div className="flex ">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-star text-transparent fill-indigo-600"
                    aria-hidden="true"
                  >
                    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                  </svg>
                ))}
            </div>
            <p className="text-sm text-gray-700"> Used by 10,000+ users </p>
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-semibold max-w-lg md:max-w-2xl text-center mt-4 leading-tight md:leading-tight">
          Land your dream job with us{" "}
          <span className="relative bg-linear-to-r from-purple-700 to-[#764de1] bg-clip-text text-transparent">
            websites
            <div className="z-10 absolute bottom-0 left-0 w-full scale-120">
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gradient_arc.svg"
                alt="gradient"
              />
            </div>
          </span>{" "}
          <span className="relative bg-linear-to-r from-[#764de1] to-indigo-600 bg-clip-text text-transparent">
            with
          </span>{" "}
          AI-Powered resume.
        </h1>

        <p className="max-w-xl text-center text-base my-7">
          A secure pre-built ai resume builder. Build stunning resumes{" "}
        </p>

        {/* Search Box */}

        <form
          onSubmit={onSubmitHandler}
          className="w-full flex justify-center mt-6"
        >
          <div className="flex-1 min-w-0 focus:outline-none text-gray-800">
            {/* INPUT BOX */}
            <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 bg-white shadow-sm transition-all duration-300 group-focus-within:shadow-lg group-focus-within:border-indigo-500">
              {/* ICON */}
              <Search className="text-gray-400 mr-2 group-focus-within:text-indigo-500 transition" />

              {/* INPUT */}
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Search resumes..."
                className="grow focus:outline-none text-gray-800 placeholder-gray-400 transition"
              />

              {/* BUTTON */}
              <button
                type="submit"
                className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 active:scale-95 transition-all duration-200 ml-3"
              >
                Search
              </button>
            </div>

            {/* GLOW EFFECT */}
            <div className="absolute inset-0 rounded-full opacity-0 group-focus-within:opacity-100 transition duration-300 bg-indigo-100 blur-xl -z-10"></div>
          </div>
        </form>
      </div>

      <style>
        {`
                    @import url('https://fonts.googleapis.com/css2?&family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap');

                   .rethink {
                       font-family: 'Rethink Sans', sans-serif;
                   }
                `}
      </style>
    </>
  );
};

export default Hero;
