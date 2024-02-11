import axios from "axios";

const API = axios.create({
  baseURL: "https://api.jdoodle.com/v1/execute/",
  withCredentials: true,
  headers: {
      "Content-Type": "application/json",

    "Access-Control-Allow-Origin": "*",           
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export default API;
