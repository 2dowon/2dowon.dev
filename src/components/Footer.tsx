import React from "react";

const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={`mt-[0.5rem] text-xs text-gray-8 ${className}`}>
      © {new Date().getFullYear()}, 2dowon all rights reserved.
    </footer>
  );
};

export default Footer;
