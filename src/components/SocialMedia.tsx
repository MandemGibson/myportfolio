import React from "react";

function SocialMedia({ icon }: { icon: React.ReactElement }) {
  return (
    <div className="rounded-full border p-1 hover:cursor-pointer">
      <div className="w-full h-full">{icon}</div>
    </div>
  );
}

export default SocialMedia;
