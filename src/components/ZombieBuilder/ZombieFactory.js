import React from "react";
import Zombie from "./Zombie";

const ZombieFactory = ({ details }) => {
  if (details) {
    const {
      clothesColorChoice,
      eyeChoice,
      eyeColorChoice,
      headChoice,
      shirtChoice,
      skinColorChoice,
      zombieDescription,
      zombieName,
    } = details;

    return (
      <>
        <Zombie
          name={zombieName}
          description={zombieDescription}
          clothing={clothesColorChoice}
          eyes={eyeChoice}
          eyeColor={eyeColorChoice}
          head={headChoice}
          shirt={shirtChoice}
          skin={skinColorChoice}
        />
      </>
    );
  } else {
    return null;
  }
};

export default ZombieFactory;
