import { _$, __, _c, __$ } from "./util.js";

export const imageArea = _$(".forecast__map");
const contentArea = _$(".forecast__content");
const gradeArea = _$(".forecast__grade");
const imageMapKey = "imageUrl";
const imageClassName = "map__img";
const imageMapAlt = "미세먼지 예보 이미지";

const maxImageLength = 3;
const finished = {};

export function fetchData(url, func) {
  finished.func = func;
  fetch(url)
    .then(res => res.json())
    .then(data => handleData(data));
}

function handleData(data) {
  const forecastData = data.forecast;
  const forecastContent = forecastData.informOverall;
  const forecastGrade = forecastData.informGrade;
  const forecastMaps = [];

  for (const key in forecastData) {
    if (key.startsWith(imageMapKey)) {
      forecastMaps.push(forecastData[key]);
    }
  }

  appendData(forecastContent, contentArea);
  appendData(forecastGrade, gradeArea);
  appendImage(forecastMaps);
}

function appendImage(imageUrl) {
  const firstImage = 0;

  for (let i = 0; i < maxImageLength; i++) {
    const image = new Image();
    image.src = imageUrl[i];
    image.alt = imageMapAlt;
    if (i === firstImage) _c(image).add("on-block");
    _c(image).add(imageClassName);
    imageArea.appendChild(image);
  }

  finished.func();
}

function appendData(data, area) {
  return (area.innerHTML = data);
}
