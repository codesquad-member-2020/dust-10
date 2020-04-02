import { _$, __, _c, __$ } from "./util.js";
import { data } from "./mock.js";

const imageArea = _$(".forecast__map");
const contentArea = _$(".forecast__content");
const gradeArea = _$(".forecast__grade");
const imageMapKey = "imageUrl";
const imageClassName = "map__img";
const forecastApi = `https://dust10.herokuapp.com/api/forecast`;
const imageMapAlt = "미세먼지 예보 이미지";

const maxImageLength = 3;

function fetchData(url, func) {
  fetch(url)
    .then(res => res.json())
    .then(data => func(data));
}

function handleData(data) {
  // const recentIndex = 0;
  // const recentData = data.list[recentIndex];
  const forecastContent = data.informOverall;
  const forecastGrade = data.informGrade;
  const forecastMaps = [];

  for (const key in data) {
    if (key.startsWith(imageMapKey)) {
      forecastMaps.push(data[key]);
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
    if (i === 0) _c(image).add("on-block");
    _c(image).add(imageClassName);
    imageArea.appendChild(image);
  }
  initImageBox();
}

function appendData(data, area) {
  return (area.innerHTML = data);
}

///...//슬라이더
const playControls = ".play-box__controls";
const pauseBtn = "controls__pause";
const playBtn = "controls__play";
const scrubberBtn = _$(".progress-bar__scrubber-btn");
const progressBar = _$(".play-box__progress-bar");
const progress = _$(".progress-bar__progress");

function onToggleToBtn() {
  const controlBtns = _$(playControls);
  [...controlBtns.children].forEach(btn => btn.classList.toggle("on-none"));
}

function onEvent() {
  __(playControls).on("touchend", ({ target }) => handleControls(target));
  __$(scrubberBtn).on("touchstart", event => handleScrubberBtn(event));
  __$(progressBar).on("touchstart", event => handleProgressBar(event));
}

function handleProgressBar(event) {
  const moveOffsetX = getPosition(event);
  playBox.position = -moveOffsetX;
  moveScrubberBtn(-moveOffsetX);
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
  return startX - clientX;
}

function handleTouchMove(event, moveOffsetX) {
  const clientMoveX = event.touches[0].clientX;
  playBox.position = clientMoveX + moveOffsetX;

  const outOfRange =
    playBox.position < 0 || playBox.position > playBox.progressBarLength;
  if (outOfRange) return;

  __$(scrubberBtn).transition("none");
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
  imageBox.movingDistance = playBox.progressBarLength / imageBox.length;
  getMovingDistanceList();
}

function getMovingDistanceList() {
  let distance = null;
  imageBox.imageList.forEach(_ => {
    distance += imageBox.movingDistance;
    playBox.distanceList.push(distance);
  });
}

function playImages() {
  playBox.progressBarLength = progressBar.offsetWidth;
  playBox.position++;
  if (playBox.position >= playBox.progressBarLength) {
    playBox.position = 0;
  }
  moveScrubberBtn();
  changeImage();
  playBox.play = requestAnimationFrame(playImages);
}

function findImageIndex(position) {
  console.log(position);
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
  cancelAnimationFrame(playBox.play);
}

function init() {
  // fetchData(forecastApi, handleData);
  handleData(data);
  onEvent();
}

init();
