import { _$, __, _c, __$ } from "./util.js";
// import { data } from "./mock.js";

const imageArea = _$(".forecast__map");
const contentArea = _$(".forecast__content");
const gradeArea = _$(".forecast__grade");
const imageMapKey = "imageUrl";
const imageClassName = "map__img";
const forecastApi = `http://13.125.3.28:8080/api/forecast`;
const imageMapAlt = "미세먼지 예보 이미지";

const maxImageLength = 3;

function fetchData(url, func) {
  fetch(url)
    .then(res => res.json())
    .then(data => func(data));
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

  appendImage(forecastMaps);
  appendData(forecastContent, contentArea);
  appendData(forecastGrade, gradeArea);
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
  initImageBox();
}

function appendData(data, area) {
  return (area.innerHTML = data);
}

///...//슬라이더
const pauseBtn = "controls__pause";
const playControls = _$(".play-box__controls");
const scrubberBtn = _$(".progress-bar__scrubber-btn");
const progressBar = _$(".play-box__progress-bar");
const progress = _$(".progress-bar__progress");

// const playBox = {
//   playPosition: 0,
//   count: 0,
//   distanceList: [],
//   position: null,
//   progressBarLength: progressBar.offsetWidth
// };

// const imageBox = {
//   imageList: [],
//   index: 0,
//   length: null
// };

function onToggleToBtn() {
  return [...playControls.children].forEach(btn =>
    btn.classList.toggle("on-none")
  );
}

function onEvent() {
  __$(playControls).on("touchend", ({ target }) => handleControls(target));
  __$(scrubberBtn).on("touchstart", event => handleScrubberBtn(event));
  __$(progressBar).on("touchstart", event => handleProgressBar(event));
}

function handleProgressBar(event) {
  const moveOffsetX = getPosition(event);

  playBox.position = moveOffsetX;
  moveScrubberBtn(moveOffsetX);
  changeImage();
}

function handleScrubberBtn(event) {
  const moveOffsetX = getPosition(event);

  __$(scrubberBtn).on("touchmove", event =>
    handleTouchMove(event, moveOffsetX)
  );
}

function getPosition(event) {
  const clientX = event.touches[0].clientX;
  const startX = event.target.offsetLeft;
  return clientX - startX;
}

function handleTouchMove(event, moveOffsetX) {
  const clientMoveX = event.touches[0].clientX;
  playBox.position = clientMoveX - moveOffsetX;

  const outOfRange =
    playBox.position < 0 || playBox.position > playBox.progressBarLength;
  if (outOfRange) return;

  moveScrubberBtn();
  changeImage();
}

function handleControls(target) {
  onToggleToBtn();

  const classList = target.classList;
  if ([...classList].includes(pauseBtn)) return pauseImages();
  playImages();
}

const playBox = {
  playPosition: 0,
  count: 0,
  distanceList: [],
  position: null,
  progressBarLength: progressBar.offsetWidth
};

const imageBox = {
  imageList: [],
  index: 0,
  length: null
};

function initImageBox() {
  imageBox.imageList = [...imageArea.children];
  imageBox.length = imageBox.imageList.length;
  const movingDistance = playBox.progressBarLength / imageBox.length;
  getMovingDistanceList(movingDistance);
}

function getMovingDistanceList(movingDistance) {
  let distance = null;

  return imageBox.imageList.forEach(_ => {
    distance += movingDistance;
    playBox.distanceList.push(distance);
  });
}

function playImages() {
  playBox.progressBarLength = progressBar.offsetWidth;
  playBox.position += 2;
  if (playBox.position >= playBox.progressBarLength) {
    playBox.position = 0;
  }
  moveScrubberBtn();
  changeImage();
  playBox.play = requestAnimationFrame(playImages);
}

function findImageIndex(position) {
  return playBox.distanceList.findIndex(distance => position <= distance);
}

function moveScrubberBtn(distance = playBox.position) {
  scrubberBtn.style.left = `${distance}px`;
  return (progress.style.width = `${distance}px`);
}

function changeImage() {
  const imageIndex = findImageIndex(playBox.position);
  if (imageBox.index === imageIndex) return;

  imageBox.index = imageIndex;

  const previousImage = _$(".on-block");

  if (previousImage) __$(previousImage).hide();
  console.log(imageBox.index);
  __$(imageBox.imageList[imageBox.index]).show();
}

function pauseImages() {
  return cancelAnimationFrame(playBox.play);
}

function init() {
  fetchData(forecastApi, handleData);
  onEvent();
}

init();
