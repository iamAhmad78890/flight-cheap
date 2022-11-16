import React from "react";
import "./tour.css";
const Tour = () => {
  return (
    <div>
      <section className=" container tours">
        <div className="row1">
          <div className="col content-col">
            <h1>UPCOMING TOURS & DESTINATION</h1>
            <div className="line"></div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consectetur quo dignissimos eius quidem culpa, beatae quasi ea cum
              minima reiciendis ut molestiae consequuntur doloribus aperiam
              neque eaque, at placeat natus.
            </p>
            <button className="ctn-button">Learn More</button>
          </div>
          <div className="col image-col">
            <div className="image-gallery">
              <img src="./images/img3.png" alt="" />
              <img src="./images/img4.png" alt="" />
              <img src="./images/img5.png" alt="" />
              <img src="./images/img6.png" alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tour;
