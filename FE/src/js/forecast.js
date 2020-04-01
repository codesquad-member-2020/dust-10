import { _$, __, _c } from "./util.js";

const imageArea = _$(".forecast__map");
const contentArea = _$(".forecast__content");
const gradeArea = _$(".forecast__grade");
const imageMapKey = "imageUrl";
const forecastApi = `https://dust10.herokuapp.com/api/forecast`;
const imageMapAlt = "미세먼지 예보 이미지";

const maxImageLength = 3;

function fetchData(url, func) {
  fetch(url)
    .then(res => res.json())
    .then(data => func(data));
}

function handleData(data) {
  const recentIndex = 0;
  const recentData = data.list[recentIndex];
  const forecastContent = recentData.informOverall;
  const forecastGrade = recentData.informGrade;
  const forecastMaps = [];

  for (const key in recentData) {
    if (key.startsWith(imageMapKey)) {
      forecastMaps.push(recentData[key]);
    }
  }
  appendImage(forecastMaps);
  appendData(forecastContent, contentArea);
  appendData(forecastGrade, gradeArea);
}

function appendImage(imageUrl) {
  imageArea.innerText = "";

  for (let i = 0; i < maxImageLength; i++) {
    const image = new Image();
    image.src = imageUrl[i];
    image.alt = imageMapAlt;
    if (i > 0) _c(image).add("on-none");
    _c(image).add("map__img");
    imageArea.appendChild(image);
  }
}

function appendData(data, area) {
  //   area.textContent = "";
  return (area.innerHTML = data);
}

// function removeArea(dataarea){
//   return area.innerText = '';
// }

///...//슬라이더
const playControls = ".play-box__controls";

function addToggleToBtn() {
  const controlBtns = _$(playControls);
  [...controlBtns.children].forEach(btn => btn.classList.toggle("on-none"));
}
addToggleToBtn();

onControls();

function onControls() {
  __(playControls).on("touchend", ({ target }) => {
    const classList = target.classList;
    if ([...classList].includes("controls__pause")) return pauseImage();
    playImage();
  });
}

function init() {
  fetchData(forecastApi, handleData);
}

init();
