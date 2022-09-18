import React from "react";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

function Service() {
  return (
    <div className="service_container">
      <section>
        <div className="service_gridbox">
          <div className="service__box">
            <NewReleasesIcon className="service_icon" />
            <h3> new release products </h3>
          </div>
          <div className="service__box">
            <LoyaltyIcon className="service_icon" />
            <h3> upto 25% off </h3>
          </div>
          <div className="service__box">
            <SupportAgentIcon className="service_icon" />
            <h3> 24x7 full support </h3>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Service;
