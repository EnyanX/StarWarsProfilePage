import React from "react";
import { TypeAnimation } from "react-type-animation";

export default function Typing({ inputs }) {
  const repeat = 800;
  const sequence = inputs.map((item) => item, repeat);

  return (
    <TypeAnimation
      sequence={sequence}
      wrapper="span"
      speed={15}
      style={{
        fontSize: "2em",
        display: "inline-block",
        fontFamily: "monospace",
        color: "white",
      }}
      repeat={Infinity}
    />
  );
}
