import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function Typing({ inputs }) {
  const sequence = inputs.map((item) => item, 800);

  return (
    <TypeAnimation
      sequence={sequence}
      wrapper="span"
      speed={15}
      style={{
        fontSize: "2.8em",
        display: "inline-block",
        fontFamily: "monospace",
        color: "lightgrey",
      }}
    />
  );
}
