import React from "react";
import { Link } from "react-router-dom";

const RenderBlueUrl = props => {
  return (
    <div>
      <Link
        to={props.to}
        style={{
          textDecoration: "underline",
          display: "flex",
          alignItems: "center",
          color: "#1db3e7",
          fontSize: props.fontSize,
          textUnderlinePosition: "below",
          WebkitTextUnderlinePosition: "under",
          MsTextUnderlinePosition: "below",
          textUnderlinePosition: "under"
        }}
      >
        {props.icon}
        <span style={{ marginLeft: 5 }}>{props.anchorText}</span>
      </Link>
      {props.text && <p style={{ margin: 0 }}>{props.text}</p>}
    </div>
  );
};

export default RenderBlueUrl;
