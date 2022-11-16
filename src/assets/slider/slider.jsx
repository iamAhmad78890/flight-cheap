import React from "react";
import "./slider.css";
import Marquee from "react-fast-marquee";
export default function Slider() {
  return (
    <div>
      <div className="title">
        <h1>Our Client</h1>
        <div className="line1 "></div>
      </div>
      <Marquee
        style={{ marginTop: "80px" }}
        direction="left"
        pauseOnClick="false"
        speed={40}
        delay={0}
        gradientWidth="10"
      >
        <div className="image_wrapper">
          <img src="/images/Thai_Airways.png" alt="" />
        </div>
        <div className="image_wrapper">
          <img src="/images/Egypt.png" alt="" />
        </div>
        <div className="image_wrapper">
          <img src="/images/pakistan.png" alt="" />
        </div>
        <div className="image_wrapper">
          <img src="/images/Virgin_Austral.png" alt="" />
        </div>
        <div>
          <img src="/images/turkish-airlines.png" alt="" />
        </div>
        <div className="image_wrapper">
          <img src="/images/Air_Transt.png" alt="" />
        </div>
        <div className="image_wrapper">
          <img src="/images/United.png" alt="" />
        </div>

        <div className="image_wrapper">
          <img src="/images/Oman.png" alt="" />
        </div>
      </Marquee>
    </div>
  );
}
