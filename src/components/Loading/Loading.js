import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loading-block">
      <progress className="progress is-large is-info" max="100">
        60%
      </progress>
      <h6 className="has-text-centered">
        Loading Web3, accounts, and contracts...
      </h6>
    </div>
  );
};

export default Loading;
