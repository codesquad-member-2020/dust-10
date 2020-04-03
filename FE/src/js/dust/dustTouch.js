import option from "../../option/touchOption.js";
import DOM from "../../option/dustPageDom.js";

function touchdownEvent() {
  DOM.grapeDivList[option.counter - 1].style.backgroundColor = "";
  DOM.grapeDivList[option.counter - 1].style.opacity = "";

  DOM.grapeDivList[option.counter].style.backgroundColor = "#ff8200";
  DOM.grapeDivList[option.counter].style.opacity = "0.3";

  option.counter++;
}

function touchupEvent() {
  const currentCounter = option.counter;
  const beforeCounter = option.counter - 1;
  DOM.grapeDivList[currentCounter].style.backgroundColor = "";
  DOM.grapeDivList[currentCounter].style.opacity = "";

  DOM.grapeDivList[beforeCounter].style.backgroundColor = "#ff8200";
  DOM.grapeDivList[beforeCounter].style.opacity = "0.3";

  option.counter--;
}

function touchStartPointEvent() {
  const currentCounter = option.counter;

  DOM.grapeDivList[currentCounter].style.backgroundColor = "#ff8200";
  DOM.grapeDivList[currentCounter].style.opacity = "0.3";

  option.counter++;
}

function touchEndPointEvent() {
  let beforeCounter = option.counter - 1;
  let currentCounter = option.counter - 2;
  DOM.grapeDivList[beforeCounter].style.backgroundColor = "";
  DOM.grapeDivList[beforeCounter].style.opacity = "";

  DOM.grapeDivList[currentCounter].style.backgroundColor = "#ff8200";
  DOM.grapeDivList[currentCounter].style.opacity = "0.3";

  option.counter--;
}

function initTouch(e) {
  option.initialY = e.touches[0].clientY;
}

function changeTouchY(e) {
  option.initialY = e.touches[0].clientY - 0.1;
}

function swipeDirection(e) {
  if (option.initialY !== null) {
    let currentY = e.touches[0].clientY;

    let diffY = option.initialY - currentY;

    0 < diffY ? (option.touchSwipe = "top") : (option.touchSwipe = "bottom");
  }
}

export function initTouchEvent(dataList, renderGrapeFunc) {
  DOM.stationList.addEventListener("touchstart", initTouch);
  DOM.stationList.addEventListener("touchmove", e => {
    option.touchDelay++;
    if (option.touchDelay < option.maxDelayNumber) {
      return;
    } else {
      option.touchDelay = 0;
    }
    swipeDirection(e);
    changeTouchY(e);

    const counter = option.counter;
    const touchSwipe = option.touchSwipe;

    if (counter === 0 && touchSwipe === "bottom") {
      return;
    } else if (counter === 24 && touchSwipe === "top") {
      return;
    } else if (counter === 0 && touchSwipe === "top") {
      renderGrapeFunc(dataList[option.counter]);
      touchStartPointEvent();
      return;
    } else if (counter === 24 && touchSwipe === "bottom") {
      touchEndPointEvent();
      renderGrapeFunc(dataList[option.counter]);
      return;
    } else if (counter === 24) {
      return;
    } else if (touchSwipe === "top") {
      renderGrapeFunc(dataList[option.counter]);
      touchdownEvent();
    } else if (touchSwipe === "bottom") {
      touchupEvent();
      renderGrapeFunc(dataList[option.counter]);
    }
  });
}
