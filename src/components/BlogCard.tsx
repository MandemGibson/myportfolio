import React from "react";

type BlogCardProps = {
  title: string;
  description: string;
  icon: React.ReactElement;
};

function BlogCard({ title, description, icon }: BlogCardProps) {
  return (
    <div className="flex p-6 w-80 h-44 bg-white shadow-2xl -mt-8 space-x-3 items-start">
      <div>{icon}</div>
      <div>
        <h2 className="font-semibold text-gray-800 text-lg mb-2">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export default BlogCard;
