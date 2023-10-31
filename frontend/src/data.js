const countryData = [
  {
    iso: "US",
    name: "États-Unis",
    rank: 1,
  },
  {
    iso: "CN",
    name: "Chine",
    rank: 2,
  },
  {
    iso: "JP",
    name: "Japon",
    rank: 3,
  },
  {
    iso: "DE",
    name: "Allemagne",
    rank: 4,
  },
  {
    iso: "IN",
    name: "Inde",
    rank: 5,
  },
  {
    iso: "GB",
    name: "Royaume-Uni",
    rank: 6,
  },
  /* {
    iso: "FR",
    name: "France",
    rank: 7,
  }, */
  {
    iso: "RU",
    name: "Russie",
    rank: 8,
  },
  {
    iso: "CA",
    name: "Canada",
    rank: 9,
  },
  {
    iso: "IT",
    name: "Italie",
    rank: 10,
  },
  {
    iso: "BR",
    name: "Brésil",
    rank: 11,
  },
  {
    iso: "AU",
    name: "Australie",
    rank: 12,
  },
  {
    iso: "KR",
    name: "Corée du Sud",
    rank: 13,
  },
  {
    iso: "MX",
    name: "Mexique",
    rank: 14,
  },
  {
    iso: "ES",
    name: "Espagne",
    rank: 15,
  },
  {
    iso: "ID",
    name: "Indonésie",
    rank: 16,
  },
  {
    iso: "SA",
    name: "Arabie saoudite",
    rank: 17,
  },
  {
    iso: "NL",
    name: "Pays-Bas",
    rank: 18,
  },
  {
    iso: "TR",
    name: "Turquie",
    rank: 19,
  },
  {
    iso: "CH",
    name: "Suisse",
    rank: 20,
  },
  {
    iso: "TW",
    name: "Taïwan",
    rank: 21,
  },
  {
    iso: "PL",
    name: "Pologne",
    rank: 22,
  },
  {
    iso: "AR",
    name: "Argentine",
    rank: 23,
  },
  {
    iso: "SE",
    name: "Suède",
    rank: 24,
  },
  {
    iso: "NO",
    name: "Norvège",
    rank: 25,
  },
  {
    iso: "BE",
    name: "Belgique",
    rank: 26,
  },
  {
    iso: "IE",
    name: "Irlande",
    rank: 27,
  },
  {
    iso: "IL",
    name: "Israël",
    rank: 28,
  },
  {
    iso: "AE",
    name: "Émirats arabes unis",
    rank: 29,
  },
  {
    iso: "TH",
    name: "Thaïlande",
    rank: 30,
  },
  {
    iso: "VE",
    name: "Venezuela",
    rank: 31,
  },
  {
    iso: "NG",
    name: "Nigeria",
    rank: 32,
  },
  {
    iso: "EG",
    name: "Égypte",
    rank: 33,
  },
  {
    iso: "AT",
    name: "Autriche",
    rank: 34,
  },
  {
    iso: "SG",
    name: "Singapour",
    rank: 35,
  },
  {
    iso: "BD",
    name: "Bangladesh",
    rank: 36,
  },
  {
    iso: "VN",
    name: "Vietnam",
    rank: 37,
  },
  {
    iso: "MY",
    name: "Malaisie",
    rank: 38,
  },
  {
    iso: "ZA",
    name: "Afrique du Sud",
    rank: 39,
  },
  {
    iso: "PH",
    name: "Philippines",
    rank: 40,
  },
  {
    iso: "DK",
    name: "Danemark",
    rank: 41,
  },
  {
    iso: "IR",
    name: "Iran",
    rank: 42,
  },
  {
    iso: "PK",
    name: "Pakistan",
    rank: 43,
  },
  {
    iso: "HK",
    name: "Hong Kong",
    rank: 44,
  },
  {
    iso: "CO",
    name: "Colombie",
    rank: 45,
  },
  {
    iso: "RO",
    name: "Roumanie",
    rank: 46,
  },
  {
    iso: "CL",
    name: "Chili",
    rank: 47,
  },
  {
    iso: "CZ",
    name: "République tchèque",
    rank: 48,
  },
  {
    iso: "FI",
    name: "Finlande",
    rank: 49,
  },
  {
    iso: "IQ",
    name: "Irak",
    rank: 50,
  },
  {
    iso: "PT",
    name: "Portugal",
    rank: 51,
  },
  {
    iso: "NZ",
    name: "Nouvelle-Zélande",
    rank: 52,
  },
  {
    iso: "PE",
    name: "Pérou",
    rank: 53,
  },
  {
    iso: "QA",
    name: "Qatar",
    rank: 54,
  },
  {
    iso: "KZ",
    name: "Kazakhstan",
    rank: 55,
  },
  {
    iso: "GR",
    name: "Grèce",
    rank: 56,
  },
  {
    iso: "DZ",
    name: "Algérie",
    rank: 57,
  },
  {
    iso: "KW",
    name: "Koweït",
    rank: 58,
  },
  {
    iso: "HU",
    name: "Hongrie",
    rank: 59,
  },
  {
    iso: "UA",
    name: "Ukraine",
    rank: 60,
  },
  {
    iso: "MA",
    name: "Maroc",
    rank: 61,
  },
  {
    iso: "ET",
    name: "Éthiopie",
    rank: 62,
  },
  {
    iso: "SK",
    name: "Slovaquie",
    rank: 63,
  },
  {
    iso: "EC",
    name: "Équateur",
    rank: 64,
  },
  {
    iso: "OM",
    name: "Oman",
    rank: 65,
  },
  {
    iso: "DO",
    name: "République dominicaine",
    rank: 66,
  },
  {
    iso: "PR",
    name: "Porto Rico",
    rank: 67,
  },
  {
    iso: "KE",
    name: "Kenya",
    rank: 68,
  },
  {
    iso: "CU",
    name: "Cuba",
    rank: 69,
  },
  {
    iso: "AO",
    name: "Angola",
    rank: 70,
  },
  {
    iso: "GT",
    name: "Guatemala",
    rank: 71,
  },
  {
    iso: "BG",
    name: "Bulgarie",
    rank: 72,
  },
  {
    iso: "LU",
    name: "Luxembourg",
    rank: 73,
  },
  {
    iso: "UZ",
    name: "Ouzbékistan",
    rank: 74,
  },
  {
    iso: "AZ",
    name: "Azerbaïdjan",
    rank: 75,
  },
  {
    iso: "PA",
    name: "Panama",
    rank: 76,
  },
  {
    iso: "TZ",
    name: "Tanzanie",
    rank: 77,
  },
  {
    iso: "LK",
    name: "Sri Lanka",
    rank: 78,
  },
  {
    iso: "GH",
    name: "Ghana",
    rank: 79,
  },
  {
    iso: "BY",
    name: "Biélorussie",
    rank: 80,
  },
  {
    iso: "UY",
    name: "Uruguay",
    rank: 81,
  },
  {
    iso: "HR",
    name: "Croatie",
    rank: 82,
  },
  {
    iso: "LT",
    name: "Lituanie",
    rank: 83,
  },
  {
    iso: "CI",
    name: "Côte d'Ivoire",
    rank: 84,
  },
  {
    iso: "CR",
    name: "Costa Rica",
    rank: 85,
  },
  {
    iso: "MM",
    name: "Birmanie",
    rank: 86,
  },
  {
    iso: "RS",
    name: "Serbie",
    rank: 87,
  },
  {
    iso: "SI",
    name: "Slovénie",
    rank: 88,
  },
  {
    iso: "CD",
    name: "RD Congo",
    rank: 89,
  },
  {
    iso: "TN",
    name: "Tunisie",
    rank: 90,
  },
  {
    iso: "JO",
    name: "Jordanie",
    rank: 91,
  },
  {
    iso: "CM",
    name: "Cameroun",
    rank: 92,
  },
  {
    iso: "TM",
    name: "Turkménistan",
    rank: 93,
  },
  {
    iso: "LY",
    name: "Libye",
    rank: 94,
  },
  {
    iso: "UG",
    name: "Ouganda",
    rank: 95,
  },
  {
    iso: "BO",
    name: "Bolivie",
    rank: 96,
  },
  {
    iso: "PY",
    name: "Paraguay",
    rank: 97,
  },
  {
    iso: "LV",
    name: "Lettonie",
    rank: 98,
  },
  {
    iso: "BH",
    name: "Bahreïn",
    rank: 99,
  },
  {
    iso: "NP",
    name: "Népal",
    rank: 100,
  },
  {
    iso: "EE",
    name: "Estonie",
    rank: 101,
  },
  {
    iso: "SO",
    name: "Soudan",
    rank: 102,
  },
  {
    iso: "MO",
    name: "Macao",
    rank: 103,
  },
  {
    iso: "SV",
    name: "Salvador",
    rank: 104,
  },
  {
    iso: "HN",
    name: "Honduras",
    rank: 105,
  },
  {
    iso: "CY",
    name: "Chypre",
    rank: 106,
  },
  {
    iso: "SN",
    name: "Sénégal",
    rank: 107,
  },
  {
    iso: "KH",
    name: "Cambodge",
    rank: 108,
  },
  {
    iso: "PG",
    name: "Papouasie-Nouvelle-Guinée",
    rank: 109,
  },
  {
    iso: "ZW",
    name: "Zimbabwe",
    rank: 110,
  },
  {
    iso: "IS",
    name: "Islande",
    rank: 111,
  },
];

export default countryData;
