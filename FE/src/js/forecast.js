import { _$, __, _c, __$ } from "./util.js";

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
//안쓰면 빼기
const playSpeed = 30;

function onToggleToBtn() {
  const controlBtns = _$(playControls);
  [...controlBtns.children].forEach(btn => btn.classList.toggle("on-none"));
}

function onEvent() {
  __(playControls).on("touchend", ({ target }) => handleControls(target));
  __$(scrubberBtn).on("touchstart", event => handleTouchStart(event));
}

function handleTouchStart(event) {
  const clientX = event.touches[0].clientX;
  const startX = event.target.offsetLeft;
  const moveOffsetX = startX - clientX;

  __$(scrubberBtn).on("touchmove", event =>
    handleTouchMove(event, moveOffsetX)
  );
}

function handleTouchMove(event, moveOffsetX) {
  const clientMoveX = event.touches[0].clientX;
  playBox.touchPosition = clientMoveX + moveOffsetX;

  const progressBarLength = progressBar.offsetWidth;
  const outOfRange =
    playBox.touchPosition < 0 || playBox.touchPosition > progressBarLength;
  if (outOfRange) return;

  __$(scrubberBtn).transition("none");
  scrubberBtn.style.left = `${playBox.touchPosition}px`;
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
  imageIndex: 0,
  distanceList: [],
  touchPosition: null
};

const imageBox = {
  imageList: [],
  maxLength: 100,
  length: null
};

function initImageBox() {
  imageBox.imageList = [...imageArea.children];
  imageBox.length = imageBox.imageList.length;
  imageBox.movingDistance = imageBox.maxLength / (imageBox.length - 1);
  getMovingDistanceList();
}

function getMovingDistanceList() {
  let distance = null;
  imageBox.imageList.forEach(_ => {
    distance += imageBox.movingDistance;
    playBox.distanceList.push(distance);
  });
  console.log(playBox.distanceList);
}

// function

function playImages() {
  if (playBox.count % playSpeed === 0) {
    // const imageBox.maxLength = progressBar.offsetWidth;
    //둘중 한개 쓰기

    controlTransition();
    scrubberBtn.style.left = `${playBox.playPosition}%`;
    playBox.playPosition += imageBox.movingDistance;
    //퍼센트 아니면 픽셀로 쓰기

    controlImage();

    if (playBox.playPosition > imageBox.maxLength) {
      playBox.playPosition = 0;
    }
  }
  playBox.count++;
  playBox.play = requestAnimationFrame(playImages);
}

function controlTransition() {
  if (playBox.playPosition === 0) __$(scrubberBtn).transition("none");
  else __$(scrubberBtn).transition("all .6s linear");
}

function controlImage() {
  if (playBox.imageIndex - 1 >= 0)
    __$(imageBox.imageList[playBox.imageIndex - 1]).hide();
  if (playBox.imageIndex >= imageBox.length) {
    playBox.imageIndex = 0;
  }
  __$(imageBox.imageList[playBox.imageIndex]).show();

  playBox.imageIndex++;
}

function pauseImages() {
  cancelAnimationFrame(playBox.play);
}

function init() {
  fetchData(forecastApi, handleData);
  onEvent();
}

init();
