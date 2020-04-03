import { fetchData } from "./fetchData.js";
import { initImageBox, onEvent } from "./forecast.js";
// import css from "../../css/style.css";

const forecastApi = `http://13.125.3.28:8080/api/forecast`;

function init() {
  return fetchData(forecastApi, startForecast);
}

function startForecast() {
  onEvent();
  initImageBox();
}
window.addEventListener("DOMContentLoaded", init);
