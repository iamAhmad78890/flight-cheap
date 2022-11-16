import React from "react";
import { Link } from "react-router-dom";
import Form from "../form/form";
import "./beatmyquote.css";
function Beatmyquote() {
  return (
    <div
      style={{
        backgroundImage: `url("./images/Untitled.jpg")`,
        backgroundSize: "cover",
        marginTop: "-20px",
      }}
    >
      <div>
        <h1
          style={{
            textAlign: "center",
            paddingTop: "50px",
          }}
        >
          Beat My Quote
        </h1>
        <div className="line"></div>
      </div>
      <Form />
    </div>
  );
}
export default Beatmyquote;
