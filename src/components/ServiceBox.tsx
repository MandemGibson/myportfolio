import React from "react";

type ServiceBoxProps = {
  title: string;
  description: string | JSX.Element;
  icon: React.ReactElement;
};

function ServiceBox({ icon, title, description }: ServiceBoxProps) {
  return (
    <div className="bg-white px-5 py-8 w-80 flex flex-col items-center mb-8 rounded-lg">
      <div>{icon}</div>
      <h2 className="text-2xl text-gray-700 font-semibold">{title}</h2>
      <p className="text-sm mt-2 text-gray-400 text-center">{description}</p>
    </div>
  );
}

export default ServiceBox;
