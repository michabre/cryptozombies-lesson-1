import React from "react";

const Header = ({ title, subtitle }) => {
  return (
    <header>
      <h1 className="title">{title}</h1>
      <h2 className="subtitle">{subtitle}</h2>
    </header>
  );
};

export default Header;
