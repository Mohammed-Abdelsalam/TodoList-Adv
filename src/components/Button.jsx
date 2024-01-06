import React from "react";

const Button = ({ onClick, icon, btnName, className, type }) => {
  return (
    <button onClick={onClick} className={className} type={type}>
      {icon}
      {btnName}
    </button>
  );
};

export default Button;
