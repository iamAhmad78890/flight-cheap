import React from "react";
import "./explore.css";
export default function Explore() {
  return (
    <div>
      <section
        className="explore"
        style={{ backgroundImage: `url("./images/bg2.png")` }}
      >
        <div className="explore-content">
          <h3>EXPLORE THE WORLD</h3>
          <div className="line"></div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
            repellendus sapiente ipsa reprehenderit suscipit iusto odit
            corrupti, quam velit eligendi laboriosam aspernatur tempore quaerat
            voluptate.
          </p>
          <button className="explore-btn">Learn more</button>
        </div>
      </section>
    </div>
  );
}
