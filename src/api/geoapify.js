import axios from "axios";

export default axios.create({
  baseURL: "https://api.geoapify.com/v1",
  params: {
    apiKey: process.env.REACT_APP_GEOAPIFY_KEY,
    lang: "bs",
    bias: "countrycode:sr",
    type: "city",
  },
});
