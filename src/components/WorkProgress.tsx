import React from "react";

type WorkProgressProps = {
  num: number;
  icon: React.ReactElement;
  title: string;
  description: string;
};

function WorkProgress({ num, ...rest }: WorkProgressProps) {
  return (
    <div className="w-80 h-80 p-6 border border-gray-400 relative z-10 mb-8">
      <p className="absolute top-0 left-0 text-10xl text-gray-200 -z-10">
        {num}
      </p>
      <div>{rest.icon}</div>
      <h2 className="my-3 text-xl font-bold text-gray-800">{rest.title}</h2>
      <p className="text-base text-gray-500 font-semibold">
        {rest.description}
      </p>
    </div>
  );
}

export default WorkProgress;
