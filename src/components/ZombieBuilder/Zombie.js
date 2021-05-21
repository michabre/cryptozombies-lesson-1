import React from "react";
import Slider from "../Form/Slider";

const Zombie = ({
  name,
  description,
  clothing,
  eyes,
  eyeColor,
  head,
  shirt,
  skin,
}) => {
  return (
    <div className="card mb-5">
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img
                src="https://bulma.io/images/placeholders/256x256.png"
                alt="Placeholder for a Zombie"
              />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4 has-text-left">{name}</p>
            <p className="subtitle is-6 has-text-left">{description}</p>
          </div>
        </div>

        <div className="content">
          <ul className="list-style-none">
            <li>
              <Slider label="Clothing" val={clothing} min="0" max="360" />
            </li>
            <li>
              <Slider label="Eyes" val={eyes} min="1" max="11" />
            </li>
            <li>
              <Slider label="Eye Colour" val={eyeColor} min="0" max="360" />
            </li>
            <li>
              <Slider label="Head" val={head} min="1" max="7" />
            </li>
            <li>
              <Slider label="Shirt" val={shirt} min="1" max="6" />
            </li>
            <li>
              <Slider label="Skin Colour" val={skin} min="0" max="360" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Zombie;
