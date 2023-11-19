import React from "react";

function ImgCard({ image }: { image: string }) {
  return (
    <div className="w-56 h-40 bg-gray-400 shadow-md drop-shadow-sm hover:drop-shadow-2xl hover:cursor-pointer shadow-gray-600">
      <img src={image} alt="" className="w-full h-full object-fill" />
    </div>
  );
}

export default ImgCard;
