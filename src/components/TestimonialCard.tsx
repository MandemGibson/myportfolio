import { Avatar } from "@mui/material";
import React from "react";

type TestimonialCardProps = {
  rating: React.ReactElement[];
  testimonial: string;
  avatar?: string;
  name: string;
  occupation: string;
};

function TestimonialCard({ ...everything }: TestimonialCardProps) {
  return (
    <div className="border-2 border-blue-500 rounded-lg p-5 w-80 overflow-hidden">
      <div className="flex text-yellow-300">{everything.rating}</div>
      <p className="text-base text-gray-400">{everything.testimonial}</p>
      <div className="flex items-center mt-2 space-x-4">
        <div className="p-1 shadow-2xl shadow-slate-400 rounded-full w-20 h-20">
          <Avatar
            src={everything.avatar}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl text-gray-800">{everything.name}</h3>
          <h4 className="text-sm text-gray-600">{everything.occupation}</h4>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
