import React from "react";
import "./contact.css";

const Contact = () => {
  return (
    <div className="container">
      <div style={{ marginTop: "30px" }}>
        <div className="text-center">
          <h1>Contact Us</h1>
          <div className="line"></div>
        </div>
        <div className="container">
          <h1>Email & Phone</h1>
          <p>12345678</p>
          <p>Info@FlightCheap.co.uk</p>
          <p>Booking@FlightCheap.co.uk</p>
          <h1>Address</h1>
          <p>London,United Kingdom</p>
          <h1>Social Media</h1>
          <section className="footer">
            <div className="socials" style={{ textAlign: "initial" }}>
              <a href=" # ">
                <i className="fab fa-facebook-square"></i>
              </a>

              <a href=" # ">
                <i className="fab fa-instagram-square"></i>
              </a>
              <a href=" #">
                <i className="fab fa-twitter-square"></i>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contact;
