import { _$, __, _c, __$ } from "./util.js";
import { imageArea } from "./fetchData.js";
const pauseBtn = "controls__pause";
const playControls = _$(".play-box__controls");
const scrubberBtn = _$(".progress-bar__scrubber-btn");
const progressBar = _$(".play-box__progress-bar");
const progress = _$(".progress-bar__progress");

const movingSpeed = 2;

const playBox = {
  playPosition: 0,
  distanceList: [],
  position: null,
  progressBarWidth: progressBar.offsetWidth
};

const imageBox = {
  imageList: [],
  index: 0,
  length: null
};

function onToggleToBtn() {
  return [...playControls.children].forEach(btn =>
    btn.classList.toggle("on-none")
  );
}

export function onEvent() {
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
    playBox.position < 0 || playBox.position > playBox.progressBarWidth;
  if (outOfRange) return;

  moveScrubberBtn();
  changeImage();
}

function handleControls(target) {
  onToggleToBtn();

  const classList = target.classList;
  if ([...classList].includes(pauseBtn)) return pauseImageBox();
  return playImageBox();
}

export function initImageBox() {
  imageBox.imageList = [...imageArea.children];
  imageBox.length = imageBox.imageList.length;

  return getMovingDistance();
}

function getMovingDistance() {
  playBox.progressBarWidth = progressBar.offsetWidth;

  const movingDistance = playBox.progressBarWidth / imageBox.length;
  return getMovingDistanceList(movingDistance);
}

function getMovingDistanceList(movingDistance) {
  let distance = null;
  playBox.distanceList = [];

  return imageBox.imageList.forEach(_ => {
    distance += movingDistance;
    playBox.distanceList.push(distance);
  });
}

function playImageBox() {
  getMovingDistance(); //progressBar width변경 없는지 다시한번 확인
  playBox.position += movingSpeed;

  const outOfRange = playBox.position >= playBox.progressBarWidth;
  if (outOfRange) playBox.position = 0;

  moveScrubberBtn();
  changeImage();
  playBox.play = requestAnimationFrame(playImageBox);
}

function moveScrubberBtn(distance = playBox.position) {
  scrubberBtn.style.left = `${distance}px`;
  return (progress.style.width = `${distance}px`);
}

function changeImage() {
  const currentImageIndex = findImageIndex(playBox.position);
  if (imageBox.index === currentImageIndex) return;

  imageBox.index = currentImageIndex;

  const previousImage = _$(".on-block");
  if (previousImage) __$(previousImage).hide();

  __$(imageBox.imageList[imageBox.index]).show();
}

function findImageIndex(position) {
  return playBox.distanceList.findIndex(distance => position <= distance);
}

function pauseImageBox() {
  return cancelAnimationFrame(playBox.play);
}
