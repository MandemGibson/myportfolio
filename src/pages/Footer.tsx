import { HashLink as Link } from "react-router-hash-link";
import SocialMedia from "../components/SocialMedia";
import {
  CallOutlined,
  Instagram,
  LinkedIn,
  LocationOnOutlined,
  MailOutline,
  Twitter,
  WhatsApp,
} from "@mui/icons-material";
import ContactInfo from "../components/ContactInfo";

function Footer() {
  return (
    <>
      <div className="flex space-x-20 bg-blue-950 text-white px-28 py-10">
        <div className="w-80 space-y-5">
          <div className="w-full h-16 bg-white text-black rounded flex items-center justify-center">
            <h1 className="text-2xl font-bold text-center text-cyan-600">
              Gibby's Dev
            </h1>
          </div>
          <p className="text-sm font-semibold">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque
            blanditiis distinctio corporis delectus.
          </p>
          <div className="flex space-x-4">
            <SocialMedia icon={<WhatsApp />} />
            <SocialMedia icon={<Twitter />} />
            <SocialMedia icon={<LinkedIn />} />
            <SocialMedia icon={<Instagram />} />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Contact Info</h3>
          <ContactInfo
            icon={<CallOutlined />}
            subtitle="+233248429031"
            subtitleColor="text-white font-semibold text-sm"
          />
          <ContactInfo
            icon={<MailOutline />}
            subtitle="themaingib@gmail.com"
            subtitleColor="text-white font-semibold text-sm"
          />
          <ContactInfo
            icon={<LocationOnOutlined />}
            subtitle="+233248429031"
            subtitleColor="text-white font-semibold text-sm"
          />
        </div>
        <div className="flex flex-col items-center space-y-1">
          <h2 className="text-xl font-bold">Quick Links</h2>
          <ul className="space-y-2 font-semibold">
            <li>
              <Link to="#home" smooth>
                Home
              </Link>
            </li>
            <li>
              <Link to="#about" smooth>
                About
              </Link>
            </li>
            <li>
              <Link to="#service" smooth>
                Service
              </Link>
            </li>
            <li>
              <Link to="#portfolio" smooth>
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="#blog" smooth>
                Blog
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center bg-blue-400 p-2">
        <p className="text-sm text-white font-semibold">
          Copyright © 2023 - themaingib - All Rights Reserved
        </p>
      </div>
    </>
  );
}

export default Footer;
