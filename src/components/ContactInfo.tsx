import React from "react";
type ContactInfoProps = {
  icon: React.ReactElement;
  title: string;
  subtitle: string;
};

function ContactInfo({ ...everything }: ContactInfoProps) {
  return (
    <div className="flex items-center space-x-2">
      <div>{everything.icon}</div>
      <div>
        <h2 className="text-2xl font-semibold text-gray-700">
          {everything.title}
        </h2>
        <h3 className="text-gray-500">{everything.subtitle}</h3>
      </div>
    </div>
  );
}

export default ContactInfo;
