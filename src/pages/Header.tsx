import {
  Instagram,
  LinkedIn,
  Mail,
  Twitter,
  WhatsApp,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import mypic from "../assets/images/My Profile.jpg";
import { useTypewriter, Cursor } from "react-simple-typewriter";

function Home() {
  const [text] = useTypewriter({
    words: ["Web Dev", "UI Designer", "Mobile App Dev"],
    loop: true,
  });

  return (
    <div className=" bg-slate-600 h-screen">
      <div className="ml-28 mr-28">
        <div className="flex justify-between p-2">
          <div className="flex">
            <div className="flex items-center">
              <WhatsApp
                style={{ fontSize: "16px", strokeWidth: 1, color: "white" }}
              />
              <p className="ml-1 text-white text-xs">+233 248429031</p>
            </div>
            <div className="flex items-center ml-2">
              <Mail
                style={{ fontSize: "16px", strokeWidth: 1, color: "white" }}
              />
              <p className="ml-1 text-white text-xs">themaingib@gmail.com</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Twitter
              style={{ fontSize: "16px", strokeWidth: 1, color: "white" }}
              className="hover:cursor-pointer"
            />
            <LinkedIn
              style={{ fontSize: "16px", strokeWidth: 1, color: "white" }}
              className="hover:cursor-pointer"
            />
            <Instagram
              style={{ fontSize: "16px", strokeWidth: 1, color: "white" }}
              className="hover:cursor-pointer"
            />
          </div>
        </div>
        <div className="p-4 flex justify-between bg-white rounded-lg items-center">
          <div>
            <h1 className="text-3xl font-bold text-center text-cyan-600">
              GIBBY's DEV
            </h1>
          </div>
          <div className="flex items-center">
            <nav className="mr-10">
              <ul className="flex space-x-5">
                <Link
                  to="/"
                  className="font-bold text-base text-gray-400 hover:text-gray-800"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="font-bold text-base text-gray-400 hover:text-gray-800"
                >
                  About
                </Link>
                <Link
                  to="/service"
                  className="font-bold text-base text-gray-400 hover:text-gray-800"
                >
                  Service
                </Link>
                <Link
                  to="/portfolio"
                  className="font-bold text-base text-gray-400 hover:text-gray-800"
                >
                  Portfolio
                </Link>
                <Link
                  to="/blog"
                  className="font-bold text-base text-gray-400 hover:text-gray-800"
                >
                  Blog
                </Link>
              </ul>
            </nav>
            <button className="bg-blue-400 rounded p-3">
              <span className="text-white font-semibold">Contact Me</span>
            </button>
          </div>
        </div>
        <div className="mt-28">
          <div className="float-right rounded-full p-1 bg-blue-700 w-80 h-80 mx-20">
            <img
              src={mypic}
              alt="My profile pic"
              className="rounded-full bg-blue-800 w-full h-full"
            />
          </div>

          <p className="text-5xl font-bold text-white">
            I'm Gibson and
            <span className="block my-5">
              I am a <span>{text}</span>
              <Cursor />
            </span>
          </p>
          <p className="text-white ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
            aliquam reiciendis maxime animi tempora placeat commodi nulla
            molestiae! Voluptatum esse odio provident cum repellendus eaque eum
            minus velit fugiat. Rerum.
          </p>
          <div className="mt-10 space-x-3">
            <button className="bg-blue-400 p-3 rounded-sm">
              <p className="uppercase text-white font-bold">About Me</p>
            </button>
            <button className="border-white border-2 p-2.5">
              <p className="uppercase text-white font-bold">Contact Me</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
