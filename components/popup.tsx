import React from "react";


import CookieConsent, { Cookies } from "react-cookie-consent";

const Popup = () => {
  return (
    <div className="popup">
      
      <CookieConsent 
        disableStyles
        location="none"
        buttonText="  Accept All  "
        cookieName="Third Party Cookie"
        overlay
        overlayClasses="overlayclass"
        buttonStyle={{backgroundColor: "lightgreen",marginTop: "4px",lineHeight : 0.5, padding: 20 }}
      >
        This Website uses Third Party Cookies to make good user's Experience and to control  the traffic coming to this website.
      </CookieConsent>
    </div>
  );
};

export default Popup;