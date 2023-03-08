export const arrayChecks = {
  klima: { icon: <i className="fa-solid fa-fan"></i>, text: "Klima" },
  grejanje: {
    icon: <i className="fa-solid fa-fire-flame-curved"></i>,
    text: "Grejanje",
  },
  wifi: {
    icon: <i className="bi bi-wifi"> </i>,
    text: "Wi-fi",
  },
  parking: {
    text: "Parking",
    icon: <i className="bi bi-p-square-fill"></i>,
  },

  kuhinja: {
    text: "Kuhinja",
    icon: <i className="fa-solid fa-kitchen-set"></i>,
  },
  cajnaKuhinja: {
    icon: <i className="bi bi-cup-hot-fill"></i>,
    text: "Cajna kuhinja",
  },
  vesMasina: {
    icon: <i className="fa-solid fa-shirt"></i>,
    text: "Ves masina",
  },
  tv: { text: "TV", icon: <i className="bi bi-tv-fill"></i> },
  sauna: {
    icon: <i className="fa-solid fa-hot-tub-person"></i>,

    text: "Sauna",
  },
  miniBar: {
    icon: <i className="fa-solid fa-martini-glass-citrus"></i>,
    text: "Mini-bar",
  },
  djakuzi: {
    icon: <i className="fa-solid fa-hot-tub-person"></i>,
    text: "Djakuzi",
  },
  terasa: { text: "Terasa" },
  dvoriste: { text: "Dvoriste" },
  engleski: { text: "Engleski" },
  nemacki: { text: "Nemacki" },
  srpski: { text: "Srpski" },
  pusenje: {
    icon: <i className="fa-solid fa-smoking"></i>,
    text: "Dozvoljeno pusenje",
  },
  ljubimci: {
    icon: <i className="fa-solid fa-dog"></i>,
    text: " Dozvoljen boravak kucnih ljubimaca",
  },
  dogadjaji: {
    icon: <i className="fa-solid fa-champagne-glasses"></i>,
    text: "Dozvoljene zurke/dogadjaji",
  },
  numOfBracni: {
    icon: <i className="fa-solid fa-bed"></i>,
    text: "Bracni krevet",
  },
  numOfObican: {
    icon: <i className="fa-solid fa-bed"></i>,
    text: "Obican krevet",
  },
  numOfKauc: { icon: <i className="fa-solid fa-bed"></i>, text: "Kauc" },
  numOfBathrooms: {
    icon: <i className="fa-solid fa-shower"></i>,
    text: "Kupatila",
  },
};

export const arrayChecksCard = {
  klima: { icon: <i className="fa-solid fa-fan"></i>, text: "Klima" },
  grejanje: {
    icon: <i className="fa-solid fa-fire-flame-curved"></i>,
    text: "Grejanje",
  },
  wifi: {
    icon: <i className="bi bi-wifi"> </i>,
    text: "Wi-fi",
  },
  parking: {
    text: "Parking",
    icon: <i className="bi bi-p-square-fill"></i>,
  },

  kuhinja: {
    text: "Kuhinja",
    icon: <i className="fa-solid fa-kitchen-set"></i>,
  },
  cajnaKuhinja: {
    icon: <i className="bi bi-cup-hot-fill"></i>,
    text: "Cajna kuhinja",
  },
  vesMasina: {
    icon: <i className="fa-solid fa-shirt"></i>,
    text: "Ves masina",
  },
  tv: { text: "TV", icon: <i className="bi bi-tv-fill"></i> },
  sauna: {
    icon: <i className="fa-solid fa-hot-tub-person"></i>,

    text: "Sauna",
  },
  miniBar: {
    icon: <i className="fa-solid fa-martini-glass-citrus"></i>,
    text: "Mini-bar",
  },
  djakuzi: {
    icon: <i className="fa-solid fa-hot-tub-person"></i>,
    text: "Djakuzi",
  },
  pusenje: {
    icon: <i className="fa-solid fa-smoking"></i>,
    text: "Dozvoljeno pusenje",
  },
  ljubimci: {
    icon: <i className="fa-solid fa-dog"></i>,
    text: " Dozvoljen boravak kucnih ljubimaca",
  },
  dogadjaji: {
    icon: <i className="fa-solid fa-champagne-glasses"></i>,
    text: "Dozvoljene zurke/dogadjaji",
  },
};

const intersect = (array1, array2) =>
  array1.filter((value) => array2.includes(value));

export const getRoomKeys = (room) =>
  intersect(Object.keys(room), Object.keys(arrayChecks));

export const getRoomKeysCard = (room) =>
  intersect(Object.keys(room), Object.keys(arrayChecksCard));
