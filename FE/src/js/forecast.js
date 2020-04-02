import { _$, __, _c } from "./util.js";

const imageArea = _$(".forecast__map");
const contentArea = _$(".forecast__content");
const gradeArea = _$(".forecast__grade");
const imageMapKey = "imageUrl";
const forecastApi = `https://dust10.herokuapp.com/api/forecast`;
const imageMapAlt = "미세먼지 예보 이미지";

const maxImageLength = 10;

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
  return (area.innerHTML = data);
}

///...//슬라이더
const playControls = ".play-box__controls";

function onToggleToBtn() {
  const controlBtns = _$(playControls);
  [...controlBtns.children].forEach(btn => btn.classList.toggle("on-none"));
}

const playBtn = "controls__pause";

function onControls() {
  __(playControls).on("touchend", ({ target }) => {
    onToggleToBtn();

    const classList = target.classList;
    if ([...classList].includes(playBtn)) return pauseImages();
    playImages();
  });
}

const playBox = {
  xCoordinate: 0,
  count: 0
};

function playImages() {
  const progressBar = _$(".play-box__progress-bar");
  const scrubberBtn = _$(".progress-bar__scrubber-btn ");

  if (playBox.count % 10 === 0) {
    const images = [...imageArea.children];
    const imagesLength = images.length;

    const maxLength = progressBar.offsetWidth;
    // const maxLength = 100;

    const movingDistance = maxLength / imagesLength;

    console.log(playBox.xCoordinate, movingDistance);
    scrubberBtn.style.transform = `translateX(${playBox.xCoordinate}px)`;
    // scrubberBtn.style.left = `${playBox.xCoordinate}%`;
    playBox.xCoordinate += movingDistance;
    if (playBox.xCoordinate > maxLength) playBox.xCoordinate = 0;
  }

  playBox.count++;

  playBox.play = requestAnimationFrame(playImages);
}

function pauseImages() {
  cancelAnimationFrame(playBox.play);
}

function init() {
  fetchData(forecastApi, handleData);
  onControls();
}

init();
