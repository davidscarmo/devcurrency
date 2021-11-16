import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.hgbrasil.com/finance",
  params: {
    key: '9357f4b4'
  }
});
