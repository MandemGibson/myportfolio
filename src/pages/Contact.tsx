import { Alarm, Call, LocationOnOutlined, Mail } from "@mui/icons-material";
import ContactInfo from "../components/ContactInfo";

function Contact() {
  const iconStyle = {
    color: "#01579b",
    fontSize: "2rem",
  };
  return (
    <div className="flex mt-16 ml-28 mr-28 justify-around">
      <div className="flex flex-col space-y-4 justify-center">
        <h1 className="text-4xl font-semibold text-gray-800">
          Postal Information
        </h1>
        <ContactInfo
          icon={<Call style={iconStyle} />}
          title="Call Me"
          subtitle="+233-24-842-9031"
        />
        <ContactInfo
          icon={<Mail style={iconStyle} />}
          title="Mail"
          subtitle="themaingib@gmail.com"
        />
        <ContactInfo
          icon={<LocationOnOutlined style={iconStyle} />}
          title="Address"
          subtitle="Sekondi, Ghana"
        />
        <ContactInfo
          icon={<Alarm style={iconStyle} />}
          title="Time Zone"
          subtitle="GMT +0.00 Africa/Ghana"
        />
      </div>
      <div className=" shadow-lg p-6 w-2/5">
        <form className="flex flex-col space-y-4 text-center">
          <h2 className="text-3xl font-semibold text-gray-700">
            Let's Connect
          </h2>
          <input type="text" placeholder="Name" className="input" />
          <input type="text" placeholder="Email" className="input" />
          <input type="text" placeholder="Subject" className="input" />
          <textarea
            placeholder="Message"
            cols={30}
            rows={5}
            className="input"
          />
          <button className="bg-blue-500 rounded text-white p-2 font-semibold my-5">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
