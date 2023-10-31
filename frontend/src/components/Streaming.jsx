import React, { useState } from "react";
import PropTypes from "prop-types";
import Platform from "./Platform";

function Streaming({ providers }) {
  const [vpn, setVpn] = useState(false);

  return (
    <>
      <div className="container">
        <h2 className="mb-20 blue-title">Plateformes de streaming</h2>
        <div className="switch-button">
          <button
            type="button"
            onClick={() => setVpn(false)}
            className={!vpn ? "active" : ""}
          >
            France
          </button>
          <button
            type="button"
            onClick={() => setVpn(true)}
            className={vpn ? "active" : ""}
          >
            VPN
          </button>
        </div>
      </div>

      <div className="container-max">
        <div className="slider-container">
          <div className={`slider-item${!vpn ? " active-slide" : ""}`}>
            {providers.FR && providers.FR.flatrate ? (
              <ul className="container platform-list dflex mb-40">
                {providers.FR &&
                  providers.FR.flatrate &&
                  providers.FR.flatrate.map((platform) => (
                    <li key={platform.provider_id}>
                      <img
                        className="mb-10"
                        src={`https://image.tmdb.org/t/p/w300/${platform.logo_path}`}
                        alt={platform.provider_name}
                      />
                    </li>
                  ))}
              </ul>
            ) : (
              <div>Non disponible</div>
            )}
          </div>
          <div className={`slider-item${vpn ? " active-slide" : ""}`}>
            <div className="container">
              <h3 className="mb-10">Netflix</h3>
              <Platform providers={providers} providerId={8} />
              <h3 className="mb-10">Amazon Prime Video</h3>
              <Platform providers={providers} providerId={119} />
              <h3 className="mb-10">Disney+</h3>
              <Platform providers={providers} providerId={337} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Streaming.propTypes = {
  providers: PropTypes.shape({
    FR: PropTypes.shape({
      flatrate: PropTypes.arrayOf(PropTypes.shape()),
    }),
  }).isRequired,
};

export default Streaming;
