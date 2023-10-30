import React from "react";
import PropTypes from "prop-types";
import countryData from "../data";

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function getProviderCountries(providers, providerId) {
  const providerCountries = [];
  for (const country in providers) {
    if (
      providers[country].flatrate &&
      providers[country].flatrate.find((p) => p.provider_id === providerId)
    ) {
      providerCountries.push(country);
    }
  }
  const filteredList = countryData.filter((country) =>
    providerCountries.includes(country.iso)
  );
  return filteredList;
}

function Platform({ providers, providerId }) {
  return (
    <ul className="vpn-list mb-30">
      {getProviderCountries(providers, providerId)
        .slice(0, 5)
        .map((country) => {
          return (
            <li key={country.iso}>
              {getFlagEmoji(country.iso)}
              <span>{country.name}</span>
            </li>
          );
        })}
    </ul>
  );
}

Platform.propTypes = {
  providers: PropTypes.shape().isRequired,
  providerId: PropTypes.number.isRequired,
};

export default Platform;
