import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";

const Profile = ({ author }: { author: any }) => {
  return (
    <div className="flex w-full items-center gap-[1rem] rounded-md bg-white p-[1rem] pc:flex-col pc:justify-center pc:px-[1rem] pc:py-[1.5rem]">
      <StaticImage
        className="min-w-[5rem] rounded-[100%]"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/profile-pic.jpeg"
        width={100}
        height={100}
        quality={95}
        alt="Profile picture"
      />
      {author?.name && (
        <div className="flex flex-col pc:items-center">
          <div className="w-[6rem] rounded-md bg-green py-[0.3rem] text-center font-serif text-detail-1 font-bold text-ivory">
            @{author.name}
          </div>
          <div className="mt-[0.5rem] text-gray-8">
            {author?.summary || null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
