import React from "react";

const ZombieItem = ({ item, value }) => {
  return (
    <li>
      {item} : {value}
    </li>
  );
};

export default ZombieItem;
