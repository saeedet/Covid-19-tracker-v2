import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <p>COVID-19 data sourced from Worldometers, updated every 10 minutes.</p>
      <p className="footer__copyRight">
        Design by <a href="http://saeedet.com/">SaEeD ET</a>
      </p>
    </div>
  );
}

export default Footer;
