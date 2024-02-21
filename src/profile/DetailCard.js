import React from "react";
import "./DetailCard.css";

export default function DetailCard({ info }) {
  return (
    <div className="details">
      {Object.entries(info).map(([key, value], index) => (
        <div key={index}>
          <strong>{key}:</strong> {value}
        </div>
      ))}
    </div>
  );
}
